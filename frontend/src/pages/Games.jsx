import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "../api/http";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import { STALE_TIME } from "../utils/constants";
import GameCard from "../components/Games/GameCard";
import Pager from "../components/UI/Pager";
import SearchBar from "../components/UI/SearchBar";
import { useSearchParams } from "react-router-dom";

export default function Games() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentQuery = searchParams.get("query") || "";

  document.title = "Games";

  const PAGE_SIZE = 20;

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["games", { page: currentPage, search: currentQuery }],
    queryFn: () => fetchGames({ page: currentPage, search: currentQuery }),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-6 rounded-lg mt-5">
        <ErrorIndicator
          title="Could not load games"
          message={error.message || "An error occurred"}
        />
      </div>
    );
  }

  const handlePageChange = (page) => {
    const newParams = { page: page };
    if (currentQuery) {
      newParams.query = currentQuery;
    }
    setSearchParams(newParams);
  };

  const handleSearch = (query) => {
    const newParms = { page: 1 };
    if (currentQuery !== query) {
      newParms.query = query;
      setSearchParams(newParms);
    }
  };

  const totalPages = Math.ceil(data?.count / PAGE_SIZE);

  if (data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container flex flex-col items-center justify-center mx-auto rounded-lg mt-5 p-4"
      >
        <h1 className="text-3xl font-bold text-base-content">Games</h1>
        <SearchBar
          onSearch={handleSearch}
          placeHolder="Search games..."
          className="mt-4"
          value={currentQuery}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {data.results.length === 0 && (
            <p className="text-lg text-base-content mt-4">No games found</p>
          )}
          {data.results.map((game) => (
            <GameCard key={game.id} game={game} className="min-w-[200px]" />
          ))}
        </div>

        {data.results.length > 0 && (
          <Pager
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
          />
        )}
      </motion.div>
    );
  }
}
