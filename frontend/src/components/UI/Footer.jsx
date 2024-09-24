import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky inset-x-0 bottom-0 bg-primary text-primary-content text-center py-4"
    >
      <div className="flex flex-row items-center justify-center text-center">
        <p>&copy; {new Date().getFullYear()} Cinema Hub</p>
      </div>
    </motion.footer>
  );
}
