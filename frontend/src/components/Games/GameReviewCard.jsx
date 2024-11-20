import { motion } from "framer-motion";
import Card from "../UI/Card";

export default function GameReviewCard({ review }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Card className="bg-base-300 shadow-lg rounded-lg p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-success">
              {review.rating} / 10
            </span>
          </div>
          <p className="text-sm text-base-content font-medium">
            {review.user.username}
          </p>
        </div>
        <p className="text-sm text-base-content">{review.review}</p>
        <p className="text-xs text-gray-500">
          Playtime: {review.playTime} hours
        </p>
      </Card>
    </motion.div>
  );
}
