import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserGamesProgress } from "../../api/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { STALE_TIME } from "../../utils/constants";
import UserGameInfo from "../Profile/UserGameInfo";
import Button from "../UI/Button";
import GameProgressModal from "./GameProgressModal";

export default function UserGameProgress({ gameId }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-games"],
    queryFn: fetchUserGamesProgress,
    staleTime: STALE_TIME,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState({
    hasBeaten: false,
    game: gameId,
    playTime: 0,
    rating: 0,
    review: "",
    startedAt: new Date(),
    completedAt: new Date(),
  });

  const openUpdateInfo = (game) => {
    setIsOpen(true);
    setSelectedGame(game);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <ErrorIndicator title="Error loading progress" message={error.message} />
    );
  }

  if (data && !isLoading) {
    const game = data.find((game) => game.game == gameId);
    const isPlayed = !!game;

    return (
      <div>
        <h2 className="text-xl font-bold text-start text-base-content">
          My Progress
        </h2>

        {isOpen && (
          <GameProgressModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedGame={selectedGame}
            setSelectedGame={setSelectedGame}
          />
        )}

        {isPlayed ? (
          <div>
            <UserGameInfo game={game} />
            <Button
              onClick={() => openUpdateInfo(game)}
              className="btn btn-primary mt-2"
            >
              Update Progress
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-error font-semibold text-center">
              You have no progress for this game
            </h2>
            <Button
              onClick={() => openUpdateInfo(selectedGame)}
              className="btn btn-primary mt-2"
            >
              Create Progress
            </Button>
          </div>
        )}
      </div>
    );
  }

  return null;
}
