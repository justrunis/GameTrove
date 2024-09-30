import { motion } from "framer-motion";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/logo-no-background.png";

export default function Home() {
  const navigate = useNavigate();

  document.title = "Home";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center bg-primary p-8 rounded-lg text-primary-content shadow-lg border-4 border-accent"
    >
      <h1 className="text-4xl font-bold text-center">Welcome to</h1>
      <img src={logo} alt="Game Trove Logo" className="w-60" />
      <h2 className="text-2xl font-semibold text-center mt-2">
        Your Ultimate Game Resource
      </h2>
      <p className="text-lg text-center mt-4">
        Find the best information on games right here
      </p>
      <div className="flex flex-col lg:flex-row gap-4 mt-4">
        <Button className="btn btn-accent" onClick={() => navigate("/games")}>
          Explore games
        </Button>
        <Button
          className="btn btn-secondary"
          onClick={() => navigate("/about")}
        >
          Learn more about us
        </Button>
      </div>
    </motion.div>
  );
}
