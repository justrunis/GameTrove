import { motion } from "framer-motion";

export default function GameReviewCard({ review }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <div className="bg-base-300 shadow-xl rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-success">
              {review.rating}/10
            </span>
          </div>
          <p className="text-sm text-primary font-semibold">
            @{review.user.username}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-base-content italic">{review.review}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">
            Playtime:{" "}
            <span className="font-medium">{review.playTime} hours</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
