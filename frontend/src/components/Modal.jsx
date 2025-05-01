export default function Modal() {
  return (
    <div className="h-48 w-72 bg-white rounded-xl shadow-2xl">
      <h3>Are you sure you want to delete this?</h3>
      <div>
        <div className="w-36 h-12">Yes</div>
        <div className="w-36 h-12">No</div>
      </div>
    </div>
  );
}
