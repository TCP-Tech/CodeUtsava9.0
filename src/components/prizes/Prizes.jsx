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
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-10 font-rye">
          PRIZES
        </h2>

        {/* Outer glass container */}
        <div className="backdrop-blur-lg bg-white/10 border-4 border-blue-900 rounded-3xl p-4 sm:p-6 md:p-12 lg:p-16 shadow-lg">
          
          {/* Subheading */}
          <h3 className="font-['Protest_Revolution'] text-center text-white mb-12 font-rye"
              style={{ fontSize: "clamp(20px, 4vw, 36px)" }}
          >
            WIN EXCITING PRIZES WORTH UPTO{" "}
            <span className="text-[#eb920c]">36 LAKHS!</span> 🏆
          </h3>

          {/* Cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center">
            {Prizes.map((item, index) => (
              <div
                key={index}
                className="
                  relative flex flex-col items-center justify-start
                  aspect-square
                  w-[95%] xs:w-[320px] sm:w-[380px] md:w-[440px] lg:w-[500px]
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
                  paddingBottom: "clamp(20px, 5%, 80px)",
                }}
              >
                {/* Inner padding wrapper */}
                <div
                  className="
                    flex flex-col justify-start items-center
                    w-full h-full
                    px-[10%] py-[20%]
                    sm:px-[9%] sm:py-[18%]
                    md:px-[10%] md:py-[20%]
                    lg:px-[12%] lg:py-[22%]
                    
                  "
                >
                  {/* Title */}
                  <h2
                    className="
                      font-['Protest_Revolution'] 
                      mb-3 text-cyan-700 text-center drop-shadow-[0_2px_0px_rgba(0,0,0,0.8)] 
                      font-rye break-words
                    "
                    style={{ fontSize: "clamp(8px, 2.2vw, 24px)" }}
                  >
                    {item.title}
                  </h2>

                  {/* Cash Prize Section */}
                  {item.cashPrize.length > 0 && (
                    <ul
                      className="
                        w-full text-left font-rye text-cyan-900 leading-relaxed
                        space-y-2 list-disc marker:text-black break-words
                      "
                      style={{ fontSize: "clamp(8px, 1.8vw, 14px)" }}
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
                        space-y-2 list-disc marker:text-black mt-2 break-words
                      "
                      style={{ fontSize: "clamp(8px, 1.8vw, 14px)" }}
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
  );
}
