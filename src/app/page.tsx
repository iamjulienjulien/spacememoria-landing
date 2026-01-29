import React from "react";

import { getLandingCopy } from "@/helpers/landing";
import { getClientLocale } from "@/helpers/locale";

import { Topbar } from "./_components/Topbar";
import { HeroSection } from "./_components/HeroSection";
import { StatusSection } from "@/app/_components/StatusSection";
import { WhatYouCanDoSection } from "@/app/_components/WhatYouCanDoSection";
import { FeaturesSection } from "./_components/FeaturesSection";
import { Footer } from "./_components/Footer";

type HomePageProps = {
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomePageProps) {
    const sp = searchParams ? await searchParams : {};
    const { locale } = await getClientLocale({ searchParams: sp });

    const copy = getLandingCopy(locale);

    return (
        <div className="wrap">
            <Topbar emoji={copy.brand.emoji} name={copy.brand.name} badge={copy.brand.badge} />

            <HeroSection
                ariaLabel={copy.hero.ariaLabel}
                title={copy.hero.title}
                lead={copy.hero.lead}
                chipsAriaLabel={copy.hero.chipsAriaLabel}
                chips={copy.hero.chips}
                cta={copy.hero.cta}
            />

            {/* <StatusSection
                title={copy.sections.status.title}
                description={copy.sections.status.description}
                steps={copy.sections.status.steps}
            /> */}

            <WhatYouCanDoSection
                title={copy.sections.whatYouCanDo.title}
                hint={copy.sections.whatYouCanDo.hint}
                ariaLabel={copy.sections.whatYouCanDo.ariaLabel}
                groups={copy.sections.whatYouCanDo.groups}
            />

            <FeaturesSection
                title={copy.features.title}
                hint={copy.features.hint}
                ariaLabel={copy.features.ariaLabel}
                cards={copy.features.cards}
            />

            <Footer links={copy.footer.links} copyrightName={copy.footer.copyrightName} />
        </div>
    );
}
