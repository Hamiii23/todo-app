export default function ShowTodo({ title, description, dueDate }) {
  return (
    <div>
      <div>
        <h6>{title}</h6>
        <p>{description}</p>
        <p> {new Date(dueDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

