import { useQuery } from "@tanstack/react-query";
import { fetchGame } from "../../api/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { STALE_TIME } from "../../utils/constants";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const id = game.game;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["game", { id }],
    queryFn: () => fetchGame({ id }),
    staleTime: STALE_TIME,
  });

  function handleClick() {
    navigate(`/games/${game.game}`);
  }

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
      <Card
        onClick={handleClick}
        className="card bg-base-100 shadow-xl border border-gray-200"
      >
        <figure className="overflow-hidden rounded-t-lg">
          <img
            src={data.background_image}
            alt={`${data.name} cover`}
            className="object-fit w-full h-48"
          />
        </figure>
        <div className="flex flex-col my-5 items-center justify-around">
          <h2 className="text-center text-2xl font-bold text-primary">
            {data.name}
          </h2>
        </div>
      </Card>
    );
  }
}
