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
    <div className="bg-neutral-200 flex p-1 gap-2 rounded-xl relative">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="py-2 px-6 rounded-xl cursor-pointer w-full text-center relative z-10"
        >
          {defaultTab === tab.id && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 bg-neutral-50 rounded-xl z-[-1]"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
          <span
            className={cn(
              "transition-colors duration-200",
              defaultTab === tab.id ? "text-neutral-900" : "text-neutral-600",
            )}
          >
            {tab.label}
          </span>
        </div>
      ))}
    </div>
  );
}
