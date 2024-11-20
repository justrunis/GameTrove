import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { fetchUserGamesProgress } from "../../api/http";
import { STALE_TIME } from "../../utils/constants";
import GameCard from "./GameCard";

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((game, index) => (
            <GameCard game={game} key={index} />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
