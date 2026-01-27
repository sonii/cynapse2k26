import { motion } from "framer-motion";

const InfoStrip = () => {
  const items = [
    "TECHNICAL EVENTS",
    "NON-TECHNICAL EVENTS",
    "CODING",
    "DEBUGGING",
    "PAPER PRESENTATION",
    "QUIZ",
    "FEB 9, 2026",
    "RMK ENGINEERING COLLEGE"
  ];

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-background via-muted/30 to-background border-y border-primary/20">
      {/* Glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-pink-500/5 pointer-events-none" />
      
      {/* Marquee container */}
      <motion.div
        className="flex items-center py-3 md:py-4 whitespace-nowrap"
        animate={{
          x: [0, "-50%"]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear"
          }
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center">
            {/* Text item */}
            <span 
              className="font-display text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider px-4 md:px-6 transition-all duration-300 hover:scale-105 cursor-default"
              style={{
                color: "#ff2d75",
                textShadow: "0 0 10px rgba(255, 45, 117, 0.5), 0 0 20px rgba(255, 45, 117, 0.3)"
              }}
            >
              {item}
            </span>
            
            {/* Divider */}
            <span 
              className="text-xs sm:text-sm md:text-base font-light select-none"
              style={{
                color: "rgba(255, 45, 117, 0.4)"
              }}
            >
              |
            </span>
          </div>
        ))}
      </motion.div>

      {/* Edge fade effects */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default InfoStrip;
