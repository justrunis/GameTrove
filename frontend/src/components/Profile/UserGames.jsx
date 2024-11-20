import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { fetchUserGamesProgress } from "../../api/http";
import { STALE_TIME } from "../../utils/constants";
import GameCard from "./GameCard";
import { Link } from "react-router-dom";

export default function UserGames() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-games"],
    queryFn: fetchUserGamesProgress,
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <ErrorIndicator title="An error has occurred" message={error.message} />
    );
  }

  if (data && !isLoading && !isError) {
    return (
      <div className="p-4">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {data.map((game, index) => (
              <GameCard game={game} key={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p> You have not checked any games yet.</p>
            <Link
              to="/games"
              className="text-base-content text-sm underline hover:text-accent"
            >
              To games
            </Link>
          </div>
        )}
      </div>
    );
  }

  return null;
}
