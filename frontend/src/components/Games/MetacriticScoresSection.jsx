import Button from "../UI/Button";

export default function MetacriticScoresSection({ metacriticPlatforms }) {
  return (
    <div className="mt-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metacriticPlatforms.length === 0 && (
          <p className="text-lg text-base-content">
            No Metacritic Scores Available
          </p>
        )}
        {metacriticPlatforms.map((meta) => (
          <Button
            key={meta.platform.slug}
            className="bg-base-300 p-4 rounded-lg flex justify-between items-center"
            onClick={() => window.open(meta.url, "_blank")}
          >
            <span className="text-lg font-medium text-base-content">
              {meta.platform.name}
            </span>
            <span className="bg-accent text-accent-content px-2 py-1 rounded-lg text-sm">
              {meta.metascore}
            </span>
          </Button>
        ))}
      </ul>
    </div>
  );
}
