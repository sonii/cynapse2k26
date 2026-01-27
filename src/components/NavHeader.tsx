import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NavHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Events", sectionId: "events-section" },
    { label: "Contact Us", sectionId: "contact-section" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`fixed top-0 right-0 z-40 transition-all duration-150 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border/30" 
          : "bg-transparent"
      }`}
      style={{ left: "100px" }} // Offset for RMK logo
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-end gap-8">
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="font-display text-base font-bold uppercase tracking-wider text-foreground 
                           hover:text-primary transition-colors duration-100
                           relative group"
              >
                {item.label}
                <span 
                  className="absolute -bottom-1 left-0 w-0 h-px bg-primary
                             group-hover:w-full transition-all duration-150"
                />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 text-muted-foreground hover:text-primary transition-colors duration-100"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            className="sm:hidden absolute top-full right-0 left-0 bg-background/95 backdrop-blur-md 
                       border-b border-border/30 py-4 px-6"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="font-display text-base font-bold uppercase tracking-wider text-foreground 
                             hover:text-primary transition-colors duration-100 text-left py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default NavHeader;
