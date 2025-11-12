import { useEffect } from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { cn } from "../lib/utils";
import TodoInput from "../components/TodoInput";

export default function Dashboard() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div
      className={cn(
        "bg-neutral-50 h-screen w-full text-neutral-950 flex justify-center",
        "dark:bg-neutral-950 dark:text-neutral-50",
      )}
    >
      <ThemeSwitcher />
      <div className="absolute bottom-2">
        <TodoInput />
      </div>
    </div>
  );
}
