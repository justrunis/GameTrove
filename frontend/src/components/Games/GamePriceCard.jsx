import Card from "../UI/Card";
import { motion } from "framer-motion";
import Button from "../UI/Button";
import { CHEAPSHARK_REDIRECT_URL } from "../../utils/constants";

export default function GamePriceCard({
  price,
  className = "w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2",
}) {
  const redirectToStore = (id) => {
    window.open(`${CHEAPSHARK_REDIRECT_URL}${id}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={className}
    >
      <Card className="bg-base-300 p-2 rounded-lg hover:shadow-lg transition-shadow">
        <div className="relative overflow-hidden bg-base-100 rounded-lg">
          <img
            src={price.thumb}
            alt={price.external}
            className="w-full h-48 object-contain"
          />
          <div className="absolute top-0 left-0 p-2 bg-accent bg-opacity-80 text-white font-bold rounded-br-lg">
            {price.cheapest} {"$"}
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 p-2">
          <h2 className="text-lg font-semibold text-base-content">
            {price.external}
          </h2>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => redirectToStore(price.cheapestDealID)}
            className="btn btn-primary my-2"
          >
            View In Store
          </Button>
        </div>
      </Card>{" "}
    </motion.div>
  );
}
