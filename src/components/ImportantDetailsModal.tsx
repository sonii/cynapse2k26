import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Ticket, UtensilsCrossed } from "lucide-react";

const rulesAndRegulations = [
  "Students must bring their respective college ID card.",
  "Confirmation mail for selection will be sent to your registered email ID.",
  "Boys are requested to attend in formal attire with a clean shave. (Jeans and T-shirts are not permitted.)",
  "Girls are requested to wear formal churidar with dupatta. (Half sarees, midis, kurtis, patialas, and short tops are not permitted inside the campus.)",
  "On-spot registration is not available.",
  "Mobile Phones are not allowed."];

interface ImportantDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImportantDetailsModal = ({ isOpen, onClose }: ImportantDetailsModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Centered Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-20 z-50 flex items-center justify-center"
          >
            <div className="relative w-full max-w-3xl max-h-full overflow-y-auto bg-card rounded-2xl border border-border shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border/50 p-6">
                <div className="flex items-center justify-between">
                  {/* Important Details Header - Pill Style */}
                  <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#9ACD32]/50 bg-[#9ACD32]/5">
                    <svg 
                      className="w-5 h-5 text-[#9ACD32]" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                      />
                    </svg>
                    <span className="font-display text-sm font-semibold tracking-[0.15em] uppercase text-[#9ACD32]">
                      Important Details
                    </span>
                  </div>

                  {/* Close button */}
                  <motion.button
                    onClick={onClose}
                    className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Rules & Regulations */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 rounded-xl bg-muted/20 border border-border/40"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-lg font-semibold mb-4 tracking-wide uppercase">
                        Rules & Regulations
                      </h4>
                      <ul className="space-y-3">
                        {rulesAndRegulations.map((rule, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + index * 0.05 }}
                            className="flex items-start gap-3 font-body text-muted-foreground text-sm leading-relaxed"
                          >
                            <span className="text-primary mt-1 text-lg">•</span>
                            <span>{rule}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Entry Fee */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-xl bg-muted/20 border border-border/40"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                      <Ticket className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-lg font-semibold mb-2 tracking-wide uppercase">
                        Entry Fee
                      </h4>
                      <p className="font-body text-muted-foreground text-sm mb-3">
                        There is no entry fee for any event.
                      </p>
                      <span className="inline-block px-4 py-1.5 rounded-md bg-primary/20 border border-primary/40 
                                       font-display text-xs font-semibold tracking-widest uppercase text-primary">
                        Free Entry For All
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Food Facilities */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 rounded-xl bg-muted/20 border border-border/40"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                      <UtensilsCrossed className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-lg font-semibold mb-2 tracking-wide uppercase">
                        Food Facilities
                      </h4>
                      <p className="font-body text-muted-foreground text-sm mb-3">
                        Breakfast and lunch will be provided for all participants.
                      </p>
                      <span className="inline-block px-4 py-1.5 rounded-md bg-accent/20 border border-accent/40 
                                       font-display text-xs font-semibold tracking-widest uppercase text-accent">
                        Complimentary Meals
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImportantDetailsModal;
