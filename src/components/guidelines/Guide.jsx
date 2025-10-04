import React from "react";
import TicketButton from "../button/TicketButton";
import Judgement_Criteria from "../../assets/pdfs/Judgement Criteria.pdf";

export default function Guide() {
  return (
    <div className="min-h-screen w-full bg-[url('/background.jpg')] bg-center bg-cover flex flex-col items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-6xl mx-auto text-center mb-8">
        {/* Guidelines heading OUTSIDE */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rye text-[#F3A83A] tracking-wide uppercase drop-shadow-[0_0_14px_rgba(251,146,60,0.95)] p-5">
          Guidelines 
        </h1>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        {/* Gradient border wrapper */}
        <div
          className="relative rounded-3xl p-[1px] 
          bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-accent-2)] 
          shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
        >
          {/* Inner backdrop-blur card */}
          <div className="backdrop-blur-lg bg-[color:var(--color-background)]/85 border-4 border-transparent rounded-[inherit] p-6 sm:p-8 md:p-12 lg:p-16">
            
            {/* Inside heading */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-6 font-rye pb-5">
              Team Formation
            </h3>

            {/* Body text */}
            <div className="text-white/90 space-y-4 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-sans">
              <p>
                <strong>
                  1. All <span className="text-orange-400">team members</span> should be from the same college; 
                  <span className="text-orange-400"> no inter-college </span>teams are allowed. However, members from 
                  <span className="text-orange-400"> different branches </span> of the same college/institute are encouraged to form a team.
                </strong>
              </p>

              <p>
                <strong>
                  2. Each team would comprise <span className="text-orange-400">2–4</span> members, 
                  including the <span className="text-orange-400">team leader</span>.
                </strong>
              </p>

              <p>
                <strong>
                  3. As the <span className="text-orange-400">software edition</span> of the hackathon 
                  is a digital product development competition, the majority of the team members must 
                  be well versed with <span className="text-orange-400">programming skills</span>. For the 
                  <span className="text-orange-400"> hardware edition, </span> we encourage multidisciplinary teams – 
                  which means your team should have a good mix of Mechanical Engineers, Electronics Engineers, 
                  Product Designers, and Programmers, etc.
                </strong>
              </p>

              <p className="pt-2">
                <strong>
                  Please Note: NIT Raipur will be providing <span className="text-orange-400">meals, travel</span> and 
                  <span className="text-orange-400"> accommodation free of cost.</span> Travel charges up to 
                  <span className="text-orange-400"> Rs. 1500 </span> per person to and fro will be reimbursed when 
                  presented with a valid ticket/booking receipt.
                </strong>
              </p>
            </div>

            {/* Download button */}
            <div className="mt-8 flex justify-center">
              <TicketButton
                text="JUDGEMENT CRITERIA"
                onClick={() =>
                  window.open(Judgement_Criteria, "_blank")
                }
                style={{
                  width: "300px",
                  height: "60px",
                  fontSize: "16px",
                }}
              />
            </div>

            <p className="mt-4 text-xs sm:text-sm text-white/60 text-center">
              <code className="bg-white/6 px-1 rounded"></code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
