import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchGameAchievements } from "../../api/http";
import { STALE_TIME } from "../../utils/constants";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import { useSearchParams } from "react-router-dom";
import Pager from "../UI/Pager";
import AchievmentCard from "./AchievmentCard";

export default function GameAchievementSection({ id }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const PAGE_SIZE = 10;

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["gameAchievements", { id, page: currentPage }],
    queryFn: () => fetchGameAchievements({ id, page: currentPage }),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-6 rounded-lg mt-5">
        <ErrorIndicator
          title="Could not load Achievements"
          message={error.message || "An error occurred"}
        />
      </div>
    );
  }

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);
    setSearchParams(newParams);
  };

  if (data) {
    const totalPages = Math.ceil(data.count / PAGE_SIZE);
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-6 rounded-lg bg-base-200"
      >
        <h2 className="text-2xl font-bold text-center text-base-content my-2">
          Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {data.results.length === 0 && (
            <p className="text-lg text-base-content">
              No Achievements Available
            </p>
          )}
          {data.results.map((achievement) => (
            <AchievmentCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-4">
          <Pager
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={handlePageChange}
          />
        </div>
      </motion.div>
    );
  }
}
