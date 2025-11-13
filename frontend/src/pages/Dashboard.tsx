import { useEffect, useState } from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { cn } from "../lib/utils";
import TodoInput from "../components/TodoInput";
import { PlusIcon } from "../lib/Icons";

export default function Dashboard() {
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAddingTodo(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAddingTodo]);

  return (
    <div
      className={cn(
        "bg-neutral-50 h-screen w-full text-neutral-950 flex justify-center",
        "dark:bg-neutral-950 dark:text-neutral-50",
      )}
    >
      <ThemeSwitcher />
      <div className="absolute bottom-6">
        {isAddingTodo ? (
          <div>
            <TodoInput />
          </div>
        ) : (
          <div
            onClick={() => setIsAddingTodo(true)}
            className={cn(
              "bg-blue-400 p-5 rounded-2xl cursor-pointer",
              "hover:bg-blue-500 transition-all duration-400 text-neutral-50 active:scale-105",
            )}
          >
            <PlusIcon />
          </div>
        )}
      </div>
    </div>
  );
}
