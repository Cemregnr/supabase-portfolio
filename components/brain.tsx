"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

const Brain = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  // Scroll-based animations
  const rotateMain = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.95]);
  
  return (
    <div className="flex items-center justify-center w-full h-full relative z-50">
      <motion.svg
        width="280"
        height="280"
        viewBox="0 0 200 200"
        style={{
          y: translateY,
          scale: scale,
        }}
        className="drop-shadow-xl text-pink-400"
      >
        {/* Main brain container with rotation */}
        <motion.g
          style={{ rotate: rotateMain, transformOrigin: '50% 50%' } as any}
        >
          {/* Brain outline - realistic shape */}
          <path
            d="M100 40 
             C120 35, 140 45, 150 65 
             C160 85, 155 105, 145 120
             C135 135, 115 145, 100 150
             C85 145, 65 135, 55 120
             C45 105, 40 85, 50 65
             C60 45, 80 35, 100 40 Z"
            fill="currentColor"
            fillOpacity="0.8"
            stroke="#ec4899"
            strokeWidth="2"
          />
          
          {/* Left hemisphere wrinkles */}
          <path
            d="M75 65 C80 70, 85 75, 80 85 C75 90, 70 85, 65 80 C60 75, 65 70, 75 65"
            fill="none"
            stroke="#ec4899"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          <path
            d="M70 90 C75 95, 80 100, 75 110 C70 115, 65 110, 60 105 C55 100, 60 95, 70 90"
            fill="none"
            stroke="#ec4899"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          {/* Right hemisphere wrinkles */}
          <path
            d="M125 65 C130 70, 135 75, 130 85 C125 90, 120 85, 115 80 C110 75, 115 70, 125 65"
            fill="none"
            stroke="#ec4899"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          <path
            d="M130 90 C135 95, 140 100, 135 110 C130 115, 125 110, 120 105 C115 100, 120 95, 130 90"
            fill="none"
            stroke="#ec4899"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          {/* Central fissure */}
          <line
            x1="100"
            y1="50"
            x2="100"
            y2="140"
            stroke="#ec4899"
            strokeWidth="1.5"
            opacity="0.4"
          />
          
          {/* Brain stem */}
          <path
            d="M95 145 C100 155, 105 145, 100 160 C95 165, 95 155, 95 145"
            fill="currentColor"
            stroke="#ec4899"
            strokeWidth="1.5"
            opacity="0.7"
          />
          
          {/* Cerebellum - left */}
          <circle
            cx="85"
            cy="135"
            r="10"
            fill="currentColor"
            fillOpacity="0.6"
            stroke="#ec4899"
            strokeWidth="1"
          />
          
          {/* Cerebellum - right */}
          <circle
            cx="115"
            cy="135"
            r="10"
            fill="currentColor"
            fillOpacity="0.6"
            stroke="#ec4899"
            strokeWidth="1"
          />
          
          {/* Additional brain details */}
          <path
            d="M85 75 C90 80, 95 85, 90 95"
            fill="none"
            stroke="#ec4899"
            strokeWidth="1"
            opacity="0.5"
          />
          
          <path
            d="M115 75 C110 80, 105 85, 110 95"
            fill="none"
            stroke="#ec4899"
            strokeWidth="1"
            opacity="0.5"
          />
        </motion.g>
        
        {/* Neural activity - animated dots */}
        <motion.circle
          cx="80"
          cy="75"
          r="2"
          fill="#fbbf24"
          animate={{ 
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: 0 
          }}
        />
        
        <motion.circle
          cx="120"
          cy="80"
          r="2"
          fill="#60a5fa"
          animate={{ 
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 1.8, 
            repeat: Infinity, 
            delay: 0.5 
          }}
        />
        
        <motion.circle
          cx="100"
          cy="90"
          r="1.5"
          fill="#34d399"
          animate={{ 
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: 1 
          }}
        />
        
        <motion.circle
          cx="90"
          cy="110"
          r="1.5"
          fill="#f87171"
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.4, 1]
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            delay: 0.3 
          }}
        />
        
        <motion.circle
          cx="110"
          cy="105"
          r="1.5"
          fill="#a78bfa"
          animate={{ 
            opacity: [0.3, 0.9, 0.3],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 1.7, 
            repeat: Infinity, 
            delay: 0.8 
          }}
        />
      </motion.svg>
    </div>
  );
};

export default Brain;