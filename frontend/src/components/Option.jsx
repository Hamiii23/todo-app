export default function Option({ icon, label, onClick }) {
  return (
    <div
      className="flex mt-2 hover:bg-gray-200 cursor-pointer bg-gray-100 p-2 rounded-2xl"
      onClick={onClick}
    >
      <div className="pr-4">{icon}</div>
      <div>{label}</div>
    </div>
  );
}
