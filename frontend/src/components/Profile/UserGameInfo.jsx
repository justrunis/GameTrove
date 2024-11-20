export default function UserGameInfo({ game }) {
  return (
    <div className="grid grid-cols-1 gap-2 mt-4 text-sm text-base-content">
      <div>
        <span className="font-semibold">Playtime:</span> {game.playTime} hours
      </div>
      <div>
        <span className="font-semibold">Has Beaten:</span>{" "}
        <span
          className={`badge ${
            game.hasBeaten ? "badge-success" : "badge-error"
          }`}
        >
          {game.hasBeaten ? "Yes" : "No"}
        </span>
      </div>
      <div>
        <span className="font-semibold">Rating:</span>{" "}
        <span className="badge badge-primary">{game.rating}/10</span>
      </div>
      <div>
        <span className="font-semibold">Started At:</span>{" "}
        {new Date(game.startedAt).toLocaleDateString()}
      </div>
      <div>
        <span className="font-semibold">Completed At:</span>{" "}
        {new Date(game.completedAt).toLocaleDateString()}
      </div>
      <div>
        <span className="font-semibold">Review:</span> {game.review}
      </div>
    </div>
  );
}
