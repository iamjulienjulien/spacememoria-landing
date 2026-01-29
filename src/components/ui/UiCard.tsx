import React from "react";

type UiCardProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
};

export function UiCard({ title, children, className }: UiCardProps) {
    return (
        <div className={["card", className].filter(Boolean).join(" ")}>
            <h3>{title}</h3>
            <div>{children}</div>
        </div>
    );
}
