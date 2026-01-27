import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Ember particle component - simplified for performance
const EmberParticle = ({ delay, x, duration }: { delay: number; x: number; duration: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-orange-400"
    style={{ left: `${x}%`, bottom: 0 }}
    initial={{ opacity: 0, y: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [-20, -60, -100, -140],
      scale: [0.5, 1, 0.8, 0],
    }}
    transition={{
      duration: duration * 0.25,
      delay: delay * 0.1,
      repeat: Infinity,
      ease: "easeOut"
    }}
  />
);

const DateSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; x: number; duration: number }>>([]);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Fast spring response
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 500, damping: 50 });
  
  // Minimal parallax
  const y = useTransform(smoothProgress, [0, 1], [20, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0, 1, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.99]);
  
  // Fire glow intensity
  const glowIntensity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 0.7, 0.5, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 0.2, 0.5], [0.7, 1.05, 1]);

  // Reduced particles for performance
  useEffect(() => {
    const newParticles = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: Math.random() * 0.3,
      x: 35 + Math.random() * 30,
      duration: 0.8 + Math.random() * 0.3
    }));
    setParticles(newParticles);
  }, []);

  const date = "February 9, 2026";

  return (
    <section 
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
      {/* Static background grain */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Fire/Energy glow - STATIC with opacity */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ opacity: glowIntensity, scale: glowScale }}
      >
        <div 
          className="w-[400px] h-[250px] md:w-[600px] md:h-[300px]"
          style={{ 
            background: "radial-gradient(ellipse at center, rgba(255, 120, 0, 0.4) 0%, rgba(255, 60, 0, 0.2) 35%, rgba(120, 0, 180, 0.1) 60%, transparent 80%)",
            filter: "blur(30px)" 
          }}
        />
      </motion.div>

      {/* Ember particles - reduced count */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isInView && particles.map((particle) => (
          <EmberParticle 
            key={particle.id} 
            delay={particle.delay} 
            x={particle.x} 
            duration={particle.duration}
          />
        ))}
      </div>

      {/* Light streaks - reduced */}
      {isInView && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute h-px bg-gradient-to-r from-transparent via-orange-400/12 to-transparent"
            style={{
              top: "45%",
              left: "-100%",
              width: "200%",
            }}
            animate={{
              x: ["-50%", "0%"],
              opacity: [0, 0.25, 0]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        </div>
      )}

      <motion.div
        ref={containerRef}
        style={{ y, scale }}
        className="text-center relative z-10"
      >
        {/* Date - Instant reveal */}
        <div className="overflow-hidden mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-gradient-blue"
            style={{
              textShadow: isInView 
                ? "0 0 10px rgba(255, 150, 50, 0.5), 0 0 20px rgba(255, 100, 0, 0.3)"
                : "none"
            }}
          >
            {date}
          </motion.h2>
        </div>

        {/* Department - first */}
        <div className="overflow-hidden mb-4 mt-8">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.15, delay: 0.05, ease: "easeOut" }}
            className="font-display font-bold tracking-wide relative text-foreground max-w-3xl mx-auto"
            style={{
              fontSize: "clamp(1rem, 3vw, 2rem)",
              textShadow: isInView 
                ? "0 0 8px rgba(255, 150, 50, 0.3)"
                : "none"
            }}
          >
            Department of Computer Science & Engineering
          </motion.h4>
        </div>

        {/* College name - after department */}
        <div className="overflow-hidden">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.15, delay: 0.08, ease: "easeOut" }}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wide relative text-gradient-hero"
            style={{
              fontSize: "clamp(1.5rem, 5vw, 4rem)",
              textShadow: isInView 
                ? "0 0 15px rgba(255, 150, 50, 0.4), 0 0 30px rgba(255, 100, 0, 0.2)"
                : "none"
            }}
          >
            RMK Engineering College
          </motion.h3>
        </div>
      </motion.div>

      {/* Bottom gradient fade for smooth transition */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"
        style={{ opacity }}
      />
    </section>
  );
};

export default DateSection;