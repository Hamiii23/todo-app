export default function TodoCard({ todo, onClick }) {
  return (
    <div className="flex h-48 py-4 items-center px-10 m-2 shadow-md bg-white rounded-xl cursor-pointer">
      <input
        type="checkbox"
        className="my-2 mx-5 p-2"
        name={todo.title}
        id={todo._id}
      />
      <div onClick={onClick}>
        <h2 className="text-xl">{todo.title}</h2>
        <h3>{todo.listName}</h3>
        <div className="flex"></div>
      </div>
    </div>
  );
}
