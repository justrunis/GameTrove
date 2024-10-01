import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchGamePrices } from "../../api/http";
import { STALE_TIME } from "../../utils/constants";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import GamePriceCard from "./GamePriceCard";
import Pager from "../UI/Pager";
import { useSearchParams } from "react-router-dom";

export default function GamePrices({ title }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("pricePage") || "1", 10);

  const PAGE_SIZE = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gamePrices", { title }],
    queryFn: () => fetchGamePrices({ title }),
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
    newParams.set("pricePage", page);
    setSearchParams(newParams);
  };

  if (data) {
    const pagedData = data.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE
    );

    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {pagedData.length === 0 && (
            <p className="text-lg text-base-content">No Prices Available</p>
          )}
          {pagedData.map((price) => (
            <GamePriceCard
              key={price.gameID}
              price={price}
              className="w-full"
            />
          ))}
        </motion.div>
        {pagedData.length > 0 && (
          <div className="flex justify-center items-center mt-4">
            <Pager
              currentPage={currentPage}
              totalPages={Math.ceil(data.length / PAGE_SIZE)}
              setCurrentPage={handlePageChange}
            />
          </div>
        )}
      </>
    );
  }

  return null;
}
