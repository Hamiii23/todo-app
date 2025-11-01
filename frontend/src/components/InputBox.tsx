import { cn } from "../lib/utils";

export const InputBox = ({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) => {
  return (
    <div className="my-4 flex flex-col gap-8 max-w-sm">
      <div className="flex flex-col gap-2">
        <label htmlFor={label}>{label}</label>
        <input
          id={label}
          type={type}
          className={cn(
            "px-4 py-2 bg-gray-100 shadow-input rounded-lg border-transparent transition duration-300",
            "focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2",
          )}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
