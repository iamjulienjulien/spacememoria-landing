import React from "react";
import { UiCard } from "@/components/ui/UiCard";

type StatusSectionProps = {
    title: string;
    description: string;
    steps: ReadonlyArray<string>;
};

export function StatusSection({ title, description, steps }: StatusSectionProps) {
    return (
        <section aria-label={title}>
            <UiCard title={title}>
                <p>{description}</p>

                <ul className="status-list">
                    {steps.map((step) => (
                        <li key={step}>{step}</li>
                    ))}
                </ul>
            </UiCard>
        </section>
    );
}
