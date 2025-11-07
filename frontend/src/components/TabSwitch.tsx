import { useState } from "react";
import { cn } from "../lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface TabSwitchProps {
  tabs: Tab[];
  defaultTab?: string;
}

export default function TabSwitch({ tabs, defaultTab }: TabSwitchProps) {
  const [active, setActive] = useState(defaultTab || tabs[0].id);

  return (
    <div className="bg-neutral-200 flex p-1 gap-2 rounded-xl">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActive(tab.id)}
          className={cn(
            "py-2 px-6 rounded-xl cursor-pointer transition-colors duration-700 w-full text-center",
            active === tab.id ? "bg-neutral-50" : "bg-neutral-200",
          )}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}
