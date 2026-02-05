import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, ShieldCheck, Ticket, UtensilsCrossed } from "lucide-react";
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
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.08 }}
            onClick={onClose}
            className="fixed inset-0 z-50 modal-overlay"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-50 flex items-center justify-center"
          >
            <div className="relative w-full max-w-4xl max-h-full overflow-y-auto bg-card rounded-2xl border border-border shadow-2xl">
              {/* Hero image */}
              <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden rounded-t-2xl">
                <img
                  src={eventImage}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                <span
                  className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs uppercase backdrop-blur-sm
                  ${event.category === "technical" ? "badge-technical" : "badge-nontechnical"}`}
                >
                  {event.category === "technical" ? "Technical Event" : "Non-Technical Event"}
                </span>

                <div className="absolute bottom-4 left-6 right-6 flex items-center gap-4">
                  <span className="text-5xl">{event.icon}</span>
                  <h2 className="text-3xl font-bold text-gradient-hero">
                    {event.name}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 md:p-10">
                <p className="italic text-muted-foreground mb-8">
                  "{event.tagline}"
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left */}
                  <div>
                    <h3 className="font-semibold mb-3">Overview</h3>
                    <p className="text-muted-foreground mb-6">
                      {event.overview}
                    </p>

                    <h3 className="font-semibold mb-3">Description</h3>
                    <ul className="space-y-2">
                      {event.requirements.map((req, i) => (
                        <li key={i} className="text-muted-foreground text-sm">
                          ▸ {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right */}
                  <div>
                    <h3 className="font-semibold mb-3">Queries & Contact</h3>
                    <div className="space-y-3 mb-6">
                      {event.contacts.map((c, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                          <Phone className="w-4 h-4 text-primary" />
                          <span>{c.name}</span>
                          <a
                            href={`tel:${c.phone.replace(/\s/g, "")}`}
                            className="text-primary hover:underline"
                          >
                            {c.phone}
                          </a>
                        </div>
                      ))}
                    </div>

                    {/* 🔴 REGISTRATION CLOSED BUTTON (SAFE REPLACEMENT) */}
                    <button
                      disabled
                      className="w-full px-8 py-4 rounded-full bg-red-600 text-white font-bold cursor-not-allowed"
                    >
                      Registration Closed
                    </button>
                  </div>
                </div>

                {/* Important Details */}
                <div className="mt-10 pt-8 border-t border-border/50 space-y-6">
                  <div className="p-6 rounded-xl bg-muted/20 border">
                    <ShieldCheck className="w-6 h-6 text-primary mb-3" />
                    <h4 className="font-semibold mb-3">Rules & Regulations</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {rulesAndRegulations.map((r, i) => (
                        <li key={i}>• {r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl bg-muted/20 border">
                    <Ticket className="w-6 h-6 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">
                      There is no entry fee for any event.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl bg-muted/20 border">
                    <UtensilsCrossed className="w-6 h-6 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Breakfast and lunch will be provided.
                    </p>
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