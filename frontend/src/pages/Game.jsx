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
import GameScreenshotSection from "../components/Games/GameScreenshotSection";
import GameAchievementSection from "../components/Games/GameAchievmentSection";
import GameSeriesSection from "../components/Games/GameSeriesSection";
import Collapsible from "../components/UI/Collapsible";

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
    return (
      <div className="container mx-auto px-4 py-6 rounded-lg mt-5">
        <ErrorIndicator
          title="Could not load Game"
          message={error.message || "An error occurred"}
        />
      </div>
    );
  }

  if (data) {
    console.log(data);
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
        <Collapsible title="Description">
          <p className="text-lg text-base-content mt-4">
            {data.description_raw || "No Description Available"}
          </p>
        </Collapsible>
        <Collapsible title="Game Series">
          <GameSeriesSection id={id} />
        </Collapsible>
        <Collapsible title="Player Ratings">
          <RatingsSection ratings={data.ratings} />
        </Collapsible>
        <Collapsible title="Developers">
          <DevelopersSection developers={data.developers} />
        </Collapsible>
        <Collapsible title="Platforms">
          <PlatformsSection platforms={data.platforms} />
        </Collapsible>
        <Collapsible title="Stores">
          <StoresSection stores={data.stores} id={data.id} />
        </Collapsible>
        <Collapsible title="Tags">
          <TagsSection tags={data.tags} />
        </Collapsible>
        <Collapsible title="Metacritic Scores">
          <MetacriticScoresSection
            metacriticPlatforms={data.metacritic_platforms}
          />
        </Collapsible>
        <div className="flex items-center justify-center">
          <GameScreenshotSection id={id} />
        </div>
        <GameAchievementSection id={id} />
      </motion.div>
    );
  }
}
