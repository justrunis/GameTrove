import Button from "../UI/Button";

export default function TagsSection({ tags }) {
  return (
    <div className="mt-4">
      <ul className="flex flex-wrap gap-2">
        {tags.length === 0 && (
          <p className="text-lg text-base-content">No Tags Available</p>
        )}
        {tags.map((tag) => (
          <Button
            key={tag.id}
            className="bg-primary text-primary-content px-3 py-1 rounded-lg"
          >
            {tag.name}
          </Button>
        ))}
      </ul>
    </div>
  );
}
