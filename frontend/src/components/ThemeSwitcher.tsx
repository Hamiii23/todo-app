import { MoonIcon, SunIcon } from "../lib/Icons";
import { cn } from "../lib/utils";

export default function ThemeSwitcher({
  toggleTheme,
}: {
  toggleTheme: () => void;
}) {
  return (
    <div>
      <div
        onClick={toggleTheme}
        className={cn(
          "absolute top-4 right-4 border-gray-300 border-2 p-1 rounded-xl cursor-pointer",
          "transition-all duration-500 ease-in-out",
          "opacity-0 rotate-180 scale-0",
          "dark:opacity-100 dark:rotate-0 dark:scale-100 dark:text-neutral-100 dark:border-neutral-700",
        )}
      >
        <SunIcon />
      </div>
      <div
        onClick={toggleTheme}
        className={cn(
          "absolute top-4 right-4 border-gray-300 border-2 p-1 rounded-xl cursor-pointer",
          "transition-all duration-500 ease-in-out",
          "opacity-100 rotate-0 scale-100",
          "dark:opacity-0 dark:rotate-180 dark:scale-0",
        )}
      >
        <MoonIcon />
      </div>
    </div>
  );
}
