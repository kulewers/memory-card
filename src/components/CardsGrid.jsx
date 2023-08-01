export default function CardsGrid({ items, turnHandler }) {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-12 max-w-4xl mx-auto my-auto">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex flex-col"
          onClick={() => turnHandler(item.name)}
        >
          <img src={item.spriteUrl} alt={item.name} />
          <p className="text-center">{item.name}</p>
        </div>
      ))}
    </div>
  );
}
