import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
  index: number;
  onClick: () => void;
  isInView: boolean;
}

const EventCard = ({ event, index, onClick, isInView }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.2, 
        delay: index * 0.04,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.1 }
      }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <motion.div 
        className="card-event rounded-2xl p-6 sm:p-8 h-full flex flex-col relative overflow-hidden"
        whileHover={{
          boxShadow: "0 12px 24px -8px rgba(0, 0, 0, 0.35), 0 0 20px hsl(var(--primary) / 0.1)"
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Hover gradient overlay - CSS transition */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100" />

        {/* Animated border on hover - CSS transition */}
        <div className="absolute inset-0 rounded-2xl border border-primary/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-100" />

        {/* Category badge */}
        <motion.div 
          className="mb-4 relative z-10"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.04 + 0.05, duration: 0.12 }}
        >
          <span 
            className={`inline-block px-3 py-1 rounded-full text-xs font-body font-medium tracking-wide uppercase
                       ${event.category === "technical" ? "badge-technical" : "badge-nontechnical"}`}
          >
            {event.category === "technical" ? "Technical" : "Non-Technical"}
          </span>
        </motion.div>

        {/* Icon */}
        <motion.div 
          className="text-4xl mb-4 relative z-10 transition-transform duration-100 group-hover:scale-105"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ 
            delay: index * 0.04 + 0.08,
            duration: 0.12,
            ease: "easeOut"
          }}
        >
          {event.icon}
        </motion.div>

        {/* Event name */}
        <motion.h3 
          className="font-display text-xl sm:text-2xl font-bold mb-2 tracking-wide relative z-10 
                     transition-all duration-100 group-hover:text-gradient-hero"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.04 + 0.1, duration: 0.12 }}
        >
          {event.name}
        </motion.h3>

        {/* Tagline */}
        <motion.p 
          className="font-body text-muted-foreground text-sm sm:text-base mb-6 flex-grow relative z-10"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.04 + 0.12, duration: 0.12 }}
        >
          {event.tagline}
        </motion.p>

        {/* View details */}
        <motion.div 
          className="flex items-center gap-2 text-primary font-body font-medium text-sm relative z-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.04 + 0.14, duration: 0.1 }}
        >
          <span className="group-hover:underline underline-offset-4">View Details</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EventCard;
