import Carousel from "../UI/Carousel";
import { fetchGameScreenshots } from "../../api/http";
import { STALE_TIME } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";

export default function GameScreenshotSection({ id }) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["gameScreenshots", { id }],
    queryFn: () => fetchGameScreenshots({ id }),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-6 rounded-lg mt-5">
        <ErrorIndicator error={error} />
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex items-center justify-center mt-8 lg:w-1/2 h-full">
        <Carousel images={data.results.map((screenshot) => screenshot.image)} />
      </div>
    );
  }

  return null;
}
