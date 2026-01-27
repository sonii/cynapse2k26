import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.99, 1, 0.99]);

  const questionWords = ["READY", "TO", "EXPERIENCE"];

  return (
    <section 
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-4 section-glow relative overflow-hidden"
    >
      {/* Radial glow background - STATIC */}
      {isInView && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-primary/5 via-accent/2 to-transparent rounded-full blur-lg" />
        </div>
      )}

      <motion.div 
        style={{ y, scale }}
        className="text-center max-w-3xl mx-auto relative z-10"
      >
        {/* Question - Full line (instant) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="mb-4"
        >
          <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide">
            {questionWords.join(" ")}
          </span>
        </motion.div>

        {/* CYNAPSE? - instant */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.12, delay: 0.03, ease: "easeOut" }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient-hero glow-text mb-8"
        >
          CYNAPSE?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.1, delay: 0.05 }}
          className="font-body text-muted-foreground text-sm sm:text-base tracking-wide"
        >
          <span className="inline-block mx-1">Limited seats available</span>
          <span className="text-primary">•</span>
          <span className="inline-block mx-1">Registration closes soon</span>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default CTASection;