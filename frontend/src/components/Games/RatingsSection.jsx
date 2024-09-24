import Button from "../UI/Button";
import { makeFirstLetterUpperCase } from "../../utils/formating";

export default function RatingsSection({ ratings }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-base-content mb-2">Ratings</h2>
      <ul className="space-y-1">
        {ratings.length === 0 ? (
          <p className="text-lg text-base-content">No Ratings Available</p>
        ) : (
          ratings.map((rating) => (
            <Button
              key={rating.id}
              className="flex justify-between bg-primary text-primary-content px-3 py-1 rounded-lg w-full"
            >
              <span>{makeFirstLetterUpperCase(rating.title)}</span>
              <span>{rating.percent}%</span>
            </Button>
          ))
        )}
      </ul>
    </div>
  );
}
