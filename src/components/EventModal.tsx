import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Phone, ShieldCheck, Ticket, UtensilsCrossed } from "lucide-react";
import type { Event } from "@/data/events";
import { preloadedEventImages } from "@/hooks/useImagePreloader";

// Important details data
const rulesAndRegulations = [
  "Students must bring their respective college ID card.",
  "Confirmation mail for selection will be sent to your registered email ID.",
  "Boys are requested to attend in formal attire with a clean shave. (Jeans and T-shirts are not permitted.)",
  "Girls are requested to wear formal churidar with dupatta. (Half sarees, midis, kurtis, patialas, and short tops are not permitted inside the campus.)",
  "On-spot registration is not available."
];

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal = ({ event, isOpen, onClose }: EventModalProps) => {
  if (!event) return null;

  const eventImage = preloadedEventImages[event.image];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay - instant */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.08 }}
            onClick={onClose}
            className="fixed inset-0 z-50 modal-overlay"
          />

          {/* Centered Modal - fast open */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-50 flex items-center justify-center"
          >
            <div className="relative w-full max-w-4xl max-h-full overflow-y-auto bg-card rounded-2xl border border-border shadow-2xl">
              {/* Hero image section - NO lazy loading, images preloaded */}
              <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden rounded-t-2xl">
                <img 
                  src={eventImage} 
                  alt={event.name}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  decoding="sync"
                />
                {/* Dark overlay with vignette for blending */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-card/40" />
                
                {/* Close button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background
                             transition-all duration-100 border border-border/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Category badge */}
                <span 
                  className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-body font-medium tracking-wide uppercase backdrop-blur-sm
                             ${event.category === "technical" ? "badge-technical" : "badge-nontechnical"}`}
                >
                  {event.category === "technical" ? "Technical Event" : "Non-Technical Event"}
                </span>

                {/* Event title overlay */}
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">
                      {event.icon}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-hero">
                      {event.name}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Content section - all content appears together */}
              <div className="p-6 sm:p-8 md:p-10">
                {/* Tagline */}
                <p className="font-body text-lg text-muted-foreground italic mb-8">
                  "{event.tagline}"
                </p>

                {/* Two column layout on larger screens */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left column */}
                  <div>
                    {/* Overview */}
                    <div className="mb-8">
                      <h3 className="font-display text-lg font-semibold mb-4 tracking-wide flex items-center gap-2">
                        <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-accent" />
                        Overview
                      </h3>
                      <p className="font-body text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {event.overview}
                      </p>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="font-display text-lg font-semibold mb-4 tracking-wide flex items-center gap-2">
                        <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-accent" />
                        Description
                      </h3>
                      <ul className="space-y-2">
                        {event.requirements.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 font-body text-muted-foreground text-sm"
                          >
                            <span className="text-primary mt-0.5">▸</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right column */}
                  <div>
                    {/* Contacts */}
                    <div className="mb-8">
                      <h3 className="font-display text-lg font-semibold mb-4 tracking-wide flex items-center gap-2">
                        <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-accent" />
                        Queries & Contact
                      </h3>
                      <div className="space-y-3">
                        {event.contacts.map((contact, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-3 font-body text-muted-foreground p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-100"
                          >
                            <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="font-medium text-foreground text-sm">{contact.name}</span>
                            <span className="text-muted-foreground">—</span>
                            <a 
                              href={`tel:${contact.phone.replace(/\s/g, '')}`}
                              className="text-primary hover:underline underline-offset-4 transition-all duration-100 hover:text-accent text-sm"
                            >
                              {contact.phone}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-4">
                      {/* Register button */}
                      <div className="relative">
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-25"
                        />
                        <a
                          href={event.registerLink}
                          className="group relative w-full inline-flex items-center justify-center gap-3 font-display font-semibold 
                                     px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent 
                                     text-primary-foreground transition-all duration-150 
                                     hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] hover:scale-103"
                        >
                          <span>Register Now</span>
                          <ArrowUpRight className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Details Section */}
                <div className="mt-10 pt-8 border-t border-border/50">
                  {/* Important Details Header - Pill Style */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#9ACD32]/50 bg-[#9ACD32]/5">
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
                      <span className="font-display text-sm font-semibold tracking-[0.2em] uppercase text-[#9ACD32]">
                        Important Details
                      </span>
                    </div>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-[#9ACD32]/60 to-transparent" />
                  </div>

                  <div className="space-y-6">
                    {/* Rules & Regulations */}
                    <div className="p-6 rounded-xl bg-muted/20 border border-border/40">
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
                              <li
                                key={index}
                                className="flex items-start gap-3 font-body text-muted-foreground text-sm leading-relaxed"
                              >
                                <span className="text-primary mt-1 text-lg">•</span>
                                <span>{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Entry Fee */}
                    <div className="p-6 rounded-xl bg-muted/20 border border-border/40">
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
                    </div>

                    {/* Food Facilities */}
                    <div className="p-6 rounded-xl bg-muted/20 border border-border/40">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventModal;