import { motion } from "framer-motion";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";

export default function GameCard({ game }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/${game.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
    >
      <Card
        onClick={handleClick}
        className="bg-base-300 p-2 rounded-lg hover:shadow-lg transition-shadow"
      >
        <div className="relative overflow-hidden bg-base-100 rounded-lg">
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-0 left-0 p-2 bg-accent bg-opacity-80 text-white font-bold rounded-br-lg">
            {game.rating}
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 p-2">
          <h2 className="text-lg font-semibold text-base-content">
            {game.name}
          </h2>
          <p className="text-sm text-base-content">{game.released}</p>
          <p className="text-sm text-base-content">
            {game.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
