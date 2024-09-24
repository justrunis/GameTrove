import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchGame } from "../api/http";
import { STALE_TIME } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import { useParams } from "react-router-dom";
import GameImage from "../components/Games/GameImage";
import GameDetails from "../components/Games/GameDetails";
import RatingsSection from "../components/Games/RatingsSection";
import DevelopersSection from "../components/Games/DevelopersSection";
import PlatformsSection from "../components/Games/PlatformsSection";
import StoresSection from "../components/Games/StoresSection";
import TagsSection from "../components/Games/TagsSection";
import MetacriticScoresSection from "../components/Games/MetacriticScoresSection";

export default function Game() {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["game", { id }],
    queryFn: () => fetchGame({ id }),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator error={error} />;
  }

  if (data) {
    document.title = data.name;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-6 bg-base-300 rounded-lg mt-5"
      >
        <h1 className="text-4xl font-bold text-center text-base-content mb-8">
          {data.name}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GameImage
            image={data.background_image}
            rating={data.rating}
            name={data.name}
          />
          <GameDetails
            released={data.released}
            genres={data.genres}
            achievements={data.achievements_count}
            altNames={data.alternative_names}
            esrb={data.esrb_rating}
            website={data.website}
            reddit={data.reddit_url}
            metacritic={data.metacritic_url}
            rating={data.rating}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-base-content mt-8 mb-2">
            Description
          </h2>
          <p className="text-lg text-base-content">
            {data.description_raw || "No Description Available"}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RatingsSection ratings={data.ratings} />
          <DevelopersSection developers={data.developers} />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PlatformsSection platforms={data.platforms} />
          <StoresSection stores={data.stores} />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TagsSection tags={data.tags} />
          <MetacriticScoresSection
            metacriticPlatforms={data.metacritic_platforms}
          />
        </div>
      </motion.div>
    );
  }
}
