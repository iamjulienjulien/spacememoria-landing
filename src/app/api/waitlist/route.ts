import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

/* ============================================================================
   SPAM + RATE LIMIT HELPERS
   ============================================================================ */

type Bucket = { count: number; resetAt: number };
const RATE_BUCKETS = new Map<string, Bucket>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 8; // 8 submits / 10 min / IP (waitlist is less sensitive)

function getIp(req: Request) {
    const xff = req.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();
    return "0.0.0.0";
}

function rateLimitOrThrow(key: string) {
    const now = Date.now();
    const bucket = RATE_BUCKETS.get(key);

    if (!bucket || now > bucket.resetAt) {
        RATE_BUCKETS.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return;
    }

    if (bucket.count >= RATE_LIMIT_MAX) {
        throw new Error("RATE_LIMITED");
    }

    bucket.count += 1;
    RATE_BUCKETS.set(key, bucket);
}

function isLikelySpam(params: { honeypot?: string; startedAt?: number; now: number }) {
    // 1) Honeypot filled => bot
    if (params.honeypot && params.honeypot.trim().length > 0) return true;

    // 2) Too fast => bot
    if (typeof params.startedAt === "number") {
        const delta = params.now - params.startedAt;
        if (delta >= 0 && delta < 900) return true; // slightly stricter for waitlist
    }

    return false;
}

/* ============================================================================
   RESEND THROTTLE (max ~2 req/sec per runtime instance)
   - This prevents bursty concurrent requests from hitting Resend too fast.
   - Note: in serverless, this is per instance. For global throttling, use a
     shared store (Redis/Upstash). For this landing, per-instance is fine.
   ============================================================================ */

const RESEND_MIN_INTERVAL_MS = 550; // ~2 req/sec (with buffer)
let lastResendAt = 0;

// Serialize Resend calls with a promise chain (simple mutex)
let resendQueue: Promise<void> = Promise.resolve();

function sleep(ms: number) {
    return new Promise<void>((r) => setTimeout(r, ms));
}

async function resendThrottle() {
    resendQueue = resendQueue.then(async () => {
        const now = Date.now();
        const wait = Math.max(0, RESEND_MIN_INTERVAL_MS - (now - lastResendAt));
        if (wait > 0) await sleep(wait);
        lastResendAt = Date.now();
    });

    await resendQueue;
}

/* ============================================================================
   VALIDATION
   ============================================================================ */

const BodySchema = z.object({
    email: z.string().email().max(200),

    // Optional context
    lang: z.enum(["fr", "en"]).optional(),

    // Anti-spam fields (recommended)
    website: z.string().max(200).optional(), // honeypot (hidden field)
    startedAt: z.number().int().optional(), // client timestamp (Date.now())
});

function getEnv(name: string) {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}

/* ============================================================================
   HANDLER
   ============================================================================ */

export async function POST(req: Request) {
    try {
        // Optional origin guard
        const origin = req.headers.get("origin");
        const referer = req.headers.get("referer");
        const allowedOrigin = process.env.WAITLIST_ALLOWED_ORIGIN; // ex: "https://spacememoria.com"

        if (allowedOrigin && origin && origin !== allowedOrigin) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }
        if (allowedOrigin && referer && !referer.startsWith(allowedOrigin)) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        // Rate limit per IP
        const ip = getIp(req);
        rateLimitOrThrow(`waitlist:${ip}`);

        const json = await req.json();
        const body = BodySchema.parse(json);

        // Anti-spam heuristics
        const now = Date.now();
        if (isLikelySpam({ honeypot: body.website, startedAt: body.startedAt, now })) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        const resend = new Resend(getEnv("RESEND_API_KEY"));

        const fromEmail = getEnv("WAITLIST_FROM_EMAIL"); // ex: "Space Memoria <no-reply@spacememoria.com>"
        const toEmail = getEnv("WAITLIST_TO_EMAIL"); // ex: "contact@julienjulien.fr"
        const segmentId = process.env.RESEND_WAITLIST_SEGMENT_ID; // optional

        /* ------------------------------------------------------------------
           1) Add contact to segment (optional)
           ------------------------------------------------------------------ */
        if (segmentId) {
            let contactId: string | undefined;

            await resendThrottle();
            const retrieved = await resend.contacts.get({ email: body.email });

            if (retrieved?.data?.id) {
                contactId = retrieved.data.id;
            } else {
                await resendThrottle();
                const created = await resend.contacts.create({
                    email: body.email,
                    // You can add custom fields later when you extend the form
                });
                contactId = created?.data?.id;
            }

            if (contactId) {
                await resendThrottle();
                await resend.contacts.segments.add({ contactId, segmentId });
            }
        }

        /* ------------------------------------------------------------------
           2) Notify you by email (optional but useful)
           ------------------------------------------------------------------ */
        const subject = `🧬 Nouvelle inscription waitlist Space Memoria`;
        const text = [`Email: ${body.email}`, body.lang ? `Lang: ${body.lang}` : null, `IP: ${ip}`]
            .filter(Boolean)
            .join("\n");

        await resendThrottle();
        const result = await resend.emails.send({
            from: fromEmail,
            to: [toEmail],
            replyTo: body.email,
            subject,
            text,
        });

        return NextResponse.json({ ok: true, id: result.data?.id ?? null });
    } catch (err: any) {
        // Neutralize spam/rate-limit errors
        if (err?.message === "RATE_LIMITED") {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        const message =
            err?.name === "ZodError"
                ? "Invalid fields. Please check the form."
                : err?.message || "Unknown error.";

        return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }
}
