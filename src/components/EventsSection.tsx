import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { events, Event } from "@/data/events";
import EventModal from "./EventModal";
import CircularGallery from "./CircularGallery";
import ElectricBorder from "./ElectricBorder";

// Import event images
import eventCompendium from "@/assets/event-compendium.jpg";
import eventCompendiumGallery from "@/assets/event-compendium-gallery.jpg";
import eventSyntaxSaga from "@/assets/event-syntax-saga.jpg";
import eventSyntaxSagaCard from "@/assets/event-syntax-saga-card.jpg";
import eventCoalescence from "@/assets/event-coalescence.png";
import eventCoalescenceGallery from "@/assets/event-coalescence-gallery.jpg";
import eventTrustIssues from "@/assets/event-trust-issues.jpg";
import eventTrustIssuesGallery from "@/assets/event-trust-issues-gallery.jpg";

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  // Gallery items for the 4 events
  const galleryItems = [
    { image: eventCompendiumGallery, text: "Compendium" },
    { image: eventSyntaxSaga, text: "{Syntax Saga}" },
    { image: eventCoalescenceGallery, text: "Coalescence", verticalAlign: 0 },
    { image: eventTrustIssuesGallery, text: "Untold Verdict" }
  ];

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
    setTimeout(() => setSelectedEvent(null), 150);
  };

  // Section title with letter animation
  const sectionTitle = "EVENTS";

  return (
    <section 
      ref={ref}
      id="events-section"
      className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 section-glow relative overflow-hidden"
    >
      {/* Background decorations - static */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-primary/5 rounded-full"
          style={{ animation: "spin 60s linear infinite" }}
        />
        <div 
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] border border-accent/5 rounded-full"
          style={{ animation: "spin 80s linear infinite reverse" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-16"
        >
          {/* Icon */}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ 
              duration: 0.15,
              type: "spring",
              stiffness: 400
            }}
            className="inline-block text-4xl mb-6"
          >
            ⚡
          </motion.span>

          {/* Title - instant reveal */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-wide overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.2, 
                ease: "easeOut"
              }}
              className="inline-block"
            >
              {sectionTitle}
            </motion.span>
          </h2>

          {/* Description - larger and bolder */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.2 }}
            className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            Four carefully crafted arenas — each designed as a standalone experience, 
            with its own definition of fun, challenge, and learning.
            <br />
            <span className="text-gradient-hero font-black text-2xl sm:text-3xl md:text-4xl">Pick your battleground. Prove your edge.</span>
          </motion.p>

          {/* Scroll instruction */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 }}
            className="font-body text-sm text-muted-foreground"
          >
            <span style={{ opacity: 0.7 }}>
              Drag or scroll to explore ↔
            </span>
          </motion.p>
        </motion.div>

        {/* Circular Gallery for events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.25 }}
          className="h-[500px] sm:h-[600px] relative"
        >
          <CircularGallery
            items={galleryItems}
            bend={2}
            textColor="#ffffff"
            borderRadius={0.08}
            font="bold 24px 'Space Grotesk', sans-serif"
            scrollSpeed={3}
            scrollEase={0.08}
          />
        </motion.div>

        {/* Event cards below gallery for clicking */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.25 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {events.map((event, index) => {
            // Get event image
            const eventImages: Record<string, string> = {
              'compendium': eventCompendium,
              'syntax-saga': eventSyntaxSagaCard,
              'coalescence': eventCoalescence,
              'trust-issues': eventTrustIssues
            };
            const eventImage = eventImages[event.image] || eventCompendium;

            // Extract team size from requirements
            const teamReq = event.requirements.find(r => r.toLowerCase().includes('team size'));
            const participationReq = event.requirements.find(r => r.toLowerCase().includes('participation'));
            const teamSize = teamReq 
              ? teamReq.replace('Team Size:', '').trim() 
              : participationReq 
                ? participationReq.replace('Participation:', '').trim()
                : 'TBA';

            return (
              <ElectricBorder
                key={event.id}
                color="#00FFFF"
                speed={1.5}
                chaos={0.15}
                borderRadius={16}
                className="w-full h-full"
              >
                <motion.button
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsModalOpen(true);
                    document.body.style.overflow = "hidden";
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.18 + index * 0.03 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 
                             hover:border-primary/40 transition-all duration-150 text-left group overflow-hidden
                             hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] w-full"
                >
                  {/* Image with category badge */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img 
                      src={eventImage} 
                      alt={event.name}
                      loading="eager"
                      decoding="sync"
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    
                    {/* Category badge */}
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase
                      ${event.category === 'technical' 
                        ? 'bg-primary/90 text-primary-foreground' 
                        : 'bg-accent/90 text-accent-foreground'
                      }`}
                    >
                      {event.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Event name */}
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-150">
                      {event.name}
                    </h3>
                    
                    {/* Description/Tagline */}
                    <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-4 leading-relaxed">
                      {event.tagline}. {event.overview.slice(0, 120)}...
                    </p>
                    
                    {/* Footer: Team size + Details button */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/30">
                      <span className="text-xs text-muted-foreground font-medium">
                        {teamSize}
                      </span>
                      
                      <span className="px-4 py-1.5 rounded-full border border-primary/60 text-primary text-xs font-bold 
                                       tracking-wider uppercase group-hover:bg-primary group-hover:text-primary-foreground 
                                       transition-all duration-150">
                        DETAILS
                      </span>
                    </div>
                  </div>
                </motion.button>
              </ElectricBorder>
            );
          })}
        </motion.div>
      </div>

      {/* Event modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default EventsSection;