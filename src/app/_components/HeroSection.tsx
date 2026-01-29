"use client";

import React, { useEffect, useMemo, useState } from "react";
import { UiChip } from "@/components/ui/UiChip";

type HeroSectionProps = {
    ariaLabel: string;
    title: string;
    lead: string;
    chipsAriaLabel: string;
    chips: readonly string[];
    cta: {
        intro: {
            title: string;
            text: string;
        };
        formAction: string; // (legacy) kept for compatibility, not used by the API submit
        emailPlaceholder: string;
        emailAriaLabel: string;
        buttonLabel: string;
        fineprint: string;
    };
};

type SubmitState = "idle" | "loading" | "success" | "error";

export function HeroSection({
    ariaLabel,
    title,
    lead,
    chipsAriaLabel,
    chips,
    cta,
}: HeroSectionProps) {
    const [email, setEmail] = useState("");
    const [honeypot, setHoneypot] = useState(""); // should stay empty
    const [state, setState] = useState<SubmitState>("idle");
    const [error, setError] = useState<string | null>(null);

    const startedAt = useMemo(() => Date.now(), []);

    // Locale hint (optional)
    const lang = useMemo(() => {
        if (typeof document === "undefined") return undefined;
        const htmlLang = document.documentElement.lang?.toLowerCase();
        if (htmlLang === "fr" || htmlLang === "en") return htmlLang;
        return undefined;
    }, []);

    const isBusy = state === "loading";
    const isSuccess = state === "success";

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isBusy || isSuccess) return;

        setState("loading");
        setError(null);

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    email,
                    website: honeypot,
                    startedAt,
                    lang,
                }),
            });

            const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));

            // Backend intentionally neutralizes spam/rate-limit by returning ok: true.
            if (res.ok && data.ok) {
                setState("success");
                return;
            }

            setState("error");
            setError(data.error || "Une erreur est survenue. Réessaie plus tard.");
        } catch {
            setState("error");
            setError("Une erreur est survenue. Réessaie plus tard.");
        }
    }

    return (
        <section className="hero" role="region" aria-label={ariaLabel}>
            <div className="hero-inner">
                <div>
                    <h1>{title}</h1>
                    <p className="lead">{lead}</p>

                    <div className="chips" aria-label={chipsAriaLabel}>
                        {chips.map((label) => (
                            <UiChip key={label} label={label} />
                        ))}
                    </div>
                </div>

                <div className="hero-cta-col">
                    <div className="cta" aria-live="polite" aria-busy={isBusy ? "true" : "false"}>
                        <div className="cta-intro">
                            <h3>{cta.intro.title}</h3>
                            <p>{cta.intro.text}</p>
                        </div>

                        <form onSubmit={onSubmit}>
                            {/* Honeypot (hidden) */}
                            <div className="hp" aria-hidden="true">
                                <label htmlFor="website">Website</label>
                                <input
                                    id="website"
                                    name="website"
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={honeypot}
                                    onChange={(e) => setHoneypot(e.target.value)}
                                />
                            </div>

                            <input
                                type="email"
                                name="email"
                                placeholder={cta.emailPlaceholder}
                                required
                                aria-label={cta.emailAriaLabel}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isBusy || isSuccess}
                            />

                            <button
                                type="submit"
                                className="cta-button"
                                disabled={isBusy || isSuccess}
                            >
                                {isSuccess ? "✅ Inscrit" : isBusy ? "…" : cta.buttonLabel}
                            </button>
                        </form>

                        {state === "error" ? (
                            <div className="cta-error" role="alert">
                                {error}
                            </div>
                        ) : null}

                        <div className="fineprint">
                            {isSuccess ? "C’est noté. On t’écrira au lancement ✨" : cta.fineprint}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
