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
        <div className="backdrop-blur-lg bg-white/10 border-4 border-blue-900 rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-lg">
          
          {/* Heading */}

          {/* Subheading */}
          <h3 className="font-['Protest_Revolution'] text-2xl sm:text-3xl md:text-4xl text-center text-white mb-12 font-rye">
            WIN EXCITING PRIZES WORTH UPTO{" "}
            <span className="text-[#eb920c]">36 LAKHS!</span> 🏆
          </h3>

          {/* Cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 place-items-center">
            {Prizes.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center justify-start
                  w-[500px] md:w-[450px] sm:w-full text-white rounded-2xl"
                style={{
                  backgroundImage: `url(${prizesBg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "100% 100%",
                  minHeight: "600px",
                  minWidth: "600px",
                  padding: "140px 70px 60px 100px", // keeps text inside yellow area
                }}
              >
                {/* Title */}
                <h2 className="font-['Protest_Revolution'] text-[24px] mb-6 text-cyan-700 text-center drop-shadow-[0_2px_0px_rgba(0,0,0,0.8)] font-rye pt-2.5 pl-12 pr-15 ">
                  {item.title}
                </h2>

                {/* Cash Prize Section */}
                {item.cashPrize.length > 0 && (
                  <ul className="w-full text-left font-rye text-cyan-900 text-[17px] leading-relaxed space-y-2 pl-14 pr-14 ">
                    {item.cashPrize.map((cash, i) => (
                      <li key={i} className="list-disc marker:text-black">
                        {cash}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Prize Info Section */}
                {item.prizeInfo.length > 0 && (
                  <ul className="w-full text-left font-rye text-cyan-900 text-[17px] leading-relaxed space-y-2 pl-14 pr-14 ">
                    {item.prizeInfo.map((info, i) => (
                      <li key={i} className="list-disc marker:text-black">
                        {info}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-10 text-xs sm:text-sm text-black text-center italic">
          </p>
        </div>
      </div>
    </div>
  );
}
