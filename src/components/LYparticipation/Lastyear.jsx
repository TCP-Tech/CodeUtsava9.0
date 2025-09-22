import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ticketImg from "../../assets/images/ticket.png";


function Counter({ target, label, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    let start = 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / target), 20);

    let timer = setInterval(() => {
      start += Math.ceil(target / (duration / stepTime));
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <motion.div
      className="relative w-72 h-40 flex justify-center items-center"
      whileHover={{ scale: 1.05 }}
    >
      {/* Ticket image */}
      <img
        src={ticketImg}
        alt="Ticket background"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
      />

      {/* White box behind the counter with fixed size */}
      <div
  className="absolute z-10 w-45 h-27 ml-5 rounded-lg flex flex-col justify-center items-center shadow-lg"
  style={{ backgroundColor: "#e0c8a9" }}
>

        {/* w-56 and h-28 give fixed width and height */}
        <span className="block font-['Rye'] text-red-800 text-4xl drop-shadow-md text-center">
          {count.toLocaleString()}+
        </span>
        <span className="uppercase text-lg mt-1 text-red-800 font-rye tracking-wide text-center">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default function Participation() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-40 px-6">
      {/* Heading outside the container */}
      <h2 className="text-center font-['Rye'] text-5xl md:text-6xl text-white drop-shadow-lg mb-12">
        Last Year Participation 🎟️
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        <Counter target={1000} label="Teams" inView={inView} />
        <Counter target={100} label="Colleges" inView={inView} />
        <Counter target={2000} label="Developers" inView={inView} />
        <Counter target={3000} label="Visitors" inView={inView} />
      </div>
    </section>
  );
}
