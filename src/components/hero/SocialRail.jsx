import React from "react";
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa"; // discord icon

const IconChip = ({ children, href = "#", hoverClass }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`icon-chip grid place-items-center w-11 h-11 rounded-xl 
                bg-gradient-to-b from-black/65 to-black/55 
                border border-white/15 text-white text-xl
                shadow-[0_6px_24px_rgba(0,0,0,.35)] 
                transition hover:scale-110 ${hoverClass}`}
        aria-label="social link"
    >
        {children}
    </a>
);

export default function SocialRail() {
    return (
        <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-4">
            <IconChip
                href="https://www.facebook.com/codeutsava/"
                hoverClass="hover:text-blue-400 hover:drop-shadow-[0_0_8px_#3b82f6]"
            >
                <FiFacebook />
            </IconChip>

            <IconChip
                href="https://www.instagram.com/codeutsavanitrr/"
                hoverClass="hover:text-pink-400 hover:drop-shadow-[0_0_8px_#ec4899]"
            >
                <FiInstagram />
            </IconChip>

            <IconChip
                href="https://twitter.com/codeutsavanitrr?lang=en"
                hoverClass="hover:text-blue-300 hover:drop-shadow-[0_0_8px_#60a5fa]"
            >
                <FiTwitter />
            </IconChip>

            <IconChip
                href="https://www.linkedin.com/company/codeutsava/"
                hoverClass="hover:text-blue-400 hover:drop-shadow-[0_0_8px_#3b82f6]"
            >
                <FiLinkedin />
            </IconChip>

            <IconChip
                href="https://github.com/TCP-Tech"
                hoverClass="hover:text-gray-300 hover:drop-shadow-[0_0_8px_#d1d5db]"
            >
                <FiGithub />
            </IconChip>

            <IconChip
                href="https://discord.gg/sxfvDKhEgQ"
                hoverClass="hover:text-indigo-400 hover:drop-shadow-[0_0_8px_#6366f1]"
            >
                <FaDiscord />
            </IconChip>
        </div>
    );
}
