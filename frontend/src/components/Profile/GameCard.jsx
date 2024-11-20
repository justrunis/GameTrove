import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchGame } from "../../api/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { STALE_TIME } from "../../utils/constants";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import UserGameInfo from "./UserGameInfo";

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const id = game.game;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["game", { id }],
    queryFn: () => fetchGame({ id }),
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
      <Card className="card bg-base-100 shadow-xl border border-gray-200">
        <figure className="overflow-hidden rounded-t-lg">
          <img
            src={data.background_image}
            alt={`${data.name} cover`}
            className="object-cover w-full h-48"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-bold text-primary">
            {data.name}
          </h2>
          <UserGameInfo game={game} />
          <div className="card-actions justify-center mt-4">
            <Button
              onClick={() => {
                navigate(`/games/${game.game}`);
              }}
              className="btn btn-primary"
            >
              View Game details
            </Button>
          </div>
        </div>
      </Card>
    );
  }
}
