import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../api/http";
import { STALE_TIME } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
} from "react-icons/fa";

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
        className="flex flex-col gap-6 bg-base-300 p-8 rounded-xl shadow-xl w-full max-w-3xl"
      >
        <motion.h1
          className="text-4xl font-bold text-base-content text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          Profile Page
        </motion.h1>

        <motion.div
          className="flex flex-col gap-4 text-lg font-semibold text-base-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <FaUser className="text-primary text-xl" />
            <p>Username: {data.username}</p>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <FaEnvelope className="text-primary text-xl" />
            <p>Email: {data.email}</p>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <FaUserShield className="text-primary text-xl" />
            <p>Role: {data.role}</p>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <FaCalendarAlt className="text-primary text-xl" />
            <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <FaCalendarAlt className="text-primary text-xl" />
            <p>Updated At: {new Date(data.updatedAt).toLocaleString()}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
}
