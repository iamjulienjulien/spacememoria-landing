import React from "react";

type TopbarProps = {
    emoji: string;
    name: string;
    badge: string;
};

export function Topbar({ emoji, name, badge }: TopbarProps) {
    return (
        <div className="topbar">
            <div className="brand">
                <span aria-hidden="true">{emoji}</span>
                <span>{name}</span>
            </div>
            <div className="badge">{badge}</div>
        </div>
    );
}
