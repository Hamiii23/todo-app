import { useRef } from "react";
import { cn } from "../lib/utils";

export function InputBox({
  icon,
  label,
  type,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  placeholder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div
        className={cn(
          "bg-neutral-100 px-8 py-2 rounded-xl border-neutral-200 drop-shadow-sm drop-shadow-neutral-400",
          "flex items-center gap-3",
          "hover:drop-shadow-sm hover:drop-shadow-neutral-400 transition duration-300",
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {icon}
        <div className="h-9 w-px bg-gray-300"></div>
        <div className="flex flex-col">
          <label htmlFor={type} className={cn("text-xs text-neutral-400 mb-1")}>
            {label}
          </label>
          <input
            ref={inputRef}
            id={type}
            type={type}
            placeholder={placeholder}
            className={cn("outline-none bg-transparent text-sm")}
          />
        </div>
      </div>
    </div>
  );
}
