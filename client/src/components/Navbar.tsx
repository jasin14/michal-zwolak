import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "O mnie", href: "#about" },
    { name: "Wyzwania", href: "#challenges" },
    { name: "Współpraca", href: "#support" },
    { name: "Kontakt", href: "#contact" },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-white/10 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-2xl font-display font-bold tracking-wider text-white cursor-pointer"
        >
          MICHAŁ<span className="text-primary">ZWOLAK</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors uppercase tracking-widest relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <a
            href="https://www.instagram.com/michalzwolak87/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition-colors p-2"
          >
            <Instagram size={24} />
          </a>
          <button
            onClick={() => scrollToSection("#contact")}
            className="px-6 py-2 bg-primary hover:bg-red-600 text-white font-bold uppercase text-sm tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/25"
          >
            Współpraca
          </button>
        </div>

        {/* Mobile Toggle & Socials */}
        <div className="flex items-center gap-4 md:hidden">
          <a
            href="https://www.instagram.com/michalzwolak87/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition-colors"
          >
            <Instagram size={24} />
          </a>
          <button
            className="text-white hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-lg font-display font-bold text-white hover:text-primary text-left uppercase tracking-wider"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("#contact")}
                className="mt-4 w-full py-4 bg-primary text-white font-bold uppercase tracking-wider"
              >
                Współpraca
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
