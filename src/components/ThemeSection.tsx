import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ThemeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-15%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Minimal parallax - reduced range
  const y1 = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const y2 = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const y3 = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const parallaxValues = [y1, y2, y3];

  const words = [
    { text: "INNOVATE.", gradient: "from-cyan-400 to-blue-500" },
    { text: "CODE.", gradient: "from-blue-500 to-purple-500" },
    { text: "COMPETE.", gradient: "from-purple-500 to-pink-500" }
  ];

  return (
    <section 
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-4 section-glow relative overflow-hidden"
    >
      {/* Animated background lines - simplified */}
      {isInView && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "200%", opacity: [0, 0.15, 0] }}
            transition={{ 
              duration: 0.4,
              ease: "easeOut"
            }}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{ top: "40%", width: "100%" }}
          />
        </div>
      )}

      <div className="text-center space-y-6 md:space-y-8 relative z-10">
        {words.map((word, index) => (
          <motion.div
            key={word.text}
            style={{ y: parallaxValues[index] }}
            className="overflow-hidden"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.15, 
                delay: index * 0.03,
                ease: "easeOut"
              }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wider"
            >
              <span 
                className={`bg-gradient-to-r ${word.gradient} bg-clip-text text-transparent`}
                style={{
                  textShadow: `0 0 30px hsl(${200 + index * 40} 100% 50% / 0.25)`
                }}
              >
                {word.text}
              </span>
            </motion.h2>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ThemeSection;