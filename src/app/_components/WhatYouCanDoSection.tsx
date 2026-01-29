import React from "react";
import { UiCard } from "@/components/ui/UiCard";
import { UiSectionTitle } from "@/components/ui/UiSectionTitle";

type WhatYouCanDoGroup = {
    title: string;
    cards: ReadonlyArray<{ title: string; body: string }>;
};

type WhatYouCanDoSectionProps = {
    title: string;
    hint: string;
    ariaLabel: string;
    groups: ReadonlyArray<WhatYouCanDoGroup>;
};

export function WhatYouCanDoSection({ title, hint, ariaLabel, groups }: WhatYouCanDoSectionProps) {
    return (
        <>
            <UiSectionTitle title={title} hint={hint} />

            <section aria-label={ariaLabel} className="what-grid">
                {groups.map((group) => (
                    <div key={group.title} className="what-block">
                        <h3 className="what-block-title">{group.title}</h3>

                        <div className="grid grid-2" aria-label={group.title}>
                            {group.cards.map((x) => (
                                <UiCard key={x.title} title={x.title}>
                                    <p>{x.body}</p>
                                </UiCard>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
