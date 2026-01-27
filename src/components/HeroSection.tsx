import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import cynapseLogo from "@/assets/cynapse-logo.png";
import rmkLogo from "@/assets/rmk-logo.png";
import Starfield from "./Starfield";
import SciFiUI from "./SciFiUI";
import FireRevealHero from "./FireReveal";

const HeroSection = () => {
  const ref = useRef(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [arrowGlow, setArrowGlow] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [wasOutOfView, setWasOutOfView] = useState(false);

  // Mouse position for hover effects - faster response
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 400, damping: 35 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 400, damping: 35 });

  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Scroll-based transforms - reduced range
  const baseScale = useTransform(scrollYProgress, [0, 0.2, 0.8], [1, 1.01, 0.95]);
  const baseOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Popup animation spring values - faster
  const popupScale = useSpring(1, { stiffness: 500, damping: 30 });
  const popupOpacity = useSpring(1, { stiffness: 500, damping: 30 });
  const focusGlow = useSpring(0, { stiffness: 400, damping: 35 });

  // Track when hero comes back into view
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => {
      const heroHeight = window.innerHeight;
      const nowInView = v < heroHeight * 0.7;
      
      // Detect scroll back up into view - faster animations
      if (nowInView && !isInView && wasOutOfView) {
        // Trigger popup animation
        popupScale.set(0.9);
        popupOpacity.set(0.4);
        focusGlow.set(0.8);
        
        // Animate back to normal with overshoot
        setTimeout(() => {
          popupScale.set(1.04);
          popupOpacity.set(1);
        }, 30);
        
        setTimeout(() => {
          popupScale.set(1);
          focusGlow.set(0.2);
        }, 120);
        
        setTimeout(() => {
          focusGlow.set(0);
        }, 400);
      }
      
      if (!nowInView && isInView) {
        setWasOutOfView(true);
      }
      
      setIsInView(nowInView);
      
      if (v > 50 && !hasScrolled) {
        setHasScrolled(true);
      }
    });
    return () => unsubscribe();
  }, [scrollY, hasScrolled, isInView, wasOutOfView, popupScale, popupOpacity, focusGlow]);

  // Mouse move handler for hero interactions
  const handleHeroMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = (e.clientX - rect.left - centerX) / centerX;
    const y = (e.clientY - rect.top - centerY) / centerY;
    mouseX.set(x * 10);
    mouseY.set(y * 6);
  }, [mouseX, mouseY]);

  const handleHeroMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Cursor proximity detection for arrow glow
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!arrowRef.current) return;
    
    const rect = arrowRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );
    
    const maxDistance = 200;
    const glowValue = Math.max(0, 1 - distance / maxDistance);
    setArrowGlow(glowValue);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
    >
      {/* Starfield Background - reduced stars for performance */}
      <Starfield starCount={120} speed={0.2} />

      {/* SciFi UI Overlay */}
      <SciFiUI isRevealed={isRevealed} />

      {/* Focus overlay - dims when scrolling back up */}
      <motion.div
        className="fixed inset-0 bg-background pointer-events-none z-[15]"
        style={{ opacity: useTransform(focusGlow, v => v * 0.4) }}
      />

      {/* College Logo - Top Left - Fixed position - NO animation */}
      <div className="fixed top-6 left-6 z-50">
        <img 
          src={rmkLogo} 
          alt="RMK Engineering College" 
          loading="eager"
          decoding="sync"
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
        />
      </div>

      {/* Film grain overlay - subtle cinematic texture */}
      <div 
        className="absolute inset-0 z-[2] opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background image - bright and visible - NO animation */}
      <div className="absolute inset-0 z-0">
        {/* Main background image - static, no motion */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${cynapseLogo})`,
            opacity: 0.5,
            filter: "saturate(0.6) brightness(0.9) contrast(1.05)"
          }}
        />
        
        {/* Very subtle vignette around edges only */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, hsl(var(--background) / 0.5) 100%)"
          }}
        />
        
        {/* Sci-fi teal overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(89, 178, 158, 0.03) 0%, transparent 70%)"
          }}
        />
        
        {/* Soft vertical gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background) / 0.1) 50%, hsl(var(--background) / 0.5) 85%, hsl(var(--background) / 0.8) 100%)"
          }}
        />
        
        {/* Center text area - slight darkening for readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 50% 35% at 50% 45%, hsl(var(--background) / 0.3) 0%, transparent 70%)"
          }}
        />
      </div>

      {/* Main content - Fire Reveal Effect with popup and hover */}
      <motion.div 
        className="relative z-20 w-full"
        style={{ 
          scale: useTransform([baseScale, popupScale], ([base, popup]) => (base as number) * (popup as number)),
          opacity: useTransform([baseOpacity, popupOpacity], ([base, popup]) => Math.min(base as number, popup as number)),
          y,
          x: smoothMouseX,
          rotateY: useTransform(smoothMouseX, v => v * 0.5),
          rotateX: useTransform(smoothMouseY, v => -v * 0.3),
        }}
      >
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsl(var(--foreground) / 0.08) 0%, transparent 70%)",
            opacity: useTransform([smoothMouseX, smoothMouseY], ([x, y]) => 
              Math.min(1, (Math.abs(x as number) + Math.abs(y as number)) / 20)
            ),
            filter: "blur(40px)",
          }}
        />
        
        {/* Popup focus glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(var(--foreground) / 0.15) 0%, transparent 60%)",
            opacity: focusGlow,
            filter: "blur(30px)",
          }}
        />
        
        <FireRevealHero onRevealComplete={() => setIsRevealed(true)} />
      </motion.div>

      {/* Scroll Arrow - faster */}
      <motion.div
        ref={arrowRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, delay: 0.4 }}
        style={{ opacity: arrowOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        {/* Glow halo behind arrow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            width: 50,
            height: 50,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, hsl(var(--foreground) / ${0.08 * arrowGlow}) 0%, transparent 70%)`,
            filter: `blur(${3 + arrowGlow * 3}px)`,
            opacity: arrowGlow * 0.5 + (hasScrolled ? 0 : 0.1)
          }}
        />

        <span 
          className="font-body text-muted-foreground/60 text-xs tracking-widest uppercase"
          style={{ opacity: hasScrolled ? 0 : 0.5 }}
        >
          Scroll
        </span>
        
        <motion.div
          animate={{ 
            y: hasScrolled ? 0 : [0, 2, 0],
            scale: 1 + arrowGlow * 0.08
          }}
          transition={{ 
            y: { duration: 0.4, repeat: Infinity, ease: "easeOut" },
            scale: { duration: 0.04 }
          }}
          style={{
            filter: `drop-shadow(0 0 ${1.5 + arrowGlow * 4}px hsl(var(--foreground) / ${0.1 + arrowGlow * 0.25}))`
          }}
        >
          <ChevronDown 
            className="w-6 h-6 transition-colors duration-80" 
            style={{
              color: `hsl(var(--muted-foreground) / ${0.4 + arrowGlow * 0.5})`
            }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default HeroSection;
