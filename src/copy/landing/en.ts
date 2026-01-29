export const SPACE_MEMORIA_LANDING_COPY_EN = {
    brand: {
        emoji: "🧬",
        name: "Space Memoria",
        badge: "🚧 First version in progress",
    },

    hero: {
        ariaLabel: "Space Memoria overview",
        title: "Genealogy as a constellation.",
        lead: "Space Memoria turns family history into a living memory: people, places, documents, and stories, carefully connected, like stars we finally stop leaving in the dark.",
        chipsAriaLabel: "Keywords",
        chips: ["✨ Storytelling", "🧬 Genealogy", "🗺️ Places", "📚 Sources", "👨‍👩‍👧 Transmission"],
        cta: {
            intro: {
                title: "Early access",
                text: "Leave your email to be notified when the first public version launches.",
            },
            formAction: "mailto:contact@julienjulien.fr",
            emailPlaceholder: "Your email to be notified at launch",
            emailAriaLabel: "Email",
            buttonLabel: "Join the waitlist",
            fineprint: "No spam. Just one message when the first public version takes off 🚀",
        },
        sideCards: {
            primary: {
                title: "What you’ll be able to do",
                body: "Build your family tree, attach sources, tell meaningful moments, and navigate family history without getting lost in folders.",
            },
            secondary: {
                title: "Status",
                body: "Temporary landing while the product is being finalized. You can already leave your contact to be notified.",
            },
        },
    },

    sections: {
        whatYouCanDo: {
            title: "What you’ll be able to do",
            hint: "Simple actions, finally connected, so your family story stays clear and shareable.",
            ariaLabel: "What you’ll be able to do in Space Memoria",
            groups: [
                {
                    title: "🌳 Build & document",
                    cards: [
                        {
                            title: "Build your family tree",
                            body: "Create lineages, add branches, connect people, and keep everything readable as it grows.",
                        },
                        {
                            title: "Collect and organize sources",
                            body: "Attach records, photos, archives, and documents to key facts for a reliable, lasting genealogy.",
                        },
                    ],
                },
                {
                    title: "📖 Tell & enrich",
                    cards: [
                        {
                            title: "Tell the moments",
                            body: "Write short stories (birth, meeting, anecdotes, events) linked to people, places, and sources.",
                        },
                        {
                            title: "Preserve everyday memory",
                            body: "Keep the details that matter: objects, nicknames, habits, traditions, small fragments of real life.",
                        },
                    ],
                },
                {
                    title: "🧭 Explore & share",
                    cards: [
                        {
                            title: "Navigate family history",
                            body: "Explore by branches, generations, and time periods, and quickly find “who, when, where, how”.",
                        },
                        {
                            title: "Share with the right boundaries",
                            body: "Open a branch to family members with appropriate permissions and a reassuring framework.",
                        },
                    ],
                },
            ],
        },
        status: {
            title: "Project status",
            description:
                "Space Memoria is currently under active development. This landing page presents the vision of the project and prepares the launch of the first public version.",
            steps: [
                "Architecture and data model being finalized",
                "Interface design and user journeys in progress",
                "Preparation of a first public-access version",
            ],
        },
    },

    features: {
        title: "Upcoming features",
        hint: "A simple overview of what Space Memoria aims to make obvious.",
        ariaLabel: "Space Memoria features",
        cards: [
            {
                title: "🌌 Galaxies",
                body: "Multiple universes: family, historical, fiction. Each with its own rules and tone.",
            },
            {
                title: "📜 Stories",
                body: "Short narratives connected to people, places, and sources.",
            },
            {
                title: "🧭 Explore",
                body: "Navigate through branches, eras, and territories without getting lost in the tree.",
            },
            {
                title: "📚 Sources",
                body: "Attach documents, archives, or evidence to every important piece of information.",
            },
            {
                title: "🗺️ Places",
                body: "Link events to locations and rediscover history through geography.",
            },
            {
                title: "🧩 Links & relationships",
                body: "Clarify relationships (family, alliances, siblings, branches) with consistency.",
            },
            {
                title: "🕯️ Memory",
                body: "Make room for details: objects, anecdotes, traces, fragments.",
            },
            {
                title: "🧠 Assistants",
                body: "Helpers to structure, review, and turn raw information into stories.",
            },
            {
                title: "🔐 Sharing",
                body: "Share a galaxy or a branch with the right boundaries, at the right time.",
            },
        ],
    },

    footer: {
        links: [
            // { label: "contact@julienjulien.fr", href: "mailto:contact@julienjulien.fr" },
            { label: "spacememoria.com", href: "https://spacememoria.com" },
        ],
        copyrightName: "Space Memoria",
    },
} as const;

export const SPACE_MEMORIA_METADATA_COPY_EN = {
    baseUrl: "https://spacememoria.com",

    title: {
        default: "Space Memoria 🧬",
        template: "%s | Space Memoria",
    },

    description:
        "Space Memoria is a next-generation genealogy project: a living family memory, structured and told like a constellation.",

    applicationName: "Space Memoria",

    keywords: [
        "genealogy",
        "family memory",
        "history",
        "transmission",
        "archives",
        "stories",
        "family",
        "family tree",
    ],

    author: {
        name: "Julien Julien",
        url: "https://julienjulien.fr",
    },

    openGraph: {
        title: "Space Memoria 🧬",
        description:
            "Genealogy as a constellation. A living, structured way to tell family history.",
        siteName: "Space Memoria",
        locale: "en_US",
        image: {
            url: "/og.png",
            width: 1200,
            height: 675,
            alt: "Space Memoria – Genealogy and family memory",
        },
    },

    twitter: {
        card: "summary_large_image",
        title: "Space Memoria 🧬",
        description: "A new way to tell and pass down family history.",
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

export type SpaceMemoriaLandingCopyEn = typeof SPACE_MEMORIA_LANDING_COPY_EN;
export type SpaceMemoriaMetadataCopyEn = typeof SPACE_MEMORIA_METADATA_COPY_EN;
