import { useState } from "react";
import FAQimg from "../assets/images/faq_img_final.png";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            q: "HOW DO I REGISTER FOR THE HACKATHON?",
            a: "Visit our registration page and fill out the required details. You’ll receive a confirmation email once you’re registered.",
        },
        {
            q: "WHAT IS THE PARTICIPATION FEE?",
            a: (
                <>
                    Participation is <b>completely free</b>! There are no charges at any stage of the hackathon.
                </>
            ),
        },
        {
            q: "WHAT IF I DON’T HAVE A TEAM OR IDEA?",
            a: "No worries! You can register solo and find teammates during the team formation phase, or get inspired by our problem statements.",
        },
        {
            q: "WHO CAN PARTICIPATE?",
            a: "Anyone who is a student (undergraduate or postgraduate) can participate, regardless of experience level.",
        },
        {
            q: "WHEN AND HOW WILL THE TEAMS BE SHORTLISTED?",
            a: "Teams will be shortlisted based on their idea submissions. Check the timeline on our website for announcement dates.",
        },
        {
            q: "WHAT IS THE IDEAL TEAM SIZE?",
            a: "Teams should consist of 2-4 Members.",
        },
        {
            q: "WHY SHOULD I PARTICIPATE IN CODEUTSAVA?",
            a: "Winners get cash prizes, and all participants will have excellent networking opportunities, learn new skills, and get cool swag ;)",
        },
        {
            q: "WHAT OTHER PERKS ARE PROVIDED?",
            a: "Accommodations and meals will be provided, and travel expenses up to Rs.1500 per individual will be reimbursed for all the selected teams participating in CodeUtsava 9.0!",
        },
        {
            q: "HOW WILL THE TEAMS BE JUDGED?",
            a: (
                <>
                    Teams will be judged on viability, technical complexity, presentation
                    skills, guidelines, and most importantly, creativity.{" "}
                    <a
                        href="./Judgement Criteria.pdf"
                        className="text-orange-700 underline"
                        download="Judgement Criteria"
                    >
                        Judgment Criteria
                    </a>
                </>
            ),
        },
        {
            q: "WHAT IS THE CODE OF CONDUCT?",
            a: "To ensure a positive experience for all participants, we follow the SIH Code of Conduct. Please review it before the event.",
        },
    ];

    return (
        <div id="faq" className="flex justify-center py-12">
            {/* Main gradient box */}
            <div className="max-w-7xl w-full bg-gradient-to-r from-red-500/60 via-orange-400/60 to-yellow-400/60 backdrop-blur-md rounded-2xl p-10 shadow-2xl">
                {/* Header */}
                <h1 className="text-6xl font-rye text-white drop-shadow-lg text-center mb-12 font-bold">
                    FAQs
                </h1>

                {/* Top section: text (left) + image (right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
                    {/* Left: descriptive text */}
                    <div>
                        <p className="text-lg text-white font-sans font-semibold leading-relaxed">
                            <b className="text-2xl block mb-2">New to hackathon?</b>
                            Don’t worry! We’ve got you covered with all the basic information.
                        </p>
                    </div>

                    {/* Right: image */}
                    <div className="flex justify-center">
                        <img
                            src={FAQimg}
                            alt="FAQ Illustration"
                            className="h-40 md:h-48 lg:h-56 w-auto object-contain"
                        />
                    </div>
                </div>

                {/* Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="p-[2px] rounded-lg bg-gradient-to-r from-red-500/80 via-orange-400 to-yellow-500 mb-4"
                        >
                            <div className="bg-white/80 rounded-lg shadow-md">
                                <div
                                    className="cursor-pointer flex justify-between items-center px-4 py-3 text-red-700 font-rye font-bold text-lg md:text-xl tracking-wide"
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                >
                                    {faq.q}
                                    <span className="relative w-4 h-4 flex items-center justify-center">
                                        <span className="absolute w-4 h-0.5 bg-red-700/80 transition-transform duration-300"></span>
                                        <span
                                            className={`absolute w-0.5 h-4 bg-orange-600/80 transition-all duration-300 ${openIndex === idx ? "opacity-0" : "opacity-100"
                                                }`}
                                        ></span>
                                    </span>
                                </div>
                                {openIndex === idx && (
                                    <div className="px-4 py-3 bg-transparent text-orange-600 font-medium font-sans text-base md:text-l">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
