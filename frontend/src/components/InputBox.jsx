export default function InputBox({ label, placeholder, type, onChange }) {
  return (
    <div>
      <h2 className="m-1">{label}</h2>
      <input
        onChange={onChange}
        className="border-b-2 border-gray-400 p-3 w-full"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

