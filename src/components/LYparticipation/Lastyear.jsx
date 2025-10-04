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
        const duration = 1500;
        const stepTime = Math.max(Math.floor(duration / target), 20);
        const timer = setInterval(() => {
            start += Math.ceil(target / (duration / stepTime));
            if (start >= target) {
                clearInterval(timer);
                start = target;
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
            <img
                src={ticketImg}
                alt="Ticket background"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            />
            <div
                className="absolute z-10 w-45 h-27 ml-5 rounded-lg flex flex-col justify-center items-center shadow-lg"
                style={{ backgroundColor: "#e0c8a9" }}
            >
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
        <section
            ref={ref}
            className="relative z-0 px-6 py-40 pt-28 md:pt-32"  /** navbar safety padding **/
        >
            <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rye text-[#F3A83A] tracking-wide uppercase drop-shadow-[0_0_14px_rgba(251,146,60,0.95)] mb-12">
                Last Year Participation 
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
