import React from "react";

type UiChipProps = {
    label: string;
};

export function UiChip({ label }: UiChipProps) {
    return <div className="chip">{label}</div>;
}
