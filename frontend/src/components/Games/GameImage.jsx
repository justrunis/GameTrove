export default function GameImage({ image, rating, name }) {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-80 object-cover rounded-lg"
      />
      <div className="absolute top-0 left-0 p-2 bg-accent bg-opacity-80 text-accent-content font-bold rounded-br-lg">
        {rating}
      </div>
    </div>
  );
}
