export const Button = ({
  icon,
  label,
}: {
  icon?: React.ReactNode;
  label: string;
}) => {
  return (
    <button className="flex gap-2 justify-center cursor-pointer py-2 px-4 bg-blue-400 rounded-lg items-center text-white w-30 transition duration-300">
      {icon}
      <span className="font-mono text-sm">{label}</span>
    </button>
  );
};
