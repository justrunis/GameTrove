import { motion } from "framer-motion";
import logo from "../../assets/logos/logo-no-background.png";

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky inset-x-0 bottom-0 bg-primary text-primary-content text-center py-4"
    >
      <div className="flex flex-row items-center justify-center text-center gap-4">
        <p>&copy; {new Date().getFullYear()}</p>
        <span>
          <img src={logo} alt="Game Trove Logo" className="w-40" />
        </span>
      </div>
    </motion.footer>
  );
}
