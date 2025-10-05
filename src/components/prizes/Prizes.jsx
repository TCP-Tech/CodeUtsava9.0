import React from "react";
import prizesBg from "../../assets/images/pbg.png";

const prizeItems = [
  {
    heading: "🥇 WINNER'S",
    list: [
      "A monetary prize of Rs. 35,000 and Rs. 2 Lakhs worth of prizes will be presented to the winning team.",
      "A Wolfram | Alpha Pro subscription for one year absolutely free.",
      "An O’Reilly ebook for free.",
      "One month free Echo-3D Premium.",
    ],
  },
  {
    heading: "RUNNER UP'S",
    list: [
      "A monetary prize of Rs. 25,000 and Rs. 1.9 lakhs worth of prizes will be presented to the winning team.",
      "A Wolfram | Alpha Pro subscription for one year absolutely free.",
      "An O’Reilly ebook for free.",
      "One month free Echo-3D Premium.",
    ],
  },
  {
    heading: "2nd RUNNER UP'S",
    list: [
      "The second runner-up team will be awarded Rs. 2.3 Lakhs, with Rs. 15,000 in cash.",
      "A Wolfram | Alpha Pro subscription for one year absolutely free.",
      "An O’Reilly ebook for free.",
      "One month free Echo-3D Premium.",
    ],
  },
  {
    heading: "PROBLEM DOMAIN WINNERS",
    list: [
      "The category wise winning teams will be awarded Rs. 1.5 lakhs in total, with Rs. 10,000 in cash to each team.",
      "A Wolfram | Alpha Pro subscription for one year absolutely free.",
      "One month free Echo-3D Premium.",
    ],
  },
  {
    heading: "BEST HACK BUILT ON ETHEREUM + POLYGON",
    list: ["The winning team will be awarded Rs. 16,000 in cash."],
  },
  {
    heading: "FOR ALL PARTICIPANTS!",
    list: [
      "30 days FREE trial of O' Reilly learning platform.",
      "30 days FREE access to Wolfram | One.",
      "One month FREE Echo3D Pro.",
      "Tshirts, stickers and other goodies for the team.",
      "System Driven mocks by InterviewBuddy.",
    ],
  },
];

export default function PrizesSection() {
  return (
    <div
      className="
        relative z-[1] pt-28 md:pt-32 scroll-mt-32
        min-h-screen w-full bg-[url('/background.jpg')] bg-center bg-cover
        flex items-center justify-center
        p-4 sm:p-6 md:p-10 overflow-x-hidden
      "
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Outer glass container with light blue border */}
        <div className="backdrop-blur-lg bg-white/10 border-4 border-blue-900 rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-lg">
          
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-10 font-rye">
            PRIZES
          </h2>

          {/* Subheading */}
          <h3 className="font-['Protest_Revolution'] text-2xl sm:text-3xl md:text-4xl text-center text-white mb-12">
            WIN EXCITING PRIZES WORTH UPTO{" "}
            <span className="text-[#e977e9]">36 LAKHS!</span> 🏆
          </h3>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center">
            {prizeItems.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center justify-start
                  w-[500px] md:w-[450px] sm:w-full p-14 text-white
                  rounded-2xl"
                style={{
                  backgroundImage: `url(${prizesBg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "100% 100%",
                  minHeight: "480px", // increased height
                }}
              >
                <h2 className="font-['Protest_Revolution'] text-[24px] mb-6 text-white text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  {item.heading}
                </h2>

                <ul className="w-full px-6 text-left font-sans text-white/90 text-[16px] leading-relaxed space-y-3">
                  {item.list.map((listItem, liIndex) => (
                    <li key={liIndex} className="list-disc marker:text-orange-400">
                      {listItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs sm:text-sm text-white/60 text-center italic">
            *All rewards and offers are subject to confirmation by sponsors and organizing committee.
          </p>
        </div>
      </div>
    </div>
  );
}
