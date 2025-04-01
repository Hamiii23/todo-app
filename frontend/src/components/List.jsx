export default function List({ name, onClick }) {
  return (
    <div
      className="m-2 cursor-pointer shadow-sm rounded-xl px-6 text-sky-500 font-bold py-4 flex justify-start hover:shadow-md"
      onClick={onClick}
    >
      <h3>{name}</h3>
    </div>
  );
}
