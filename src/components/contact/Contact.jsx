import React, { useRef } from "react";
import bg_video from "../../assets/bg_video.webm";
import bg_image from "../../assets/images/bg_image.webp";
import "./contact.css";
import FWClickOnly from "../overlays/FW(ClickOnly).jsx";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, PartyPopper, Sparkles } from "lucide-react";
import BackgroundMedia from "../background/Background.jsx";


const Contact = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });


  return (
    <>
      {/* FIXED ANIMATED BACKGROUND */}
      <BackgroundMedia imageSrc={bg_image} videoSrc={bg_video} darken={0.5} />

      {/* MAIN BODY */}
      <div ref={containerRef} className="min-h-screen w-full backg relative top-0  flex items-center justify-center px-6 overflow-hidden">
        {/* Carnival Decorative Elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2
            }}
          >
            <Sparkles className="text-cyan-400 w-4 h-4" />
          </motion.div>
        ))}
        
        {/* Carnival Ribbons */}
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 opacity-20"
          style={{
            background: "linear-gradient(45deg, #0ea5e9, #2dd4bf)",
            borderRadius: "0 0 100% 0"
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 opacity-20"
          style={{
            background: "linear-gradient(-45deg, #2dd4bf, #06b6d4)",
            borderRadius: "0 0 0 100%"
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2 
          }}
          className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 border border-white/20 relative z-10 carnival-card"
        >
          {/* Left - Form */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Contact Us</h2>
            <form className="flex flex-col gap-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all hover:bg-white/15"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all hover:bg-white/15"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all hover:bg-white/15 resize-none"
                ></textarea>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  duration: 0.2,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 300
                }}
                type="submit"
                className="mt-2 px-6 py-3 bg-gradient-to-r from-cyan-400 via-sky-500 to-teal-400 text-white font-bold rounded-xl shadow-lg hover:from-cyan-500 hover:via-sky-600 hover:to-teal-500 transition-all glow-button"
              >
                Send Message
              </motion.button>
            </form>
          </div>

          {/* Right - Info */}
          <div className="flex-1 flex flex-col justify-center text-white gap-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 via-sky-500 to-teal-400 bg-clip-text text-transparent carnival-text">
                Join the Celebration!
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300"
            >
              Want to be part of the festivities? Drop us a message and let's make something amazing together!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ x: 10 }}
              transition={{ delay: 0 }}
              className="flex items-center gap-3 group"
            >
              <Mail className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <span className="group-hover:text-cyan-300 transition-colors">contact@yourevent.com</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ x: 10 }}
              transition={{ delay: 0}}
              className="flex items-center gap-3 group"
            >
              <Phone className="text-teal-400 group-hover:text-teal-300 transition-colors" />
              <span className="group-hover:text-teal-300 transition-colors">+91 98765 43210</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ x: 10 }}
              transition={{ delay: 0 }}
              className="flex items-center gap-3 group"
            >
              <MapPin className="text-sky-400 group-hover:text-sky-300 transition-colors" />
              <span className="group-hover:text-sky-300 transition-colors">XYZ Street, Your City</span>
            </motion.div>

            {/* Floating Party Popper */}
            <motion.div
              className="absolute -right-10 bottom-0"
              animate={{ 
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <PartyPopper className="text-cyan-400/30 w-20 h-20" />
            </motion.div>
          </div>
        </motion.div>
        <FWClickOnly />
      </div>
    </>
  );
};

export default Contact;
