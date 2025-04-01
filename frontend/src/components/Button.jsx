export default function Button({ label, onClick }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className="shadow shadow-blue-800 py-3 px-16 mt-2 w-full rounded-xl bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        type="button"
      >
        {label}
      </button>
    </div>
  );
}
