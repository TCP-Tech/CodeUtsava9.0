import React from "react";
import { useState } from "react";
import { Sparkles, Ticket, PartyPopper } from "lucide-react";

const problems = [
  {
    img: "🎪",
    title: "To be Announced",
    domain: "AR/VR & Gaming",
    impact: "Enhanced digital entertainment",
    background: "Create immersive carnival experiences",
    statement: "Design a virtual carnival platform with interactive games and attractions"
  },
  {
    img: "🎡",
    title: "To be Announced",
    domain: "IoT & Analytics",
    impact: "Reduced wait times",
    background: "Optimize carnival ride queues",
    statement: "Build a system to manage and predict carnival attraction wait times"
  },
  {
    img: "🎠",
    title: "To be Announced",
    domain: "Computer Vision",
    impact: "Improved safety protocols",
    background: "Monitor crowd density and safety",
    statement: "Develop AI-powered safety monitoring for carnival grounds"
  },
  {
    img: "🎢",
    title: "To be Announced",
    domain: "Blockchain & Fintech",
    impact: "Seamless transactions",
    background: "Modernize carnival payment systems",
    statement: "Create a contactless payment and ticketing solution for carnival attractions"
  },
  {
    img: "🎭",
    title: "To be Announced",
    domain: "ML & Optimization",
    impact: "Better event planning",
    background: "Optimize carnival show timings",
    statement: "Develop an AI system to schedule performances based on crowd patterns"
  },
  {
    img: "🍿",
    title: "To be Announced",
    domain: "Data Science",
    impact: "Reduced waste",
    background: "Optimize food stall operations",
    statement: "Build predictive analytics for food demand at carnival vendors"
  }
];

const ProblemCard = ({ img, title, domain, impact, background, statement }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-80 perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-red-950/60 to-amber-600/40 border-2 border-red-500/10 rounded-2xl shadow-[0_0_20px_rgba(248,113,113,0.3)] p-6 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(251,146,60,0.5)] transition-all">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-7xl mb-4 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]">
              {img}
            </div>
            <h3 className="text-2xl font-bold text-center mb-3 text-orange-300 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]">
              {title}
            </h3>
            <span className="bg-gradient-to-r from-red-600 to-amber-600 text-orange-100 px-5 py-2 rounded-full text-sm font-bold shadow-[0_0_12px_rgba(251,146,60,0.4)] border border-orange-400/30">
              {domain}
            </span>
            <p className="text-sm mt-5 text-center text-stone-400 font-medium">
              Click to reveal details
            </p>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-amber-900/50 to-red-950/60 border-2 border-amber-500/50 rounded-2xl shadow-[0_0_25px_rgba(250,204,21,0.3)] p-6 backdrop-blur-sm rotate-y-180">
          <div className="flex flex-col h-full text-orange-100 overflow-y-auto">
            <h4 className="font-bold text-lg mb-2 text-orange-300 drop-shadow-[0_0_6px_rgba(251,146,60,0.5)]">
              💫 Impact:
            </h4>
            <p className="text-sm mb-4 text-stone-300">{impact}</p>
            
            <h4 className="font-bold text-lg mb-2 text-orange-300 drop-shadow-[0_0_6px_rgba(251,146,60,0.5)]">
              📋 Background:
            </h4>
            <p className="text-sm mb-4 text-stone-300">{background}</p>
            
            <h4 className="font-bold text-lg mb-2 text-orange-300 drop-shadow-[0_0_6px_rgba(251,146,60,0.5)]">
              🎯 Statement:
            </h4>
            <p className="text-sm text-stone-300">{statement}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProblemStatements = () => {
  return (
    <div className="min-h-screen z-0 flex flex-col items-center px-6 relative overflow-hidden" id="problems">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 animate-bounce delay-100 text-4xl">🎈</div>
        <div className="absolute top-40 right-20 animate-bounce delay-300 text-4xl">🎪</div>
        <div className="absolute bottom-32 left-1/4 animate-bounce delay-500 text-4xl">🎡</div>
        <div className="absolute top-1/3 right-1/3 animate-bounce delay-700 text-4xl">🎠</div>
        <div className="absolute bottom-20 right-10 animate-bounce delay-200 text-4xl">🎢</div>
        <div className="absolute top-1/2 left-10 animate-bounce delay-400 text-4xl">🍿</div>
        <div className="absolute bottom-40 right-1/4 animate-bounce delay-600 text-4xl">🎭</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
          </div>
          
          <h1 className="text-3xl text-center sm:text-4xl md:text-5xl lg:text-6xl font-rye text-[#F3A83A] tracking-wide uppercase drop-shadow-[0_0_14px_rgba(251,146,60,0.95)] p-12">
            Problem Statements
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-lg md:text-xl text-stone-400 mb-8 flex-wrap">
            <Sparkles className="animate-spin-slow w-5 h-5 text-orange-400" />
            <p className="font-medium">
              Check Out This Year's Carnival-Themed Challenges
            </p>
            <Sparkles className="animate-spin-slow w-5 h-5 text-orange-400" />
          </div>

          <button 
            className="bg-gradient-to-r from-red-400/50 to-amber-600/50 hover:from-red-500 hover:to-amber-500 text-orange-100 font-bold py-4 px-8 rounded-full text-lg shadow-[0_0_20px_rgba(251,146,60,0.5)] transform hover:scale-105 transition-all duration-300 border-2 border-orange-400/40"
            onClick={() => window.open('#', '_blank')}
          >
            <div className="flex items-center gap-3">
              <Ticket className="w-6 h-6" />
              <span>Download Problem Statements</span>
              <PartyPopper className="w-6 h-6" />
            </div>
          </button>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent rounded"></div>
          <div className="text-3xl animate-spin-slow drop-shadow-[0_0_10px_rgba(251,146,60,0.6)]">🎡</div>
          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent rounded"></div>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              img={problem.img}
              title={problem.title}
              domain={problem.domain}
              impact={problem.impact}
              background={problem.background}
              statement={problem.statement}
            />
          ))}
        </div>

        {/* Bottom decorative text */}
        <div className="text-center mt-12">
          <p className="text-xl md:text-2xl font-bold text-orange-400 animate-pulse drop-shadow-[0_0_10px_rgba(251,146,60,0.6)]">
            🎉 Step Right Up and Solve the Challenges! 🎉
          </p>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default ProblemStatements;