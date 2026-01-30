import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Mail } from "lucide-react";
import rithuparanPhoto from "@/assets/rithuparan.jpeg";
import akilaPhoto from "@/assets/akila.jpg";
import presidentPhoto from "@/assets/president.png";
import vicePresidentPhoto from "@/assets/vice-president.png";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const leadership = [
    {
      name: "A SRI PRANAV",
      photo: presidentPhoto,
      role: "PRESIDENT"
    },
    {
      name: "DHARANI P",
      photo: vicePresidentPhoto,
      role: "VICE PRESIDENT"
    }
  ];

  const organizers = [
    {
      name: "RITHUPARAN P S",
      photo: rithuparanPhoto,
      role: "Event Coordinator",
      mail: "231006.cs@rmkec.ac.in"
      
    },
    {
      name: "AKILA DEVADHARSHINI K",
      photo: akilaPhoto,
      role: "Event Coordinator",
      mail: "230318.cs@rmkec.ac.in"
    }
  ];

  return (
    <footer
      ref={ref}
      id="contact-section"
      className="py-20 px-4 border-t border-border relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/4 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/4 rounded-full blur-[60px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
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

          <div className="mb-12">
            <motion.h4
              className="font-display text-2xl font-bold tracking-wide mb-6"
              initial={{ opacity: 0, y: 5 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.12, delay: 0.02 }}
            >
              Leadership / Organizing Committee
            </motion.h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {leadership.map((leader, index) => (
                <motion.div
                  key={leader.role}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.12,
                    delay: index * 0.03,
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -3, transition: { duration: 0.08 } }}
                  className="group"
                >
                  <motion.div className="card-event rounded-2xl p-6 sm:p-8 h-full flex flex-col relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-80" />
                    <div className="absolute inset-0 rounded-2xl border border-primary/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-80" />

                    <div className="mb-4 relative z-10">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-body font-medium tracking-wide uppercase badge-technical">
                        {leader.role}
                      </span>
                    </div>

                    <div className="mb-4 relative z-10 flex justify-center">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/40">
                        <img
                          src={leader.photo}
                          alt={leader.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 tracking-wide text-center">
                      {leader.name}
                    </h3>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

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
                whileHover={{ y: -3, transition: { duration: 0.08 } }}
                className="group cursor-pointer"
              >
                <motion.div className="card-event rounded-2xl p-6 sm:p-8 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-80" />
                  <div className="absolute inset-0 rounded-2xl border border-primary/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-80" />

                  <div className="mb-4 relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-body font-medium tracking-wide uppercase badge-technical">
                      {organizer.role}
                    </span>
                  </div>

                  <div className="mb-4 relative z-10 flex justify-center">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/40">
                      <img
                        src={organizer.photo}
                        alt={organizer.name}
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: organizer.name.includes("AKILA")
                            ? "center 25%"
                            : "center top"
                        }}
                      />
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 tracking-wide text-center">
                    {organizer.name}
                  </h3>

                  {/* EMAIL WITH MAIL ICON (CHANGED HERE) */}
                  <motion.a
                    href={`mailto:${organizer.mail.replace(/\s/g, "")}`}
                    className="flex items-center justify-center gap-2 text-primary font-body font-medium text-sm sm:text-base mt-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Mail className="w-4 h-4" />
                    <span className="underline-offset-4">
                      {organizer.mail}
                    </span>
                  </motion.a>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="mailto:cynapse@rmkec.ac.in"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30"
          >
            <Mail className="w-4 h-4 text-primary" />
            <span className="font-body text-sm text-foreground">
              cynapse@rmkec.ac.in
            </span>
          </motion.a>
        </motion.div>

        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/cynapse2k26"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-muted/50 border border-border/50"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-body font-medium">
              Follow us on Instagram
            </span>
          </a>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          © 2026 <span className="font-medium">CYNAPSE</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
