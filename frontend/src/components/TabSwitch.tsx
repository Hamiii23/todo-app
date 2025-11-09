import { motion } from "motion/react";
import { cn } from "../lib/utils";

export interface Tab {
  id: string;
  label: string;
}

interface TabSwitchProps {
  tabs: Tab[];
  activeTab: string;
  switchTab: (id: string) => void;
}

export default function TabSwitch({
  tabs,
  activeTab: defaultTab,
  switchTab: onChange,
}: TabSwitchProps) {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 flex p-1 gap-2 rounded-xl relative">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="py-2 px-6 rounded-xl cursor-pointer w-full text-center relative z-10"
        >
          {defaultTab === tab.id && (
            <motion.div
              layoutId="active-tab"
              layout="position"
              className="absolute inset-0 bg-neutral-50 rounded-xl z-[-1] select-none dark:bg-neutral-900"
              transition={{
                type: "tween",
                stiffness: 400,
                damping: 40,
                mass: 0.8,
              }}
              style={{ willChange: "transform" }}
            />
          )}
          <span
            className={cn(
              "transition-colors duration-200",
              defaultTab === tab.id
                ? "text-neutral-900 dark:text-neutral-100"
                : "text-neutral-600 dark:text-neutral-400",
            )}
          >
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  );
}
