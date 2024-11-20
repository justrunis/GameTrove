import { fetchGiveaways } from "../api/http";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import { STALE_TIME } from "../utils/constants";
import Card from "../components/UI/Card";
import Pager from "../components/UI/Pager";
import { useSearchParams } from "react-router-dom";

export default function Giveaways() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["giveaways"],
    queryFn: () => fetchGiveaways(),
    staleTime: STALE_TIME,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  document.title = "Giveaways";

  const PAGE_SIZE = 10;
  const totalPages = data ? Math.ceil(data.length / PAGE_SIZE) : 0;

  const handlePageChange = (page) => {
    setSearchParams({ page: page });
  };

  const handleClick = (url) => {
    window.open(`${url}`, "_blank");
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-6 rounded-lg mt-5">
        <ErrorIndicator
          title="Could not load Giveaways"
          message={error.message || "An error occurred"}
        />
      </div>
    );
  }

  if (data) {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    const paginatedData = data.slice(startIndex, endIndex);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-6 my-5 bg-base-300 rounded-lg mt-5 border-2 border-primary"
      >
        <h2 className="text-2xl font-bold text-center text-base-content">
          Giveaways
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
          {paginatedData.map((item, index) => (
            <Card
              key={index}
              className="bg-base-100 rounded-lg hover:shadow-lg transition-shadow border-2 border-primary"
              onClick={() => handleClick(item.open_giveaway_url)}
            >
              <figure className="overflow-hidden rounded-t-lg">
                <img
                  src={item.image}
                  alt={`${item.title} cover`}
                  className="object-fit w-full h-48"
                />
              </figure>
              <div className="flex flex-col gap-1 p-2">
                <p>{item.title}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-5">
          {data.length > 0 && (
            <Pager
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          )}
        </div>
      </motion.div>
    );
  }
}
