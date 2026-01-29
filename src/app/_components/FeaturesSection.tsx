import React from "react";
import { UiCard } from "@/components/ui/UiCard";
import { UiSectionTitle } from "@/components/ui/UiSectionTitle";

// src/app/_components/FeaturesSection.tsx

type FeaturesSectionProps = {
    title: string;
    hint: string;
    ariaLabel: string;
    cards: ReadonlyArray<{ title: string; body: string }>; // ✅ changed
};

export function FeaturesSection({ title, hint, ariaLabel, cards }: FeaturesSectionProps) {
    return (
        <>
            <UiSectionTitle title={title} hint={hint} />

            <section className="grid" aria-label={ariaLabel}>
                {cards.map((x) => (
                    <UiCard key={x.title} title={x.title}>
                        <p>{x.body}</p>
                    </UiCard>
                ))}
            </section>
        </>
    );
}
