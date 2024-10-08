import { fetchGameSeries } from "../../api/http";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { STALE_TIME } from "../../utils/constants";
import GameCard from "./GameCard";
import { useSearchParams } from "react-router-dom";
import Pager from "../UI/Pager";

export default function GameSeriesSection({ id }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("seriesPage") || "1", 10);

  const PAGE_SIZE = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gameSeries", { id, page: currentPage }],
    queryFn: () => fetchGameSeries({ id, page: currentPage }),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator />;
  }

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("seriesPage", page);
    setSearchParams(newParams);
  };

  if (data) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {data.results.length === 0 && (
            <p className="text-lg text-base-content">No Series Available</p>
          )}
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
        {data.results.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pager
              currentPage={currentPage}
              totalPages={Math.ceil(data.count / PAGE_SIZE)}
              setCurrentPage={handlePageChange}
            />
          </div>
        )}
      </>
    );
  }
}
