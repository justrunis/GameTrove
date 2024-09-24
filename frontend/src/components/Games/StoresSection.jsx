import Button from "../UI/Button";

export default function StoresSection({ stores }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-base-content mb-2">Stores</h2>
      <ul className="flex flex-wrap gap-2">
        {stores.length === 0 && (
          <p className="text-lg text-base-content">No Stores Available</p>
        )}
        {stores.map((store) => (
          <Button
            key={store.store.id}
            className="bg-primary text-primary-content px-3 py-1 rounded-lg"
          >
            {store.store.name}
          </Button>
        ))}
      </ul>
    </div>
  );
}
