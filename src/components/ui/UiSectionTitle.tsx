import React from "react";

type UiSectionTitleProps = {
    title: string;
    hint?: string;
};

export function UiSectionTitle({ title, hint }: UiSectionTitleProps) {
    return (
        <div className="section-title">
            <h2>{title}</h2>
            {hint ? <p className="hint">{hint}</p> : null}
        </div>
    );
}
