export default function InputBox({
  label,
  placeholder,
  type,
  onChange,
  value,
  disabled,
}) {
  return (
    <div>
      <h2 className="m-1 font-bold">{label}</h2>
      <input
        onChange={onChange}
        className="border-b-2 border-gray-400 p-3 w-full"
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled || false}
      />
    </div>
  );
}
