import Button from "../UI/Button";

export default function DevelopersSection({ developers }) {
  return (
    <div className="mt-4">
      <ul className="flex flex-wrap gap-2">
        {developers.length === 0 ? (
          <p className="text-lg text-base-content">No Developers Available</p>
        ) : (
          developers.map((developer) => (
            <Button
              key={developer.id}
              className="flex justify-start items-start bg-primary text-primary-content px-3 py-1 rounded-lg"
            >
              <span>{developer.name}</span>
            </Button>
          ))
        )}
      </ul>
    </div>
  );
}
