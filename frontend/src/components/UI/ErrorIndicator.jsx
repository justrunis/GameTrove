import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorIndicator({ title, message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-6 bg-error text-error-content rounded-lg shadow-lg border border-error-content"
    >
      <FaExclamationTriangle className="text-6xl text-warning mb-4" />
      <h1 className="text-3xl font-bold text-center uppercase mb-2">
        {title || "Error"}
      </h1>
      <p className="text-lg text-center">
        {message || "Something went wrong."}
      </p>
    </motion.div>
  );
}
