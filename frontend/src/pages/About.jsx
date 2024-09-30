import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import logo from "../assets/logos/logo-no-background.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  document.title = "About";
  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-primary p-8 rounded-lg text-primary-content border-4 border-accent shadow-lg"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
    >
      <motion.h1
        variants={childVariants}
        className="text-4xl font-bold text-center"
      >
        About Us
      </motion.h1>
      <img src={logo} alt="Game Trove Logo" className="w-60" />
      <motion.p variants={childVariants} className="text-lg text-center mt-4">
        Game Trove is the ultimate resource for game information. We provide
        detailed information on games, developers, platforms, and more.
      </motion.p>
      <motion.div
        variants={childVariants}
        className="flex flex-col lg:flex-row gap-4 mt-4"
      >
        <Link to="/games">
          <Button className="btn btn-accent">Explore games</Button>
        </Link>
        <Link to="/about">
          <Button className="btn btn-secondary">Learn more about us</Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
