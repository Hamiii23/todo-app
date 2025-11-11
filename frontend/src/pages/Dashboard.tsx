import ThemeSwitcher from "../components/ThemeSwitcher";
import { cn } from "../lib/utils";

export default function Dashboard() {
  return (
    <div
      className={cn(
        "bg-neutral-50 h-screen w-full text-neutral-950",
        "dark:bg-neutral-950 dark:text-neutral-50",
      )}
    >
      App
      <ThemeSwitcher />
    </div>
  );
}
