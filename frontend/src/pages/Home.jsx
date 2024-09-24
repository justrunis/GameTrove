import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center bg-primary p-8 rounded-lg text-primary-content h-full"
    >
      <h1 className="text-4xl font-bold text-center">Welcome to Game Trove</h1>
      <p className="text-lg text-center mt-4">
        Find the best information on games right here
      </p>
      <div className="flex flex-col gap-4 mt-4">
        <Button className="btn btn-accent" onClick={() => navigate("/games")}>
          Explore games
        </Button>
      </div>
    </motion.div>
  );
}
