import Button from "../UI/Button";

export default function PlatformsSection({ platforms }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-base-content mb-2">Platforms</h2>
      <ul className="flex flex-wrap gap-2">
        {platforms.length === 0 && (
          <p className="text-lg text-base-content">No Platforms Available</p>
        )}
        {platforms.map((platform) => (
          <Button
            key={platform.platform.id}
            className="bg-primary text-primary-content px-3 py-1 rounded-lg"
          >
            {platform.platform.name}
          </Button>
        ))}
      </ul>
    </div>
  );
}
