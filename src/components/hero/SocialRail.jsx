import React from "react";
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiGlobe } from "react-icons/fi";

const IconChip = ({ children, href = "#" }) => (
    <a
        href={href}
        className="icon-chip grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-b from-black/65 to-black/55 border border-white/15 text-white shadow-[0_6px_24px_rgba(0,0,0,.35)] hover:opacity-90 transition"
        aria-label="social link"
    >
        {children}
    </a>
);

export default function SocialRail() {
    return (
        <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-4">
            <IconChip><FiFacebook /></IconChip>
            <IconChip><FiInstagram /></IconChip>
            <IconChip><FiTwitter /></IconChip>
            <IconChip><FiLinkedin /></IconChip>
            <IconChip><FiGlobe /></IconChip>
        </div>
    );
}
