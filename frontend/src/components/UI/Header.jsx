import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavLinks from "../Header/NavLinks";
import MobileMenuButton from "../Header/MobileMenuButton";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => setIsOpen(!isOpen);
  const handleCloseMenu = () => setIsOpen(false);

  return (
    <header className="bg-primary">
      <nav className="flex justify-between items-center mx-10 py-5">
        <div className="hidden lg:flex flex-1 justify-between items-center">
          <NavLinks closeMenu={handleCloseMenu} />
        </div>
        <MobileMenuButton isMenuOpen={isOpen} toggleMenu={handleMenuToggle} />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="lg:hidden absolute top-20 left-0 right-0 bg-primary p-4 z-50 border-4 border-accent shadow-lg"
            >
              <NavLinks closeMenu={handleCloseMenu} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
