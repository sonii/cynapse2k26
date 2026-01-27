import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Phone, Mail } from "lucide-react";
import rithuparanPhoto from "@/assets/rithuparan.jpeg";
import akilaPhoto from "@/assets/akila.jpg";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const organizers = [
    { name: "RITHUPARAN P S", photo: rithuparanPhoto, role: "Event Coordinator", mail: "230318.cs@rmkec.ac.in" },
    { name: "AKILA DEVADHARSHINI K", photo: akilaPhoto, role: "Event Coordinator", mail: "231006.cs@rmkec.ac.in  " }
  ];

  return (
    <footer 
      ref={ref}
      id="contact-section"
      className="py-20 px-4 border-t border-border relative overflow-hidden"
    >
      {/* Background decorations - simplified */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/4 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/4 rounded-full blur-[60px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.15 }}
          className="text-center mb-12"
        >
          <motion.p 
            className="text-primary font-body text-sm tracking-widest uppercase mb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.1 }}
          >
            Get In Touch
          </motion.p>
          
          <motion.h3 
            className="font-display text-3xl font-bold tracking-wide mb-4"
            initial={{ opacity: 0, y: 5 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.12, delay: 0.02 }}
          >
            Contact Us
          </motion.h3>
          
          <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
            If you have any queries, feel free to ask our respective event organizers.
          </p>

          {/* Organizer contacts - INSTANT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 max-w-4xl mx-auto">
            {organizers.map((organizer, index) => (
              <motion.div
                key={organizer.name}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.12, 
                  delay: index * 0.03,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -3,
                  transition: { duration: 0.08 }
                }}
                className="group cursor-pointer"
              >
                <motion.div 
                  className="card-event rounded-2xl p-6 sm:p-8 h-full flex flex-col relative overflow-hidden"
                  whileHover={{
                    boxShadow: "0 10px 20px -8px rgba(0, 0, 0, 0.25), 0 0 15px hsl(var(--primary) / 0.08)"
                  }}
                  transition={{ duration: 0.08 }}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-80" />

                  {/* Animated border on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-primary/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-80" />

                  {/* Role badge */}
                  <motion.div 
                    className="mb-4 relative z-10"
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.03 + 0.04, duration: 0.1 }}
                  >
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-body font-medium tracking-wide uppercase badge-technical">
                      {organizer.role}
                    </span>
                  </motion.div>

                  {/* Profile image with GLOWING RING on hover */}
                  <motion.div 
                    className="mb-4 relative z-10 flex justify-center"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      delay: index * 0.03 + 0.05,
                      duration: 0.1,
                      ease: "easeOut"
                    }}
                  >
                    {/* Glowing ring container */}
                    <div className="relative">
                      {/* Static glow ring visible on hover */}
                      <div className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-50 blur-[1px] transition-opacity duration-80" />
                      
                      {/* Photo container */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/40 
                                      group-hover:border-primary/70 transition-all duration-100
                                      group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.25)]
                                      group-hover:scale-102">
                        <img 
                          src={organizer.photo} 
                          alt={organizer.name}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: organizer.name.includes("AKILA") ? "center 25%" : "center top" }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Name */}
                  <motion.h3 
                    className="font-display text-xl sm:text-2xl font-bold mb-2 tracking-wide relative z-10 text-center
                               transition-all duration-80 group-hover:text-gradient-hero"
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.03 + 0.06, duration: 0.1 }}
                  >
                    {organizer.name}
                  </motion.h3>

                  {/* Phone */}
                  <motion.a 
                    href={`tel:${organizer.mail.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 text-primary font-body font-medium text-sm sm:text-base relative z-10 mt-auto"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.03 + 0.07, duration: 0.08 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone className="w-4 h-4" />
                    <span className="group-hover:underline underline-offset-4">{organizer.mail}</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Main email */}
          <motion.a
            href="mailto:cynapse@rmkec.ac.in"
            initial={{ opacity: 0, y: 4 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.12, delay: 0.06 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 
                       hover:bg-primary/20 border border-primary/30 transition-all duration-100 group"
            whileHover={{ scale: 1.015 }}
          >
            <Mail className="w-4 h-4 text-primary" />
            <span className="font-body text-sm text-foreground">cynapse@rmkec.ac.in</span>
          </motion.a>
        </motion.div>

        {/* Divider */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.15, delay: 0.07 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12"
        />

        {/* College & Department - faster */}
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.1, delay: 0.06 }}
          className="text-center mb-12 relative py-8"
        >
          {/* Ambient glow - reduced blur */}
          {isInView && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[200px] md:w-[600px] md:h-[350px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(255, 120, 0, 0.2) 0%, rgba(255, 60, 0, 0.1) 35%, rgba(120, 0, 180, 0.05) 60%, transparent 80%)",
                filter: "blur(20px)"
              }}
            />
          )}

          {/* Department - first */}
          <motion.h3
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.1, delay: 0.07, ease: "easeOut" }}
            className="font-display font-bold tracking-wide relative max-w-3xl mx-auto text-center text-foreground mb-4"
            style={{
              fontSize: "clamp(1rem, 3vw, 2rem)",
              lineHeight: 1.4,
              letterSpacing: "0.015em",
              textShadow: "0 0 10px rgba(255, 150, 50, 0.3)"
            }}
          >
            Department of Computer Science & Engineering
          </motion.h3>

          {/* College name - fast */}
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.1, delay: 0.08, ease: "easeOut" }}
            className="font-display font-black tracking-wide relative text-gradient-hero px-4"
            style={{
              fontSize: "clamp(1.5rem, 4.5vw, 4rem)",
              lineHeight: 1.2,
              letterSpacing: "0.02em",
              textShadow: "0 0 15px rgba(255, 150, 50, 0.5), 0 0 30px rgba(255, 100, 0, 0.25)"
            }}
          >
            RMK Engineering College
          </motion.h2>
        </motion.div>

        {/* Social link */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.12, delay: 0.1 }}
          className="text-center mb-10"
        >
          <motion.a
            href="https://www.instagram.com/cynapse2k26?igsh=MWI3ZjRmYXB3a3Z5NA=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-muted/50 
                       hover:bg-muted border border-border/50 hover:border-primary/30
                       transition-all duration-100 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Instagram className="w-5 h-5 group-hover:text-primary transition-colors duration-80" />
            <span className="font-body font-medium">Follow us on Instagram</span>
          </motion.a>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.12, delay: 0.12 }}
          className="text-center"
        >
          <p className="font-body text-muted-foreground text-xs tracking-wide">
            © 2026 <span className="text-gradient-hero font-medium">CYNAPSE</span>. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;