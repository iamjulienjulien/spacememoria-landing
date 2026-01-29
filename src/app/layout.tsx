import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import "./globals.css";

import { getLandingMetadataCopy } from "@/helpers/landing";
import { getRequestLocale } from "@/helpers/locale";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-outfit",
    display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRequestLocale();
    const meta = getLandingMetadataCopy(locale);

    return {
        metadataBase: new URL(meta.baseUrl),
        title: {
            default: meta.title.default,
            template: meta.title.template,
        },
        description: meta.description,
        applicationName: meta.applicationName,
        keywords: [...meta.keywords],
        authors: [{ name: meta.author.name, url: meta.author.url }],
        creator: meta.author.name,
        publisher: meta.applicationName,
        openGraph: {
            title: meta.openGraph.title,
            description: meta.openGraph.description,
            url: meta.baseUrl,
            siteName: meta.openGraph.siteName,
            locale: meta.openGraph.locale,
            type: "website",
            images: [
                {
                    url: meta.openGraph.image.url,
                    width: meta.openGraph.image.width,
                    height: meta.openGraph.image.height,
                    alt: meta.openGraph.image.alt,
                },
            ],
        },
        twitter: {
            card: meta.twitter.card,
            title: meta.twitter.title,
            description: meta.twitter.description,
            images: [meta.twitter.image],
        },
        /* ------------------------------------------------------------------
           Icons & PWA
           ------------------------------------------------------------------ */
        icons: {
            icon: [...meta.icons.icon],
            apple: [...meta.icons.apple],
            other: [...meta.icons.other],
        },

        manifest: meta.manifest,
        robots: { index: meta.robots.index, follow: meta.robots.follow },
    };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getRequestLocale();

    return (
        <html lang={locale} className={outfit.variable}>
            <body>{children}</body>
        </html>
    );
}
