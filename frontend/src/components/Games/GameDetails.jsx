export default function GameDetails({
  released,
  genres,
  achievements,
  altNames,
  esrb,
  website,
  reddit,
  metacritic,
  rating,
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg text-base-content">
        <strong>Released:</strong> {released}
      </p>
      <p className="text-lg text-base-content">
        <strong>Genres:</strong> {genres.map((genre) => genre.name).join(", ")}
      </p>
      <p className="text-lg text-base-content">
        <strong>Achievement Count:</strong> {achievements}
      </p>
      <p className="text-lg text-base-content">
        <strong>Alternate Names:</strong> {altNames.join(", ")}
      </p>
      <p className="text-lg text-base-content">
        <strong>ESRB Rating:</strong> {esrb ? esrb.name : "Not Rated"}
      </p>
      <p className="text-lg text-base-content">
        <strong>Rating:</strong> {rating ? `${rating}/5` : "Not Rated"}
      </p>
      <div className="text-lg text-base-content">
        <strong className="inline">Links:</strong>
        <ul className="inline-flex flex-wrap gap-2 ml-2">
          <li>
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:text-primary hover:underline"
            >
              Official Website
            </a>
          </li>
          {reddit && (
            <li>
              <a
                href={reddit}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:text-primary hover:underline"
              >
                Reddit
              </a>
            </li>
          )}
          {metacritic && (
            <li>
              <a
                href={metacritic}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:text-primary hover:underline"
              >
                Metacritic
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
