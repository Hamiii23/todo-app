import { cn } from "../lib/utils";

export const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-blue-500 px-8 py-4 text-white text-center rounded-xl cursor-pointer",
        "hover:bg-blue-600 transition duration-300",
        "active:scale-105",
      )}
    >
      {children}
    </div>
  );
};
