import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../api/http";
import { STALE_TIME } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import UserGames from "../components/Profile/UserGames";
import UserProfileInformation from "../components/Profile/UserProfileInformation";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function Profile() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <ErrorIndicator title="An error has occurred" message={error.message} />
    );
  }

  if (data && !isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6 bg-base-300 p-8 mt-2 rounded-xl shadow-xl w-full"
      >
        <Tabs>
          <TabList className="tabs justify-start">
            <Tab className="tab tab-bordered tab-active">Profile</Tab>
            <Tab className="tab tab-bordered">Games</Tab>
          </TabList>

          <TabPanel>
            <motion.h1
              className="text-4xl font-bold text-base-content text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              Profile Page
            </motion.h1>
            <UserProfileInformation data={data} />
          </TabPanel>

          <TabPanel>
            <motion.h1
              className="text-4xl font-bold text-base-content text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              Played games
            </motion.h1>
            <div className="overflow-y-auto h-full">
              <UserGames />
            </div>
          </TabPanel>
        </Tabs>
      </motion.div>
    );
  }
}
