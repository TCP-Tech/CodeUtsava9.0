/*
 * 🎪 MOCK SOCIAL LINKS DEMO 🎪
 *
 * To remove mock social links later:
 * 1. Set ENABLE_MOCK_SOCIAL_LINKS = false (line ~613)
 * 2. Or remove the addMockSocialLinks function entirely (lines ~620-655)
 * 3. Or remove the addMockSocialLinks() calls from categorized object (lines ~783-796)
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Github, Instagram } from "lucide-react";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import Fireworks from "../components/overlays/Fireworks.jsx";
import SparkleLayer from "../components/overlays/SparkleLayer.jsx";
import Cursor from "../components/cursor/Cursor.jsx";
import BackgroundMedia from "../components/background/Background.jsx";
import bg_image from "../assets/images/bg-part2.jpg";
import default_profile from "../assets/images/dummys.jpeg";

import { departmentColors, hierarchyLevels } from "../assets/data/teamsData.js";
import techTeamGithub from "../assets/data/techTeamGithub.js";

// Team member card component with carnival styling
const TeamCard = ({ member, index, level }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const nameContainerRef = useRef(null);
    const nameRef = useRef(null);
    const marqueeItemRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [scrollExtra, setScrollExtra] = useState(0);
    const [marqueeDuration, setMarqueeDuration] = useState(null);

    useEffect(() => {
        const container = nameContainerRef.current;
        const nameEl = nameRef.current;
        if (!container || !nameEl) return;

        const compute = () => {
            const containerWidth = container.getBoundingClientRect().width;
            const nameWidth = nameEl.getBoundingClientRect().width;

            // Debug: expose measured values for runtime inspection
            try {
                nameEl.setAttribute(
                    "data-measure-container-width",
                    Math.round(containerWidth)
                );
                nameEl.setAttribute(
                    "data-measure-name-width",
                    Math.round(nameWidth)
                );
            } catch (e) {
                /* ignore in non-DOM environments */
            }

            console.debug(
                `TeamCard: compute for '${member.name}': container=${Math.round(
                    containerWidth
                )}px, name=${Math.round(nameWidth)}px`
            );

            if (nameWidth > containerWidth - 8) {
                setIsOverflowing(true);
                // scroll distance: move left by (nameWidth - containerWidth + padding) px
                const baseOverflow = nameWidth - containerWidth + 12;
                // add a larger extra offset (30% of overflow up to 140px) so it scrolls further and fully reveals
                const extra = Math.min(Math.max(baseOverflow * 0.3, 20), 140);
                // ensure a wider right padding so the last characters are not clipped
                const padRight = Math.ceil(extra + 18);
                const distance = -(baseOverflow + extra);
                // compute a scroll duration proportional to overflow (0.003s per px) clamped between 3s and 8s
                const baseDuration = Math.min(
                    Math.max((baseOverflow + extra) * 0.003, 3),
                    8
                );
                const duration = Math.min(baseDuration * 1.15, 9);
                // set CSS variables on the element for distance and duration (legacy)
                nameEl.style.setProperty("--scroll-distance", `${distance}px`);
                nameEl.style.setProperty("--scroll-duration", `${duration}s`);
                // prepare marquee values for continuous scrolling
                // We'll measure the rendered marquee item (name + spacer) to get the exact width
                const tentativeMarqueeDur = Math.max(duration * 1.2, 4); // slightly slower for marquee
                setMarqueeDuration(tentativeMarqueeDur);
                // With the new CSS approach using -50%, we don't need to calculate distance
                // The animation will automatically use -50% which moves exactly one item width
                // Don't apply paddings here as we handle them in the marquee JSX
                // nameEl.style.paddingRight = `${padRight}px`;
                // nameEl.style.paddingLeft = `8px`;
                // expose scroll extra so we can render an invisible spacer to the right
                setScrollExtra(padRight);
            } else {
                setIsOverflowing(false);
                nameEl.style.removeProperty("--scroll-distance");
                nameEl.style.removeProperty("--scroll-duration");
                setScrollExtra(0);
                setMarqueeDuration(null);
            }
        };

        compute();

        window.addEventListener("resize", compute);
        return () => window.removeEventListener("resize", compute);
    }, [member.name]);

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            rotateY: -15,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
        hover: {
            y: -10,
            scale: 1.05,
            rotateY: 5,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
    };

    const imageVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 },
        },
    };

    const overlayVariants = {
        hover: {
            opacity: 1,
            transition: { duration: 0.25 },
        },
        initial: { opacity: 0.3 },
    };

    // Determine card size based on hierarchy level
    const getCardSize = () => {
        switch (level) {
            case 1:
                return "w-80 h-88"; // Overall Coordinators - slightly reduced height
            case 2:
                return "w-72 h-88"; // Head Coordinators
            case 3:
                return "w-64 h-88"; // Managers
            case 4:
                return "w-60 h-88"; // Executives - smallest
            default:
                return "w-64 h-80";
        }
    };

    const getBorderGlow = () => {
        const dept = member.department || "Tech";
        const color = departmentColors[dept] || "#802b1d";
        return `0 0 20px ${color}40, 0 0 40px ${color}20`;
    };

    return (
        <motion.div
            className={`relative ${getCardSize()} mx-auto rounded-2xl overflow-hidden`}
            variants={cardVariants}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            tabIndex={0}
        >
            {/* (overlay will be inserted inside the rounded card container below so it inherits rounded corners) */}

            {/* Card container with carnival tent design */}
            <motion.div
                className="relative h-full bg-gradient-to-br from-black/80 via-gray-900/70 to-black/90 rounded-2xl overflow-hidden border-2 border-[#f3a83a]/30 backdrop-blur-sm"
                style={{
                    boxShadow: isHovered
                        ? getBorderGlow()
                        : "0 8px 32px rgba(0,0,0,0.4)",
                    background: `linear-gradient(135deg, 
            rgba(128,43,29,0.1) 0%, 
            rgba(44,43,76,0.1) 50%, 
            rgba(243,168,58,0.1) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9))`,
                }}
                initial={false}
                /* Keep the card fully opaque; overlay will sit on top */
                animate={{ opacity: 1 }}
                transition={{ duration: 0.0 }}
            >
                {/* Social overlay inside rounded card (clipped to rounded corners) */}
                <motion.div
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300"
                    style={{ borderRadius: "inherit" }}
                    initial={{ opacity: 0, pointerEvents: "none" }}
                    animate={
                        isHovered
                            ? { opacity: 1, pointerEvents: "auto" }
                            : { opacity: 0, pointerEvents: "none" }
                    }
                    transition={{ duration: 0.28, ease: "easeOut" }}
                >
                    <div className="flex flex-col items-center gap-6 px-4">
                        <div className="flex items-center gap-4">
                            {member.social.linkedin && (
                                <motion.a
                                    href={member.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-carnival-effect social-icon-wrapper block p-3 rounded-xl bg-gradient-to-br from-[#0077b5]/10 to-[#0077b5]/5 border border-[#0077b5]/20 backdrop-blur-sm transition-all duration-300"
                                    initial={{ scale: 0.85, opacity: 0, y: 8 }}
                                    animate={
                                        isHovered
                                            ? { scale: 1, opacity: 1, y: 0 }
                                            : { scale: 0.85, opacity: 0 }
                                    }
                                    transition={{
                                        duration: 0.36,
                                        delay: 0.08,
                                        ease: [0.2, 0.9, 0.25, 1],
                                    }}
                                    whileHover={{
                                        scale: 1.12,
                                        rotate: [0, -6, 4, 0],
                                        y: -3,
                                    }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <div className="relative flex items-center justify-center">
                                        <Linkedin
                                            size={28}
                                            className="text-[#0077b5] transition-colors duration-300"
                                        />
                                        <motion.span
                                            className="absolute inset-0 rounded-xl border border-transparent"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileHover={{
                                                opacity: 0.18,
                                                scale: 1.15,
                                            }}
                                            transition={{ duration: 0.35 }}
                                        />
                                    </div>
                                </motion.a>
                            )}
                            {member.social.github && (
                                <motion.a
                                    href={member.social.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-carnival-effect social-icon-wrapper block p-3 rounded-xl bg-gradient-to-br from-gray-100/10 to-gray-100/5 border border-gray-300/20 backdrop-blur-sm transition-all duration-300"
                                    initial={{ scale: 0.85, opacity: 0, y: 8 }}
                                    animate={
                                        isHovered
                                            ? { scale: 1, opacity: 1, y: 0 }
                                            : { scale: 0.85, opacity: 0 }
                                    }
                                    transition={{
                                        duration: 0.36,
                                        delay: 0.16,
                                        ease: [0.2, 0.9, 0.25, 1],
                                    }}
                                    whileHover={{
                                        scale: 1.12,
                                        rotate: [0, 6, -4, 0],
                                        y: -3,
                                    }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <div className="relative flex items-center justify-center">
                                        <Github
                                            size={28}
                                            className="text-gray-100 transition-colors duration-300"
                                        />
                                        <motion.span
                                            className="absolute inset-0 rounded-xl border border-transparent"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileHover={{
                                                opacity: 0.12,
                                                scale: 1.08,
                                            }}
                                            transition={{ duration: 0.35 }}
                                        />
                                    </div>
                                </motion.a>
                            )}
                            {member.social.instagram && (
                                <motion.a
                                    href={member.social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-carnival-effect social-icon-wrapper block p-3 rounded-xl bg-gradient-to-br from-[#E4405F]/10 to-[#fd5949]/5 border border-[#E4405F]/20 backdrop-blur-sm transition-all duration-300"
                                    initial={{ scale: 0.85, opacity: 0, y: 8 }}
                                    animate={
                                        isHovered
                                            ? { scale: 1, opacity: 1, y: 0 }
                                            : { scale: 0.85, opacity: 0 }
                                    }
                                    transition={{
                                        duration: 0.36,
                                        delay: 0.24,
                                        ease: [0.2, 0.9, 0.25, 1],
                                    }}
                                    whileHover={{
                                        scale: 1.12,
                                        rotate: [0, -4, 4, 0],
                                        y: -3,
                                    }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <div className="relative flex items-center justify-center">
                                        <Instagram
                                            size={28}
                                            className="text-[#E4405F] transition-colors duration-300"
                                        />
                                        <motion.span
                                            className="absolute inset-0 rounded-xl border border-transparent"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileHover={{
                                                opacity: 0.18,
                                                scale: 1.12,
                                            }}
                                            transition={{ duration: 0.35 }}
                                        />
                                    </div>
                                </motion.a>
                            )}
                        </div>
                        {!member.social.linkedin &&
                            !member.social.github &&
                            !member.social.instagram && (
                                <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600/10 to-gray-500/10 border border-gray-400/20 backdrop-blur-sm text-xs text-gray-400 font-medium tracking-wide">
                                    ohh! seems like this member is lost in the
                                    carnival 😱
                                </span>
                            )}
                    </div>
                </motion.div>
                {/* carnival stripe removed to allow image to sit flush */}

                {/* Full-card background image (fills card) */}
                <motion.img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    style={{ objectPosition: "center 18%" }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Top fade between image and card content for smooth transition */}
                <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />

                {/* Hierarchy level indicator (above image) */}
                <div className="absolute top-3 right-3 z-20">
                    <div className="flex space-x-1">
                        {[...Array(5 - level)].map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-gradient-to-r from-[#f3a83a] to-[#802b1d]"
                            />
                        ))}
                    </div>
                </div>

                {/* Content section (backdrop blurred so image shows through) */}
                <motion.section
                    className="absolute left-0 right-0 bottom-0 p-6 space-y-3 bg-black/60 backdrop-blur-sm z-10 rounded-b-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {/* Name with carnival typography - scrolling for long names */}
                    <div
                        ref={nameContainerRef}
                        className={`relative overflow-hidden h-7 flex items-center ${
                            isOverflowing
                                ? "justify-start pl-2"
                                : "justify-center"
                        }`}
                        aria-hidden={false}
                    >
                        {/* Non-overflowing: simple centered name */}
                        {!isOverflowing ? (
                            <h3
                                ref={nameRef}
                                className={`text-xl font-rye text-[#f3a83a] tracking-wide text-stroke-soft whitespace-nowrap`}
                                style={{ display: "inline-block" }}
                            >
                                {member.name}
                            </h3>
                        ) : (
                            <div className="marquee" aria-hidden={true}>
                                <div
                                    className="marquee__track"
                                    style={{
                                        ["--marquee-duration"]: marqueeDuration
                                            ? `${marqueeDuration}s`
                                            : "8s",
                                    }}
                                >
                                    {/* Create two identical items for seamless loop */}
                                    {[0, 1].map((index) => (
                                        <div
                                            key={index}
                                            className="marquee__item"
                                            ref={
                                                index === 0
                                                    ? marqueeItemRef
                                                    : null
                                            }
                                            style={{
                                                paddingRight: "48px", // Fixed spacing between items
                                            }}
                                        >
                                            <span
                                                ref={
                                                    index === 0 ? nameRef : null
                                                }
                                                className="text-xl font-rye text-[#f3a83a] tracking-wide text-stroke-soft whitespace-nowrap"
                                                style={{
                                                    display: "inline-block",
                                                    paddingLeft: 6,
                                                    paddingRight: `${scrollExtra}px`,
                                                }}
                                            >
                                                {member.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Role with department color */}
                    <div className="text-center">
                        <p
                            className="text-sm font-semibold uppercase tracking-wider"
                            style={{
                                color:
                                    departmentColors[member.department] ||
                                    "#eadccb",
                            }}
                        >
                            {member.role}
                        </p>
                    </div>

                    {/* Enhanced Social Links with Reveal Animation */}
                </motion.section>

                {/* Carnival tent bottom decoration */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#802b1d] via-[#f3a83a] to-[#2c2b4c]" />
            </motion.div>
        </motion.div>
    );
};

// Section component for each team hierarchy
const TeamSection = ({ title, members, level, description }) => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1,
            },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    // Grid columns based on team size and level
    const getGridCols = () => {
        if (level === 1) return "grid-cols-1 md:grid-cols-2"; // Overall coordinators
        if (level === 2) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"; // Head coordinators
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"; // Managers & Executives
    };

    return (
        <motion.section
            className="relative py-16 md:py-20"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            {/* Section background with carnival tent pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                {/* Section header */}
                <motion.header
                    className="text-center mb-12"
                    variants={titleVariants}
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-rye text-[#f3a83a] tracking-wide uppercase mb-4 text-stroke-strong">
                        {title}
                    </h2>
                    <div className="mx-auto w-32 h-1 bg-gradient-to-r from-[#802b1d] via-[#f3a83a] to-[#2c2b4c] rounded-full mb-6" />
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {description}
                    </p>
                </motion.header>

                {/* Team grid */}
                <div
                    className={`grid ${getGridCols()} gap-8 justify-items-center`}
                >
                    {members && members.length > 0 ? (
                        members.map((member, index) => (
                            <TeamCard
                                key={member.id}
                                member={member}
                                index={index}
                                level={level}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-400 text-xl">
                                No team members found in this category.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.section>
    );
};

export default function Teams() {
    // 🎪 MOCK SOCIAL LINKS FLAG - Set to false to remove mock data
    const ENABLE_MOCK_SOCIAL_LINKS = false;

    const [isLoading, setIsLoading] = useState(true);
    const [teamData, setTeamData] = useState({
        overallCoordinators: [],
        headCoordinators: [],
        managers: [],
        executives: [],
    });
    const [error, setError] = useState(null);

    // 🎪 Mock social links function (easy to remove later)
    const addMockSocialLinks = (members, memberType) => {
        if (!ENABLE_MOCK_SOCIAL_LINKS || !members || members.length === 0)
            return members;

        // Mock social links for demonstration
        const mockSocialProfiles = [
            {
                linkedin: "https://linkedin.com/in/codeutsava-demo",
                github: "https://github.com/codeutsava-demo",
                instagram: "https://instagram.com/codeutsava_demo",
            },
            {
                linkedin: "https://linkedin.com/in/carnival-dev",
                github: "https://github.com/carnival-dev",
                instagram: "",
            },
            {
                linkedin: "",
                github: "https://github.com/festival-coder",
                instagram: "https://instagram.com/festival_coder",
            },
            {
                linkedin: "https://linkedin.com/in/hackathon-hero",
                github: "",
                instagram: "https://instagram.com/hackathon_hero",
            },
        ];

        // Add mock social links to first few members of each category for demonstration
        return members.map((member, index) => {
            // Add mock social to first 2-3 members of each category
            const shouldAddMock = index < Math.min(3, members.length);
            if (shouldAddMock) {
                const mockProfile =
                    mockSocialProfiles[index % mockSocialProfiles.length];
                return {
                    ...member,
                    social: {
                        linkedin: mockProfile.linkedin,
                        github: mockProfile.github,
                        instagram: mockProfile.instagram,
                    },
                };
            }
            return member;
        });
    };

    // 🎯 Function to inject GitHub IDs from techTeamGithub data
    const injectGithubIds = (members, memberType) => {
        if (!members || members.length === 0) return members;

        // Map member_type to techTeamGithub type
        const typeMapping = {
            MNG: "manager",
            // Add more mappings if needed
        };

        const techType = typeMapping[memberType];
        if (!techType) return members; // If no mapping, return unchanged

        return members.map((member) => {
            // Find matching tech team member by name and type
            const techMember = techTeamGithub.find(
                (tech) =>
                    tech.name.toLowerCase().trim() ===
                        member.name.toLowerCase().trim() &&
                    tech.type === techType
            );

            if (techMember && techMember.github) {
                // Inject GitHub ID into member's social
                return {
                    ...member,
                    social: {
                        ...member.social,
                        github: techMember.github,
                    },
                };
            }

            return member;
        });
    };

    useEffect(() => {
        async function getTeamData() {
            try {
                const response = await fetch(
                    "https://codeutsava.nitrr.ac.in/server/team/2025/"
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                console.log("API Response:", result); // Debug log

                if (result?.data && Array.isArray(result.data)) {
                    // Helper function to convert Google Drive link to thumbnail URL
                    const convertDriveUrl = (url) => {
                        try {
                            if (!url)
                                return "https://via.placeholder.com/300x400?text=No+Image";

                            // Extract file ID from Google Drive URL
                            const match = url.match(/\/d\/([^\/]+)/);
                            if (match && match[1]) {
                                return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w700`;
                            }
                            return url;
                        } catch (err) {
                            console.error("Error converting drive URL:", err);
                            return "https://via.placeholder.com/300x400?text=No+Image";
                        }
                    };

                    // Transform API data to match component structure
                    const transformedData = result.data
                        .map((member) => {
                            try {
                                return {
                                    id: member.id || Math.random(),
                                    name: member.name || "Unknown",
                                    role: member.domain || "Team Member",
                                    department: member.domain || "General",
                                    image: (
                                        member.image || default_profile
                                    ).replace(
                                        "http://localhost:8000",
                                        "https://codeutsava.nitrr.ac.in"
                                    ),
                                    bio:
                                        member.branch && member.year
                                            ? `${member.branch} - Year ${member.year}`
                                            : "Team Member",
                                    social: {
                                        linkedin: member.linkedin || "",
                                        github: "",
                                        instagram: member.instagram || "",
                                    },
                                    member_type: member.member_type, // Keep for filtering
                                };
                            } catch (err) {
                                console.error(
                                    "Error transforming member:",
                                    member,
                                    err
                                );
                                return null;
                            }
                        })
                        .filter(Boolean); // Remove any null entries

                    // Helper: sort so 'Tech' department members are prioritized
                    const sortByDomainPriority = (arr) => {
                        if (!Array.isArray(arr)) return arr || [];
                        const sorted = arr.slice().sort((a, b) => {
                            const da = (a.department || "").toLowerCase();
                            const db = (b.department || "").toLowerCase();
                            const pa = da.includes("tech") ? 0 : 1;
                            const pb = db.includes("tech") ? 0 : 1;
                            if (pa !== pb) return pa - pb; // tech-first-ish when department contains 'tech'
                            // then by department name
                            const depCmp = da.localeCompare(db);
                            if (depCmp !== 0) return depCmp;
                            // finally by name
                            return (a.name || "").localeCompare(b.name || "");
                        });
                        // debug: show order of departments
                        try {
                            console.debug(
                                "sortByDomainPriority result:",
                                sorted.map((s) => ({
                                    name: s.name,
                                    department: s.department,
                                }))
                            );
                        } catch (e) {}
                        return sorted;
                    };

                    // Categorize by member_type
                    const categorized = {
                        overallCoordinators: sortByDomainPriority(
                            injectGithubIds(
                                addMockSocialLinks(
                                    transformedData.filter(
                                        (m) => m.member_type === "OCO"
                                    ),
                                    "OCO"
                                ),
                                "OCO"
                            )
                        ),
                        headCoordinators: sortByDomainPriority(
                            injectGithubIds(
                                addMockSocialLinks(
                                    transformedData.filter(
                                        (m) => m.member_type === "HCO"
                                    ),
                                    "HCO"
                                ),
                                "HCO"
                            )
                        ),
                        managers: sortByDomainPriority(
                            injectGithubIds(
                                addMockSocialLinks(
                                    transformedData.filter(
                                        (m) => m.member_type === "MNG"
                                    ),
                                    "MNG"
                                ),
                                "MNG"
                            )
                        ),
                        executives: sortByDomainPriority(
                            injectGithubIds(
                                addMockSocialLinks(
                                    transformedData.filter(
                                        (m) => m.member_type === "EXC"
                                    ),
                                    "EXC"
                                ),
                                "EXC"
                            )
                        ),
                    };

                    categorized.overallCoordinators.map((member) => {
                        member.role = "Overall Coordinator";
                    });

                    console.log("Categorized Data:", categorized); // Debug log

                    setTeamData(categorized);
                } else {
                    throw new Error("Invalid API response structure");
                }
            } catch (error) {
                console.error("Error fetching team data:", error);
                setError(`Failed to load team data: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        }

        getTeamData();
    }, []);

    const pageVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                staggerChildren: 0.3,
            },
        },
    };

    const heroVariants = {
        hidden: { opacity: 0, y: -50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
            },
        },
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="w-16 h-16 border-4 border-[#f3a83a] border-t-transparent rounded-full mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    <h2 className="text-2xl font-rye text-[#f3a83a] tracking-wide">
                        Loading Carnival Team...
                    </h2>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            className="min-h-screen relative overflow-hidden"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Background and overlays */}
            <BackgroundMedia imageSrc={bg_image} />
            <Fireworks />
            <SparkleLayer />
            <Cursor />

            {/* Navigation */}
            <Navbar />

            {/* Error notification */}
            {error && (
                <motion.div
                    className="fixed top-24 right-4 bg-red-900/90 border-2 border-red-500 text-white px-6 py-4 rounded-lg backdrop-blur-sm z-50 max-w-sm shadow-xl"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-sm font-semibold">⚠️ {error}</p>
                    <p className="text-xs mt-1 opacity-80">
                        Please try refreshing the page
                    </p>
                </motion.div>
            )}

            {/* Main content */}
            <main className="relative z-10 pt-20">
                {/* Hero section */}
                <motion.section
                    className="relative py-20 md:py-32 text-center"
                    variants={heroVariants}
                >
                    {/* Carnival tent top decoration */}
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 h-8 bg-gradient-to-r from-[#802b1d] via-[#f3a83a] to-[#2c2b4c] rounded-b-full" />

                    <div className="relative z-10 max-w-4xl mx-auto px-4">
                        <motion.h1
                            className="text-3xl md:text-5xl lg:text-5xl font-rye text-[#f3a83a] tracking-wide uppercase mb-6 text-stroke-strong"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Meet Our
                        </motion.h1>
                        <motion.h1
                            className="text-3xl md:text-5xl lg:text-5xl font-rye text-[#f3a83a] tracking-wide uppercase mb-8 text-stroke-strong"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            Carnival Crew
                        </motion.h1>

                        <motion.div
                            className="mx-auto w-48 h-2 bg-gradient-to-r from-[#802b1d] via-[#f3a83a] to-[#2c2b4c] rounded-full mb-8"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.7 }}
                        />

                        <motion.p
                            className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-outline-soft"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                        >
                            Behind every great carnival is an extraordinary team
                            of dedicated performers, organizers, and visionaries
                            who make the magic happen. Get to know the
                            incredible people bringing CodeUtsava 9.0 to life!
                        </motion.p>
                    </div>

                    {/* Floating carnival elements */}
                    <motion.div
                        className="absolute top-20 md:top-1/4 md:left-50 text-5xl md:text-8xl"
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        🎪
                    </motion.div>

                    <motion.div
                        className="absolute md:bottom-1/4 right-10 md:right-20 text-5xl md:text-8xl"
                        animate={{
                            y: [0, 15, 0],
                            rotate: [0, -5, 5, 0],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    >
                        🎨
                    </motion.div>
                </motion.section>

                {/* Team sections */}
                <TeamSection
                    title="Overall Coordinators"
                    members={teamData.overallCoordinators}
                    level={1}
                    description="The masterminds orchestrating our grand carnival spectacle, ensuring every act performs in perfect harmony."
                />

                <TeamSection
                    title="Head Coordinators"
                    members={teamData.headCoordinators}
                    level={2}
                    description="Department heads who lead their specialized acts, bringing expertise and vision to every carnival ring."
                />

                <TeamSection
                    title="Managers"
                    members={teamData.managers}
                    level={3}
                    description="The skilled coordinators who ensure each carnival act is executed flawlessly, managing day-to-day magic."
                />

                <TeamSection
                    title="Executives"
                    members={teamData.executives}
                    level={4}
                    description="Our talented team members who bring creativity, energy, and passion to make the carnival dreams a reality."
                />
            </main>

            {/* Footer */}
            <Footer />
        </motion.div>
    );
}
