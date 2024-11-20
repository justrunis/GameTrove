import { useQuery } from "@tanstack/react-query";
import { fetchAllReviewsForGame } from "../../api/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { STALE_TIME } from "../../utils/constants";
import { queryClient } from "../../api/http";
import GameReviewCard from "./GameReviewCard";

export default function GameReviewSection({ id }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchAllReviewsForGame({ id: id }),
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-6 rounded-lg mt-5">
        <ErrorIndicator
          title="Could not load Reviews"
          message={error.message || "An error occurred"}
        />
      </div>
    );
  }

  if (data && !isLoading) {
    console.log(data);
    return (
      <div className="flex flex-col gap-2">
        {data.reviews.length > 0 ? (
          <>
            {data.reviews.map((review) => (
              <GameReviewCard key={review.id} review={review} />
            ))}
          </>
        ) : (
          <p className="text-lg text-base-content">
            This game has no user reviews
          </p>
        )}
      </div>
    );
  }
}
