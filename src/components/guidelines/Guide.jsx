import React from "react";

export default function Guide() {
  return (
    <div className="min-h-screen w-full bg-[url('/background.jpg')] bg-center bg-cover flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-6xl mx-auto">
        <div className="backdrop-blur-lg bg-white/10 border-4 border-blue-900 rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-lg">
          
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 sm:mb-8 font-rye">
            Guidelines
          </h2>

          {/* Body text */}
          <div className="text-white/90 space-y-4 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed  font-sans">
            <p>
              <strong>1. All <span className="text-yellow-300">team members</span> should be from the same college; 
              <span className="text-yellow-300"> no inter-college </span>teams are allowed. However, members from <span className="text-yellow-300"> different branches </span> of the same college/institute are encouraged to form a team.
              </strong> 
            </p>

            <p>
              <strong>2. Each team would comprise <span className="text-yellow-300"> 2-4 </span>  members, 
              including the <span className="text-yellow-300">team leader </span>.
              </strong>
            </p>

            <p>
              <strong>3. As the <span className="text-yellow-300"> software edition </span> of the hackathon 
              is a digital product development competition, the majority of the team members must 
              be well versed with <span className="text-yellow-300"> programming skills </span>. For the <span className="text-yellow-300"> hardware edition, </span> we encourage 
              multidisciplinary teams – which means your team should have a good mix of Mechanical 
              Engineers, Electronics Engineers, Product Designers and Programmers, etc.
              </strong>
            </p>

            <p className="pt-2">
              <strong>Please Note: NIT Raipur will be providing <span className="text-yellow-300"> meals, travel </span> and <span className="text-yellow-300"> accommodation 
              free of cost. </span> Travel charges up to <span className="text-yellow-300"> Rs. 1500 </span> per person to and fro 
              will be reimbursed when presented with a valid ticket/booking receipt.
              </strong>
            </p>
          </div>

          {/* Download button */}
          <div className="mt-8 flex justify-center">
            <a
              href="/assets/judgement_criteria.pdf" // place the PDF in public/assets/
              download="Judgement_Criteria.pdf"
              className="flex items-center justify-center text-white font-rye px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-blue-700 hover:bg-white hover:text-blue-900 transition-colors duration-300"
            >
              Judgement Criteria
            </a>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-white/60 text-center">
             <code className="bg-white/6 px-1 rounded">
            </code> 
          </p>
        </div>
      </div>
    </div>
  );
}
