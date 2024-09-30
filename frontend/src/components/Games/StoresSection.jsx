import Button from "../UI/Button";
import { fetchGameStores } from "../../api/http";
import { stores } from "../../utils/constants";
import { STALE_TIME } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";

export default function StoresSection({ id }) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["gameStores", { id }],
    queryFn: () => fetchGameStores({ id }),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-6 rounded-lg mt-5">
        <ErrorIndicator
          title="Could not load Stores"
          message={error.message || "An error occurred"}
        />
      </div>
    );
  }

  function handleNavigate(url) {
    window.open(url, "_blank");
  }

  if (data) {
    return (
      <div className="mt-4">
        <ul className="flex flex-wrap gap-2">
          {data.results.length === 0 && (
            <p className="text-lg text-base-content">No Stores Available</p>
          )}
          {data.results.map((store) => (
            <Button
              key={store.store_id}
              className="bg-primary text-primary-content px-3 py-1 rounded-lg"
              href={store.url}
              onClick={() => handleNavigate(store.url)}
            >
              {stores[store.store_id]}
            </Button>
          ))}
        </ul>
      </div>
    );
  }
}
