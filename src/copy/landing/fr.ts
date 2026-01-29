export const SPACE_MEMORIA_LANDING_COPY_FR = {
    brand: {
        emoji: "🧬",
        name: "Space Memoria",
        badge: "🚧 Première version en préparation",
    },

    hero: {
        ariaLabel: "Présentation Space Memoria",
        title: "La généalogie comme une constellation.",
        lead: "Space Memoria transforme l’histoire familiale en une mémoire vivante : des personnes, des lieux, des documents et des récits, reliés proprement, comme des étoiles qu’on cesse enfin de laisser dans le noir.",
        chipsAriaLabel: "Mots-clés",
        chips: ["✨ Récit", "🧬 Généalogie", "🗺️ Lieux", "📚 Sources", "👨‍👩‍👧 Transmission"],
        cta: {
            intro: {
                title: "Accès anticipé",
                text: "Laisse ton email pour être prévenu du lancement de la première version publique.",
            },
            formAction: "mailto:contact@julienjulien.fr",
            emailPlaceholder: "Ton email pour être prévenu du lancement",
            emailAriaLabel: "Email",
            buttonLabel: "Rejoindre la waitlist",
            fineprint:
                "Pas de spam. Juste un message quand la première version publique décolle 🚀",
        },
        sideCards: {
            primary: {
                title: "Ce que tu pourras faire",
                body: "Construire ton arbre, ajouter des sources, raconter des moments, et naviguer dans l’histoire familiale sans te perdre dans des dossiers.",
            },
            secondary: {
                title: "Statut",
                body: "Landing temporaire pendant la finalisation du produit. Tu peux déjà laisser ton contact pour être prévenu.",
            },
        },
    },

    sections: {
        whatYouCanDo: {
            title: "Ce que tu pourras faire",
            hint: "Des actions simples, mais enfin reliées entre elles, pour transmettre une histoire claire.",
            ariaLabel: "Ce que tu pourras faire dans Space Memoria",
            groups: [
                {
                    title: "🌳 Construire & documenter",
                    cards: [
                        {
                            title: "Construire ton arbre généalogique",
                            body: "Créer ta lignée, ajouter des branches, relier les personnes et garder une structure claire, même quand l’arbre grandit.",
                        },
                        {
                            title: "Récolter et organiser les sources",
                            body: "Attacher actes, photos, archives et documents à chaque information importante, pour une généalogie vérifiable et durable.",
                        },
                    ],
                },
                {
                    title: "📖 Raconter & enrichir",
                    cards: [
                        {
                            title: "Raconter les moments",
                            body: "Écrire des récits courts (naissance, rencontre, anecdote, événement) reliés à des personnes, des lieux et des sources.",
                        },
                        {
                            title: "Préserver la mémoire du quotidien",
                            body: "Conserver les petits détails qui comptent: objets, surnoms, habitudes, souvenirs, traditions, fragments du réel.",
                        },
                    ],
                },
                {
                    title: "🧭 Explorer & partager",
                    cards: [
                        {
                            title: "Naviguer dans l’histoire familiale",
                            body: "Explorer par branches, générations, périodes, et retrouver vite “qui, quand, où, comment”, sans se perdre dans des dossiers.",
                        },
                        {
                            title: "Partager avec les bonnes limites",
                            body: "Ouvrir une branche à d’autres membres de la famille, avec des permissions adaptées et un cadre rassurant.",
                        },
                    ],
                },
            ],
        },
        status: {
            title: "Statut du projet",
            description:
                "Space Memoria est actuellement en cours de développement. Cette landing sert à présenter la vision et à préparer l’ouverture de la première version publique.",
            steps: [
                "Architecture et modèle de données en cours de finalisation",
                "Conception de l’interface et des parcours utilisateurs",
                "Préparation d’une première version accessible au public",
            ],
        },
    },

    features: {
        title: "Fonctionnalités en approche",
        hint: "Une vue simple de ce que Space Memoria veut rendre évident.",
        ariaLabel: "Fonctionnalités Space Memoria",
        cards: [
            {
                title: "🌌 Galaxies",
                body: "Plusieurs univers: famille, historique, fiction. Chacun avec ses règles et son ton.",
            },
            {
                title: "📜 Récits",
                body: "Des histoires courtes reliées à des personnes, des lieux et des sources.",
            },
            {
                title: "🧭 Explorer",
                body: "Naviguer par branches, époques et territoires, sans se perdre dans l’arbre.",
            },
            {
                title: "📚 Sources",
                body: "Attacher un document, une archive ou une preuve à chaque information importante.",
            },
            {
                title: "🗺️ Lieux",
                body: "Relier les événements à des lieux, et retrouver une histoire par la géographie.",
            },
            {
                title: "🧩 Liens & relations",
                body: "Clarifier les relations (famille, alliances, fratries, branches) avec cohérence.",
            },
            {
                title: "🕯️ Mémoire",
                body: "Donner de la place aux détails: objets, anecdotes, traces, fragments.",
            },
            {
                title: "🧠 Assistants",
                body: "Des aides pour structurer, relire, et transformer des infos brutes en récit.",
            },
            {
                title: "🔐 Partage",
                body: "Partager une galaxie ou une branche avec les bonnes limites, au bon moment.",
            },
        ],
    },

    footer: {
        links: [
            // { label: "contact@julienjulien.fr", hiconref: "mailto:contact@julienjulien.fr" },
            { label: "spacememoria.com", href: "https://spacememoria.com" },
        ],
        copyrightName: "Space Memoria",
    },
} as const;

export const SPACE_MEMORIA_METADATA_COPY_FR = {
    baseUrl: "https://spacememoria.com",

    title: {
        default: "Space Memoria 🧬",
        template: "%s | Space Memoria",
    },

    description:
        "Space Memoria est un projet de généalogie nouvelle génération : une mémoire familiale vivante, structurée et racontée comme une constellation.",

    applicationName: "Space Memoria",

    keywords: [
        "généalogie",
        "mémoire familiale",
        "histoire",
        "transmission",
        "archives",
        "récits",
        "famille",
        "arbre généalogique",
    ],

    author: {
        name: "Julien Julien",
        url: "https://julienjulien.fr",
    },

    openGraph: {
        title: "Space Memoria 🧬",
        description:
            "La généalogie comme une constellation. Une mémoire familiale vivante, structurée et racontée.",
        siteName: "Space Memoria",
        locale: "fr_FR",
        image: {
            url: "/og.png",
            width: 1200,
            height: 675,
            alt: "Space Memoria – Généalogie et mémoire familiale",
        },
    },

    twitter: {
        card: "summary_large_image",
        title: "Space Memoria 🧬",
        description: "Une nouvelle manière de raconter et transmettre l’histoire familiale.",
        image: "/og.png",
    },

    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
        other: [
            {
                rel: "android-chrome",
                url: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    },

    manifest: "/site.webmanifest",

    robots: {
        index: true,
        follow: true,
    },
} as const;

export type SpaceMemoriaLandingCopyFr = typeof SPACE_MEMORIA_LANDING_COPY_FR;
export type SpaceMemoriaMetadataCopyFr = typeof SPACE_MEMORIA_METADATA_COPY_FR;
