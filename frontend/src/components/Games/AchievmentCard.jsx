import { motion } from "framer-motion";
import Card from "../UI/Card";

export default function AchievmentCard({ achievement }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Card className="flex justify-between bg-base-300 p-4 rounded-lg">
        <div>
          <h2 className="text-md font-bold text-base-content">
            {achievement.name}
          </h2>
          <p className="text-sm text-base-content">{achievement.description}</p>
        </div>
        <img src={achievement.image} alt="achievement" className="w-16 h-16" />
      </Card>
    </motion.div>
  );
}
