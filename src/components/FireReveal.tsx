import { motion, useTransform, useSpring, useScroll } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

// Ember particle component - minimal for performance
const EmberParticle = ({ delay, duration, startX, startY }: { 
  delay: number; 
  duration: number; 
  startX: number; 
  startY: number;
}) => {
  const size = Math.random() * 2 + 1;
  const drift = (Math.random() - 0.5) * 30;
  
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${startX}%`,
        top: `${startY}%`,
        background: "hsl(var(--foreground))",
        boxShadow: `0 0 ${size}px hsl(var(--foreground) / 0.6)`,
      }}
      initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: [0, -40, -80, -120],
        x: [0, drift * 0.3, drift * 0.6, drift],
        scale: [0, 1, 0.7, 0]
      }}
      transition={{
        delay: delay * 0.2,
        duration: duration * 0.35,
        ease: "easeOut",
        times: [0, 0.1, 0.5, 1]
      }}
    />
  );
};

// Smoke particle component - simplified
const SmokeParticle = ({ delay, startX }: { delay: number; startX: number }) => {
  const size = Math.random() * 25 + 15;
  const drift = (Math.random() - 0.5) * 40;
  
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${startX}%`,
        top: "50%",
        background: "radial-gradient(circle, hsl(var(--foreground) / 0.03) 0%, transparent 70%)",
        filter: "blur(8px)",
      }}
      initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
      animate={{ 
        opacity: [0, 0.2, 0.08, 0],
        y: [0, -60, -120, -180],
        x: [0, drift * 0.3, drift * 0.7, drift],
        scale: [0.5, 1.1, 1.4, 1.6]
      }}
      transition={{
        delay: delay * 0.2,
        duration: 1.2,
        ease: "easeOut",
      }}
    />
  );
};

// Heat distortion SVG filter
const HeatDistortionFilter = () => (
  <svg className="absolute w-0 h-0">
    <defs>
      <filter id="heat-distortion">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.01 0.02" 
          numOctaves="2" 
          result="noise"
        >
          <animate 
            attributeName="baseFrequency" 
            values="0.01 0.02;0.015 0.03;0.01 0.02" 
            dur="3s" 
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap 
          in="SourceGraphic" 
          in2="noise" 
          scale="3" 
          xChannelSelector="R" 
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);

interface FireRevealTextProps {
  text: string;
  className?: string;
  startDelay?: number;
  isTitle?: boolean;
}

