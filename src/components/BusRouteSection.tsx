import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Bus, FileText } from "lucide-react";
import ImportantDetailsModal from "./ImportantDetailsModal";

const BusRouteSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section 
        ref={ref}
        className="py-20 flex flex-col items-center justify-center px-4 relative overflow-hidden"
      >
        {/* Subtle glow background */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-radial from-primary/8 via-accent/4 to-transparent rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="/BusRoute.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 font-display text-lg sm:text-xl font-semibold 
                       px-10 py-5 rounded-full border-2 border-primary/50 bg-primary/10
                       text-foreground transition-all duration-200 
                       hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] hover:scale-105"
          >
            <Bus className="w-6 h-6 text-primary" />
            <span>VIEW BUS ROUTE</span>
          </a>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center gap-3 font-display text-lg sm:text-xl font-semibold 
                       px-10 py-5 rounded-full border-2 border-accent/50 bg-accent/10
                       text-foreground transition-all duration-200 
                       hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_40px_hsl(var(--accent)/0.4)] hover:scale-105"
          >
            <FileText className="w-6 h-6 text-accent" />
            <span>IMPORTANT DETAILS</span>
          </button>
        </motion.div>
      </section>

      <ImportantDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default BusRouteSection;