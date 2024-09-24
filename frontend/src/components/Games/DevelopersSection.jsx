import Button from "../UI/Button";

export default function DevelopersSection({ developers }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-base-content mb-2">Developers</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {developers.length === 0 ? (
          <p className="text-lg text-base-content">No Developers Available</p>
        ) : (
          developers.map((developer) => (
            <Button
              key={developer.id}
              className="flex justify-between bg-primary text-primary-content px-3 py-1 rounded-lg w-full"
            >
              <span>{developer.name}</span>
            </Button>
          ))
        )}
      </ul>
    </div>
  );
}