const FireRevealText = ({ text, className = "", startDelay = 0, isTitle = false }: FireRevealTextProps) => {
  const letters = text.split("");
  const midIndex = Math.floor(letters.length / 2);
  
  // Calculate reveal order: center to edges - faster
  const getRevealDelay = (index: number) => {
    const distanceFromCenter = Math.abs(index - midIndex);
    return startDelay + distanceFromCenter * 0.018;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Burning edge glow layer */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.2] }}
        transition={{ delay: startDelay, duration: 0.25, times: [0, 0.3, 1] }}
      >
        <span 
          className="font-display font-bold tracking-wider whitespace-nowrap"
          style={{
            fontSize: "inherit",
            filter: "blur(12px)",
            color: "hsl(var(--foreground))",
            opacity: 0.5
          }}
        >
          {text}
        </span>
      </motion.div>

      {/* Heat shimmer layer - simplified */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0.08] }}
        transition={{ delay: startDelay + 0.03, duration: 0.35, times: [0, 0.4, 1] }}
        style={{ filter: "url(#heat-distortion)" }}
      >
        <span 
          className="font-display font-bold tracking-wider whitespace-nowrap"
          style={{
            fontSize: "inherit",
            filter: "blur(4px)",
            color: "hsl(var(--foreground))",
            opacity: 0.3
          }}
        >
          {text}
        </span>
      </motion.div>

      {/* Individual letter reveals - INSTANT */}
      <div className="relative flex items-center justify-center">
        {letters.map((letter, i) => {
          const revealDelay = getRevealDelay(i);
          
          return (
            <motion.span
              key={i}
              className="inline-block relative font-display font-bold tracking-wider text-foreground"
              initial={{ 
                opacity: 0,
                filter: "blur(6px) brightness(2)",
                scale: 1.03
              }}
              animate={{ 
                opacity: 1,
                filter: "blur(0px) brightness(1)",
                scale: 1
              }}
              transition={{
                delay: revealDelay,
                duration: 0.2,
                ease: "easeOut"
              }}
            >
              {/* Glowing crack effect behind each letter */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{
                  delay: revealDelay - 0.015,
                  duration: 0.15,
                  times: [0, 0.3, 1]
                }}
                style={{
                  textShadow: `
                    0 0 20px hsl(var(--foreground)),
                    0 0 40px hsl(var(--foreground) / 0.7)
                  `,
                  color: "transparent",
                  WebkitBackgroundClip: "text"
                }}
              >
                {letter}
              </motion.span>

              {/* Edge burn glow */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0, filter: "blur(2px)" }}
                animate={{ 
                  opacity: [0, 0.6, 0.1],
                  filter: ["blur(4px)", "blur(1px)", "blur(0px)"]
                }}
                transition={{
                  delay: revealDelay,
                  duration: 0.25,
                  times: [0, 0.4, 1]
                }}
                style={{
                  color: "hsl(var(--foreground))",
                  textShadow: `0 0 25px hsl(var(--foreground))`,
                }}
              >
                {letter}
              </motion.span>

              {/* Main letter */}
              {letter}
            </motion.span>
          );
        })}
      </div>

      {/* Post-reveal ambient glow - simplified */}
      {isTitle && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.15] }}
          transition={{ delay: startDelay + 0.3, duration: 0.35, times: [0, 0.5, 1] }}
        >
          <span 
            className="font-display font-bold tracking-wider whitespace-nowrap"
            style={{
              fontSize: "inherit",
              filter: "blur(15px)",
              color: "hsl(var(--foreground))",
            }}
          >
            {text}
          </span>
        </motion.div>
      )}
    </div>
  );
};

