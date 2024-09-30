import logo from "../../assets/logos/logo-no-background.png";
import { motion } from "framer-motion";

export default function Logo({ className, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      <motion.img src={logo} alt="logo" className={className} />
    </motion.div>
  );
}
