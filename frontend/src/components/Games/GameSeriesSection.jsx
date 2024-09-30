import { fetchGameSeries } from "../../api/http";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { STALE_TIME } from "../../utils/constants";
import GameCard from "./GameCard";

export default function GameSeriesSection({ id }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["gameSeries", { id }],
    queryFn: () => fetchGameSeries({ id }),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator />;
  }

  if (data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-1 lg:grid-cols-6 gap-4"
      >
        {data.results.map((game) => (
          <GameCard key={game.id} game={game} className="w-full">
            <Link to={`/games/${game.id}`}>
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{game.name}</h3>
                <p className="text-lg">{game.released}</p>
              </div>
            </Link>
          </GameCard>
        ))}
      </motion.div>
    );
  }
}
