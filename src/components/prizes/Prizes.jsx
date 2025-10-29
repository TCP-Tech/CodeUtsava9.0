import React from "react";

import prizesBg from "../../assets/images/pbg.png";

import Prizes from "../../assets/data/PrizesData.js";

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
              {/* Custom CSS for font scaling on <= 988px */}
      <style>
        {`
        @media (max-width: 389px) {
          /* Target outer card padding for max image size */
          .prize-card {
            padding-left: 2px !important;
            padding-right: 2px !important;
            padding-top: 5px !important;
            padding-bottom: 5px !important;
            /* Ensure the card is fluid for very small screens */
            width: 98% !important; 
            max-width: 500px !important;
          }

          /* Target the content wrapper for text fitting */
          .prize-card > div {
            /* Reduce horizontal space further to prevent text overflow/wrapping issues */
            padding-left: 4rem !important;
            padding-right: 3rem !important;
          }
          
          /* Target title for reduced font size */
          .prize-card h2 {
            max-width: 150px !important;
            font-size: 7px !important; /* Very small font size for tightest fit */
            padding-top:0.7rem !important;
          }

          /* Target list items for reduced font size */
          .prize-card ul {
            font-size: 7px !important; /* Extremely small font size for tightest fit */
          }
        }
        `}
      </style>
     

      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rye text-[#F3A83A] tracking-wide uppercase drop-shadow-[0_0_14px_rgba(251,146,60,0.95)] p-12 text-stroke-strong">
          PRIZES
        </h2>

        {/* Outer glass container with carnival theme */}
        <div className="relative">
          {/* Gradient border frame */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#802b1d] via-[#2c2b4c] to-[#f3a83a] p-[2px]">
            <div className="h-full w-full rounded-[inherit] bg-black/40 backdrop-blur-lg"></div>
          </div>
          
          {/* Content container */}
          <div className="relative backdrop-blur-lg bg-gradient-to-br from-black/60 via-black/40 to-black/60 border border-white/20 rounded-3xl p-4 sm:p-6 md:p-12 lg:p-16 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
          
            {/* Subheading */}
            <h3
              className="font-rye text-center text-white mb-12 text-stroke-strong"
              style={{ fontSize: "clamp(20px, 4vw, 36px)" }}
            >
              WIN EXCITING PRIZES WORTH UPTO{" "}
              <span className="text-[#f3a83a] drop-shadow-[0_0_10px_rgba(243,168,58,0.8)]">36 LAKHS!</span> 🏆
            </h3>

          {/* Cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center">
            {Prizes.map((item, index) => (
              <div
                key={index}
                className="
                  prize-card
                  relative flex flex-col items-center justify-start
                  aspect-square
                  w-[95%] xs:w-[320px] sm:w-[440px] md:w-[490px] lg:w-[500px]
                  text-white rounded-2xl transition-all duration-300
                "
                style={{
                  backgroundImage: `url(${prizesBg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "100% 100%",
                  paddingLeft: "clamp(10px, 25%, 70px)",
                  paddingRight: "clamp(10px, 50%, 50px)",
                  paddingTop: "clamp(14px, 10%, 80px)",
                  paddingBottom: "clamp(50px, 5%, 80px)",
                }}
              >
                {/* Inner padding wrapper */}
                <div
                  className="
                    flex flex-col justify-start items-center text-sm
                    w-[90%] h-full
                    px-[10%] py-[20%]
                    xs:px-[8%] xs:py-[20%]
                    sm:px-[9%] sm:py-[19%]
                    md:px-[10%] md:py-[18%]
                    lg:px-[12%] lg:py-[22%]
                  "
                >
                  {/* Title */}
                  <h2
                    className="
                      font-rye
                      mb-1 text-cyan-700 text-center
                      break-words
                      text-base
                      md:text-xs
                      sm:text-xs
                    "
                    style={{ fontSize: "clamp(8px, 2.2vw, 22px)" }}
                  >
                    {item.title}
                  </h2>

                  {/* Cash Prize Section */}
                  {item.cashPrize.length > 0 && (
                    <ul
                      className="
                        w-full text-left font-rye text-cyan-900 leading-relaxed
                        space-y-2 list-disc marker:text-black break-words
                        md:text-[10px]
                      "
                      style={{ fontSize: "clamp(8px, 1.8vw, 12.5px)" }}
                    >
                      {item.cashPrize.map((cash, i) => (
                        <li key={i}>{cash}</li>
                      ))}
                    </ul>
                  )}

                  {/* Prize Info Section */}
                  {item.prizeInfo.length > 0 && (
                    <ul
                      className="
                        w-full text-left font-rye text-cyan-900 leading-relaxed
                         list-disc marker:text-black mt-1 break-words
                      "
                      style={{ fontSize: "clamp(8px, 1.8vw, 12.5px)" }}
                    >
                      {item.prizeInfo.map((info, i) => (
                        <li key={i}>{info}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}