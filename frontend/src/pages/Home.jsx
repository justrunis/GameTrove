import { motion } from "framer-motion";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
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

export default function Home() {
  const navigate = useNavigate();

  document.title = "Home";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className="flex flex-col items-center justify-center bg-primary p-8 rounded-lg text-primary-content shadow-lg border-4 border-accent"
    >
      <motion.h1
        variants={childVariants}
        className="text-4xl font-bold text-center"
      >
        Welcome to
      </motion.h1>
      <motion.img
        variants={childVariants}
        src={logo}
        alt="Game Trove Logo"
        className="w-60"
      />
      <motion.h2
        variants={childVariants}
        className="text-2xl font-semibold text-center mt-2"
      >
        Your Ultimate Game Resource
      </motion.h2>
      <motion.p variants={childVariants} className="text-lg text-center mt-4">
        Find the best information on games right here
      </motion.p>
      <motion.div
        variants={childVariants}
        className="flex flex-col lg:flex-row gap-4 mt-4"
      >
        <Button className="btn btn-accent" onClick={() => navigate("/games")}>
          Explore games
        </Button>
        <Button
          className="btn btn-secondary"
          onClick={() => navigate("/about")}
        >
          Learn more about us
        </Button>
      </motion.div>
    </motion.div>
  );
}
