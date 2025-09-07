import SparkleLayer from "../../components/overlays/SparkleLayer";
export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center inset-0"
    >
        <SparkleLayer/>
      <div className="bg-gradient-to-r from-blue-500/30 via-pink-500/30 to-emerald-500/40 
                bg-black/50 backdrop-blur-sm 
                p-16 rounded-2xl max-w-5xl text-center text-white">
        <h2 className="text-5xl mb-9">About Us</h2>
        <p className="text-xl leading-relaxed">
          
<span className="text-sky-400 font-bold">CodeUtsava</span> is an annual event organized by the <span className="text-emerald-300 font-bold">Turing Club of Programmers</span>. 
This event aims to bring like-minded coders from all over the nation together, 
and foster coding culture among the students of the institute through its diverse range of programs such as Workshops,
 Hackathon, Coding competitions, Gaming Battles, Mic Sessions and much more.
 <br />

The most envisioned event of <span className="text-pink-400 font-bold">CodeUtsava</span>, is the <span className="text-pink-400 font-bold">Hackathon</span>. The event consists of a 28-hour-long hackathon
 that witnesses various teams with participants from across the nation and all four years stirring for 
 making the best applications with the most appealing innovations. This year,  
 <span className="text-emerald-400 font-bold"> CodeUtsava</span> also boasts a prize pool of 33 Lakhs, with 1.5-2 Lakh cash prizes.
        </p>
    {/* Features section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-16 text-center mt-12 text-white">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="#1e90ff"
            viewBox="0 0 16 16"
            className="mb-4"
          >
            <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04" />
          </svg>
          <div className="uppercase tracking-wider text-sm font-semibold">
            Creative Design
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="#ff0099"
            viewBox="0 0 16 16"
            className="mb-4"
          >
            <path
              fillRule="evenodd"
              d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0"
            />
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
          </svg>
          <div className="uppercase tracking-wider text-sm font-semibold">
            We Make Best Result
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="#00ff85"
            viewBox="0 0 16 16"
            className="mb-4"
          >
            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
            <path d="M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708m-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708" />
          </svg>
          <div className="uppercase tracking-wider text-sm font-semibold">
            Innovative Coding
          </div>
        </div>
        </div>

         
      </div>
    </section>
  );
}
