import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ticketImg from "../../assets/images/ticket.png";
import modalBg from "../../assets/images/teamMembers.png";
import { X } from "lucide-react";
import shortlistedTeams from "../../assets/data/shortlistedTeamsData";

// Transform shortlistedTeams to match expected structure
const teamsData = shortlistedTeams.map((team) => ({
    name: team.name,
    college: team.college,
    members: [team.member1, team.member2, team.member3, team.member4].filter(
        Boolean
    ),
}));

function TeamModal({ team, onClose }) {
    return (
        <AnimatePresence>
            {team && [
                // --- backdrop ---
                <motion.div
                    key="backdrop"
                    // 👇 FIX 1: Changed z-[-5] back to a high positive value
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />,

                // --- main modal box ---
                <motion.div
                    key="modal"
                    className="fixed z-[1000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      rounded-3xl overflow-hidden w-[90%] h-[70%] mt-8 max-w-5xl max-h-[90vh]
                      flex flex-col items-center justify-center shadow-2xl"
                    style={{
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="team-modal-title"
                >
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: `url(${modalBg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(1px) brightness(0.5)",
                        }}
                    ></div>

                    {/* --- content container --- */}
                    <div className="relative z-[1] w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-10 overflow-y-auto">
                        {/* --- heading section --- */}
                        <div className="text-center mb-6 bg-[#971b869c] text-[#ffffff] px-4 sm:px-8 py-2 sm:py-4 rounded-2xl shadow-md">
                            <h2
                                id="team-modal-title"
                                className="text-3xl sm:text-4xl md:text-5xl font-['Rye'] drop-shadow-[0_0_10px_rgba(243,168,255,0.4)]"
                            >
                                {team.name}
                            </h2>
                            <p className="mt-2 text-base sm:text-lg font-semibold">
                                {team.college}
                            </p>
                        </div>

                        {/* --- members table --- */}
                        <div className="w-full flex justify-center">
                            <div className="overflow-x-auto shadow-lg p-2 sm:p-4 w-[95%] md:w-[80%] lg:w-[70%]">
                                <table className="w-full text-center border-collapse text-white">
                                    <thead>
                                        <tr className="bg-[#43093bb5] text-[#ffffff]">
                                            <th className="border border-fuchsia-700 px-2 sm:px-4 py-2 text-sm sm:text-base">
                                                Team Member
                                            </th>
                                            <th className="border border-fuchsia-700 px-2 sm:px-4 py-2 text-sm sm:text-base">
                                                Name
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {team.members.map((member, idx) => (
                                            <tr
                                                key={idx}
                                                className={
                                                    idx % 2 === 0
                                                        ? "bg-[#7b2368d1]"
                                                        : "bg-[#5b204ecd]"
                                                }
                                            >
                                                <td className="border border-fuchsia-700 px-2 sm:px-4 py-2 text-sm sm:text-base text-[#ffffff] font-semibold">
                                                    {idx + 1}
                                                </td>
                                                <td className="border border-fuchsia-700 px-2 sm:px-4 py-2 text-sm sm:text-base">
                                                    {member}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* --- close button --- */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 sm:top-5 sm:right-5 text-gray-200 hover:text-white bg-black/40 rounded-full p-1.5 z-[2]" // Ensure button is above content
                        aria-label="Close"
                    >
                        <X size={26} />
                    </button>
                </motion.div>,
            ]}
        </AnimatePresence>
    );
}

function TeamTicket({ team, onClick }) {
    return (
        <motion.div
            className="relative w-60 h-36 flex justify-center items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => onClick(team)}
        >
            <img
                src={ticketImg}
                alt="Ticket background"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            />
            <div
                className="absolute z-10 w-[61%] h-[62%] ml-5 mt-1 flex flex-col justify-center items-center shadow-lg"
                style={{ backgroundColor: "#e0c8a9" }}
            >
                <span className="block font-['Rye'] text-red-800 text-xl drop-shadow-md text-center px-2">
                    {team.name}
                </span>
            </div>
        </motion.div>
    );
}

export default function TeamsShortlisted() {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const scrollYRef = useRef(0);
    const prevScrollBehaviorRef = useRef("");

    // ✅ Scroll lock with instant restore
    useEffect(() => {
        if (selectedTeam) {
            scrollYRef.current = window.scrollY || window.pageYOffset || 0;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollYRef.current}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";
            prevScrollBehaviorRef.current =
                document.documentElement.style.scrollBehavior || "";
            document.documentElement.style.scrollBehavior = "auto";
            document.documentElement.style.overflow = "hidden";
        } else {
            const storedY = scrollYRef.current;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";
            document.documentElement.style.scrollBehavior = "auto";
            document.documentElement.style.overflow = "";
            window.scrollTo(0, storedY || 0);
            requestAnimationFrame(() => {
                document.documentElement.style.scrollBehavior =
                    prevScrollBehaviorRef.current || "";
            });
        }

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";
            document.documentElement.style.overflow = "";
            document.documentElement.style.scrollBehavior =
                prevScrollBehaviorRef.current || "";
        };
    }, [selectedTeam]);

    // 👇 FIX 2: Use a React Fragment <> to return the section AND the modal as siblings
    return (
        <>
            <section className="relative z-0 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24 pt-28 md:pt-32">
                <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rye text-[#F3A83A] tracking-wide uppercase drop-shadow-[0_0_14px_rgba(251,146,60,0.95)] mb-12">
                    Teams Shortlisted
                </h2>

                <div
                    className="
            grid justify-items-center
            grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
            gap-x-3 gap-y-4 md:gap-x-3 md:gap-y-2
            mx-auto max-w-[1600px]
          "
                >
                    {teamsData.map((team, idx) => (
                        <TeamTicket
                            key={idx}
                            team={team}
                            onClick={setSelectedTeam}
                        />
                    ))}
                </div>

                {/* Modal was previously here, trapped inside the z-0 section */}
            </section>

            {/* 👇 FIX 2: Modal is now OUTSIDE the section, so it's not trapped by z-0 */}
            <TeamModal
                team={selectedTeam}
                onClose={() => setSelectedTeam(null)}
            />
        </>
    );
}
