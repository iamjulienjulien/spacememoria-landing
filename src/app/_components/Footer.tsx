import React from "react";

// src/app/_components/Footer.tsx

type FooterProps = {
    links: ReadonlyArray<{ label: string; href: string }>; // ✅ changed
    copyrightName: string;
};

export function Footer({ links, copyrightName }: FooterProps) {
    return (
        <div className="footer">
            <div>
                © {new Date().getFullYear()} {copyrightName}
            </div>
            <div className="links">
                {links.map((x) => (
                    <a key={x.href} href={x.href}>
                        {x.label}
                    </a>
                ))}
            </div>
        </div>
    );
}
