import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
} from "react-icons/fa";

export default function UserProfileInformation({ data }) {
  return (
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
  );
}