// Horizontal fire sweep for 2K26 - faster
const FireSweepReveal = ({ text, startDelay }: { text: string; startDelay: number }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Fire sweep line */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ delay: startDelay, duration: 0.3, ease: "easeOut" }}
      >
        <div 
          className="h-full w-1/3"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              hsl(var(--foreground) / 0.2) 30%,
              hsl(var(--foreground) / 0.5) 50%,
              hsl(var(--foreground) / 0.2) 70%,
              transparent 100%
            )`,
            filter: "blur(4px)",
          }}
        />
      </motion.div>

      {/* Text with mask reveal */}
      <motion.div
        className="relative"
        initial={{ 
          clipPath: "inset(0 100% 0 0)",
          filter: "blur(4px) brightness(1.5)"
        }}
        animate={{ 
          clipPath: "inset(0 0% 0 0)",
          filter: "blur(0px) brightness(1)"
        }}
        transition={{ 
          delay: startDelay + 0.03, 
          duration: 0.25, 
          ease: "easeOut",
          filter: { delay: startDelay + 0.12, duration: 0.15 }
        }}
      >
        <span className="font-display font-bold tracking-wider text-gradient-hero">
          {text.split("").map((char, i) => (
            <span key={i} className="inline-block">{char}</span>
          ))}
        </span>
      </motion.div>

      {/* Trailing glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.35, 0.08] }}
        transition={{ delay: startDelay + 0.08, duration: 0.35, times: [0, 0.3, 1] }}
      >
        <span 
          className="font-display font-bold tracking-wider"
          style={{
            fontSize: "inherit",
            filter: "blur(10px)",
            color: "hsl(var(--foreground))",
          }}
        >
          {text}
        </span>
      </motion.div>
    </div>
  );
};

interface FireRevealHeroProps {
  onRevealComplete?: () => void;
}

const FireRevealHero = ({ onRevealComplete }: FireRevealHeroProps) => {
  const [phase, setPhase] = useState<"ignition" | "reveal" | "complete">("ignition");
  const [showEmbers, setShowEmbers] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  
  const { scrollY } = useScroll();
  const scrollGlow = useTransform(scrollY, [0, 300], [0, 0.1]);
  const smoothScrollGlow = useSpring(scrollGlow, { stiffness: 300, damping: 35 });

  // Reduced embers for performance
  const embers = useMemo(() => 
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: 0.1 + Math.random() * 0.2,
      duration: 0.6,
      startX: 38 + Math.random() * 24,
      startY: 45 + Math.random() * 8,
    })), []
  );

  // Reduced smoke particles
  const smokeParticles = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      delay: 0.15 + Math.random() * 0.25,
      startX: 42 + Math.random() * 16,
    })), []
  );

  useEffect(() => {
    // Phase transitions - faster
    const ignitionTimer = setTimeout(() => {
      setShowEmbers(true);
      setShowSmoke(true);
    }, 80);

    const revealTimer = setTimeout(() => setPhase("reveal"), 150);
    const completeTimer = setTimeout(() => {
      setPhase("complete");
      onRevealComplete?.();
    }, 900);

    return () => {
      clearTimeout(ignitionTimer);
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
    };
  }, [onRevealComplete]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <HeatDistortionFilter />

      {/* Paper texture background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Initial ignition point - faster */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 0.5, 0.2, 0.1],
          scale: [0, 1, 2, 3]
        }}
        transition={{ duration: 0.4, times: [0, 0.2, 0.5, 1], ease: "easeOut" }}
      >
        <div 
          className="w-20 h-20 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--foreground) / 0.3) 0%, hsl(var(--foreground) / 0.1) 40%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
      </motion.div>

      {/* Smoke layer */}
      {showSmoke && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {smokeParticles.map((particle) => (
            <SmokeParticle key={particle.id} {...particle} />
          ))}
        </div>
      )}

      {/* Ember particles */}
      {showEmbers && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {embers.map((ember) => (
            <EmberParticle key={ember.id} {...ember} />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* CYNAPSE - with hover effects */}
        <motion.div 
          className="relative mb-4 cursor-default group"
          style={{
            filter: useTransform(smoothScrollGlow, v => `drop-shadow(0 0 ${20 + v * 30}px hsl(var(--foreground) / ${0.15 + v}))`)
          }}
          whileHover={{ 
            scale: 1.015,
            transition: { duration: 0.1, ease: "easeOut" }
          }}
        >
          {/* Hover glow intensifier */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100"
            style={{
              background: "radial-gradient(ellipse 100% 80% at 50% 50%, hsl(var(--foreground) / 0.08) 0%, transparent 60%)",
              filter: "blur(20px)",
            }}
          />
          <FireRevealText 
            text="CYNAPSE" 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
            startDelay={0.15}
            isTitle={true}
          />
        </motion.div>

        {/* 2K26 - with hover effects */}
        <motion.div 
          className="relative mb-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl cursor-default group"
          whileHover={{ 
            scale: 1.015,
            transition: { duration: 0.1, ease: "easeOut" }
          }}
        >
          {/* Hover glow intensifier */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100"
            style={{
              background: "radial-gradient(ellipse 100% 80% at 50% 50%, hsl(var(--foreground) / 0.06) 0%, transparent 60%)",
              filter: "blur(15px)",
            }}
          />
          <FireSweepReveal text="2K26" startDelay={0.6} />
        </motion.div>

        {/* Department name - with subtle hover */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.9, 
            duration: 0.3, 
            ease: "easeOut" 
          }}
          whileHover={{ scale: 1.01 }}
          className="font-display text-foreground font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide uppercase mb-3 cursor-default"
          style={{
            textShadow: "0 2px 10px hsl(var(--background) / 0.8), 0 0 20px hsl(var(--foreground) / 0.25)"
          }}
        >
          Department of Computer Science & Engineering
        </motion.p>

        {/* Subtitle - with subtle hover */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.0, 
            duration: 0.3, 
            ease: "easeOut" 
          }}
          whileHover={{ scale: 1.01 }}
          className="font-display text-foreground font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide uppercase cursor-default"
          style={{
            textShadow: "0 2px 10px hsl(var(--background) / 0.8), 0 0 20px hsl(var(--foreground) / 0.25)"
          }}
        >
          A National Level Technical Symposium
        </motion.p>
      </div>
    </div>
  );
};

export default FireRevealHero;