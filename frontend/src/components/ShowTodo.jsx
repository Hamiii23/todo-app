import Card from "./Card";

export default function ShowTodo({ title, description, dueDate }) {
  return (
    <div>
      <Card>
        <h6>Call Sizu</h6>
        <p>Call Sizu from at 7</p>
        <p> {new Date(Date.now()).toLocaleDateString()}</p>
      </Card>
    </div>
  );
}
