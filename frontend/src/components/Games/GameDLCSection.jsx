import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchGameDLC } from "../../api/http";
import { STALE_TIME } from "../../utils/constants";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import GameCard from "./GameCard";
import Pager from "../UI/Pager";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function GameDLCSection({ id }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("dlcPage") || "1", 10);

  const PAGE_SIZE = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gameDLC", { id, page: currentPage }],
    queryFn: () => fetchGameDLC({ id, page: currentPage }),
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
    newParams.set("dlcPage", page);
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
            <p className="text-lg text-base-content">No DLC Available</p>
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
