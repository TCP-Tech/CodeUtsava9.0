import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import Fireworks from "../components/overlays/Fireworks.jsx";
import SparkleLayer from "../components/overlays/SparkleLayer.jsx";
import Cursor from "../components/cursor/Cursor.jsx";
import BackgroundMedia from "../components/background/Background.jsx";
import bg_image from "../assets/images/bg-part2.jpg";

import {
  departmentColors,
  hierarchyLevels
} from "../assets/data/teamsData.js";

// Team member card component with carnival styling
const TeamCard = ({ member, index, level }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateY: -15,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      filter: "brightness(1.2) saturate(1.3)",
      transition: { duration: 0.3 }
    }
  };

  const overlayVariants = {
    hover: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Determine card size based on hierarchy level
  const getCardSize = () => {
    switch(level) {
      case 1: return "w-80 h-96"; // Overall Coordinators - largest
      case 2: return "w-72 h-88"; // Head Coordinators
      case 3: return "w-64 h-80"; // Managers
      case 4: return "w-60 h-76"; // Executives - smallest
      default: return "w-64 h-80";
    }
  };

  const getBorderGlow = () => {
    const dept = member.department || "Tech";
    const color = departmentColors[dept] || "#802b1d";
    return `0 0 20px ${color}40, 0 0 40px ${color}20`;
  };

  return (
    <motion.div
      className={`relative ${getCardSize()} mx-auto`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Card container with carnival tent design */}
      <div 
        className="relative h-full bg-gradient-to-br from-black/80 via-gray-900/70 to-black/90 rounded-2xl overflow-hidden border-2 border-[#f3a83a]/30 backdrop-blur-sm"
        style={{ 
          boxShadow: isHovered ? getBorderGlow() : "0 8px 32px rgba(0,0,0,0.4)",
          background: `linear-gradient(135deg, 
            rgba(128,43,29,0.1) 0%, 
            rgba(44,43,76,0.1) 50%, 
            rgba(243,168,58,0.1) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9))`
        }}
      >
        {/* Carnival stripes decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#802b1d] via-[#f3a83a] to-[#2c2b4c]" />
        
        {/* Member photo */}
        <div className="relative overflow-hidden h-48 bg-gradient-to-b from-gray-700 to-gray-800">
          <motion.img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            variants={imageVariants}
            style={{ objectPosition: 'center 30%' }}
          />
          
          {/* Photo overlay with carnival pattern */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            variants={overlayVariants}
            initial={{ opacity: 0.3 }}
          />
          
          {/* Hierarchy level indicator */}
          <div className="absolute top-3 right-3">
            <div className="flex space-x-1">
              {[...Array(5 - level)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-[#f3a83a] to-[#802b1d]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 space-y-3">
          {/* Name with carnival typography */}
          <h3 className="text-xl font-rye text-[#f3a83a] text-center tracking-wide text-stroke-soft">
            {member.name}
          </h3>
          
          {/* Role with department color */}
          <div className="text-center">
            <p 
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: departmentColors[member.department] || "#eadccb" }}
            >
              {member.role}
            </p>
            {member.department && (
              <p className="text-xs text-gray-400 mt-1 font-bebas-neue tracking-wide">
                {member.department} Department
              </p>
            )}
          </div>
          
          {/* Bio */}
          <p className="text-xs text-gray-300 text-center leading-relaxed line-clamp-3">
            {member.bio}
          </p>
          
          {/* Social links */}
          <div className="flex justify-center space-x-4 pt-2">
            {member.social.linkedin && (
              <motion.a
                href={member.social.linkedin}
                className="text-gray-400 hover:text-[#0077b5] transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin size={16} />
              </motion.a>
            )}
            {member.social.github && (
              <motion.a
                href={member.social.github}
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub size={16} />
              </motion.a>
            )}
            {member.social.instagram && (
              <motion.a
                href={member.social.instagram}
                className="text-gray-400 hover:text-[#E4405F] transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram size={16} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Carnival tent bottom decoration */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#802b1d] via-[#f3a83a] to-[#2c2b4c]" />
      </div>
    </motion.div>
  );
};

// Section component for each team hierarchy
const TeamSection = ({ title, members, level, description }) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Grid columns based on team size and level
  const getGridCols = () => {
    if (level === 1) return "grid-cols-1 md:grid-cols-2"; // Overall coordinators
    if (level === 2) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"; // Head coordinators
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"; // Managers & Executives
  };

  return (
    <motion.section
      className="relative py-16 md:py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Section background with carnival tent pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.header className="text-center mb-12" variants={titleVariants}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-rye text-[#f3a83a] tracking-wide uppercase mb-4 text-stroke-strong">
            {title}
          </h2>
          <div className="mx-auto w-32 h-1 bg-gradient-to-r from-[#802b1d] via-[#f3a83a] to-[#2c2b4c] rounded-full mb-6" />
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.header>

        {/* Team grid */}
        <div className={`grid ${getGridCols()} gap-8 justify-items-center`}>
          {members && members.length > 0 ? (
            members.map((member, index) => (
              <TeamCard
                key={member.id}
                member={member}
                index={index}
                level={level}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-xl">No team members found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default function Teams() {
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState({
    overallCoordinators: [],
    headCoordinators: [],
    managers: [],
    executives: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getTeamData() {
      try {
        const response = await fetch('https://codeutsava.nitrr.ac.in/server/team/2025/');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        console.log('API Response:', result); // Debug log
        
        if (result?.data && Array.isArray(result.data)) {
          // Helper function to convert Google Drive link to thumbnail URL
          const convertDriveUrl = (url) => {
            try {
              if (!url) return 'https://via.placeholder.com/300x400?text=No+Image';
              
              // Extract file ID from Google Drive URL
              const match = url.match(/\/d\/([^\/]+)/);
              if (match && match[1]) {
                return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w700`;
              }
              return url;
            } catch (err) {
              console.error('Error converting drive URL:', err);
              return 'https://via.placeholder.com/300x400?text=No+Image';
            }
          };

          // Transform API data to match component structure
          const transformedData = result.data.map(member => {
            try {
              return {
                id: member.id || Math.random(),
                name: member.name || 'Unknown',
                role: member.domain || 'Team Member',
                department: member.domain || 'General',
                image: convertDriveUrl(member.drive_image_url || member.image),
                bio: member.branch && member.year ? `${member.branch} - Year ${member.year}` : 'Team Member',
                social: {
                  linkedin: member.linkedin || '',
                  github: '',
                  instagram: member.instagram || ''
                },
                member_type: member.member_type // Keep for filtering
              };
            } catch (err) {
              console.error('Error transforming member:', member, err);
              return null;
            }
          }).filter(Boolean); // Remove any null entries

          // Categorize by member_type
          const categorized = {
            overallCoordinators: transformedData.filter(m => m.member_type === 'OCO'),
            headCoordinators: transformedData.filter(m => m.member_type === 'HCO'),
            managers: transformedData.filter(m => m.member_type === 'MNG'),
            executives: transformedData.filter(m => m.member_type === 'EXC')
          };

          console.log('Categorized Data:', categorized); // Debug log

          setTeamData(categorized);
        } else {
          throw new Error('Invalid API response structure');
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
        setError(`Failed to load team data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    getTeamData();
  }, []);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-[#f3a83a] border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-2xl font-rye text-[#f3a83a] tracking-wide">
            Loading Carnival Team...
          </h2>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background and overlays */}
      <BackgroundMedia imageSrc={bg_image} />
      <Fireworks />
      <SparkleLayer />
      <Cursor />

      {/* Navigation */}
      <Navbar />

      {/* Error notification */}
      {error && (
        <motion.div
          className="fixed top-24 right-4 bg-red-900/90 border-2 border-red-500 text-white px-6 py-4 rounded-lg backdrop-blur-sm z-50 max-w-sm shadow-xl"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold">⚠️ {error}</p>
          <p className="text-xs mt-1 opacity-80">Please try refreshing the page</p>
        </motion.div>
      )}

      {/* Main content */}
      <main className="relative z-10 pt-20">
        {/* Hero section */}
        <motion.section 
          className="relative py-20 md:py-32 text-center"
          variants={heroVariants}
        >
          {/* Carnival tent top decoration */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-8 bg-gradient-to-r from-[#802b1d] via-[#f3a83a] to-[#2c2b4c] rounded-b-full" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-rye text-[#f3a83a] tracking-wide uppercase mb-6 text-stroke-strong"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Meet Our
            </motion.h1>
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-rye text-[#f3a83a] tracking-wide uppercase mb-8 text-stroke-strong"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Carnival Crew
            </motion.h1>
            
            <motion.div 
              className="mx-auto w-48 h-2 bg-gradient-to-r from-[#802b1d] via-[#f3a83a] to-[#2c2b4c] rounded-full mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            />
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-outline-soft"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Behind every great carnival is an extraordinary team of dedicated performers, 
              organizers, and visionaries who make the magic happen. Get to know the incredible 
              people bringing CodeUtsava 9.0 to life!
            </motion.p>
          </div>

          {/* Floating carnival elements */}
          <motion.div
            className="absolute top-1/4 left-10 text-6xl"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🎪
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/4 right-10 text-5xl"
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            🎨
          </motion.div>
        </motion.section>

        {/* Team sections */}
        <TeamSection
          title="Ring Leaders"
          members={teamData.overallCoordinators}
          level={1}
          description="The masterminds orchestrating our grand carnival spectacle, ensuring every act performs in perfect harmony."
        />

        <TeamSection
          title="Circus Masters"
          members={teamData.headCoordinators}
          level={2}
          description="Department heads who lead their specialized acts, bringing expertise and vision to every carnival ring."
        />

        <TeamSection
          title="Performance Directors"
          members={teamData.managers}
          level={3}
          description="The skilled coordinators who ensure each carnival act is executed flawlessly, managing day-to-day magic."
        />

        <TeamSection
          title="Carnival Performers"
          members={teamData.executives}
          level={4}
          description="Our talented team members who bring creativity, energy, and passion to make the carnival dreams a reality."
        />
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}