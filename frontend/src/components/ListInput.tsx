import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ColorsIcon,
  EnterIcon,
  IconsIcon,
  ListIcon,
  type IconItem,
} from "../lib/Icons";
import { cn } from "../lib/utils";
import ColorPicker from "./ColorPicker";
import IconsPicker from "./IconsPicker";
import { colorList } from "../lib";

export default function ListInput() {
  const [colorsOpen, setColorsOpen] = useState(false);
  const [iconsOpen, setIconsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IconItem>({
    title: "list",
    icon: ListIcon,
  });
  const [selectedColor, setSelectedColor] = useState("green");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setColorsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [colorsOpen]);

  const items = [
    {
      id: "colors",
      icon: ColorsIcon,
      isOpen: colorsOpen,
      onClick: () => {
        setColorsOpen(!colorsOpen);
        setIconsOpen(false);
      },
    },
    {
      id: "icons",
      icon: IconsIcon,
      isOpen: iconsOpen,
      onClick: () => {
        setIconsOpen(!iconsOpen);
        setColorsOpen(false);
      },
    },
  ];

  const Icon = selectedIcon.icon;
  const colorConfig = colorList.find((c) => c.title === selectedColor);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "p-2 rounded-xl relative w-md bg-neutral-50 shadow-sm",
        "dark:bg-neutral-900 dark:ring-white/10",
      )}
    >
      <div className="flex flex-col">
        <div className="flex">
          <div
            className={cn(
              "my-auto p-2 rounded-lg",
              colorConfig?.text,
              colorConfig?.background,
            )}
          >
            <Icon />
          </div>
          <input
            ref={inputRef}
            type="text"
            className="outline-none px-4 py-2 bg-transparent"
            placeholder="New List"
          />
        </div>
        <div className="flex px-2 py-1 justify-between">
          <div className="flex gap-2">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={item.onClick}
                  className={cn(
                    "p-2 cursor-pointer rounded-xl transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                    item.isOpen &&
                      "bg-blue-100 hover:bg-blue-200 dark:hover:bg-blue-900 dark:bg-blue-800",
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
              );
            })}
            <AnimatePresence>
              {colorsOpen && (
                <div className="bottom-16 absolute left-0">
                  <ColorPicker
                    selectColor={setSelectedColor}
                    colorOpen={setColorsOpen}
                  />
                </div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {iconsOpen && (
                <div className="bottom-16 absolute left-0">
                  <IconsPicker
                    openIcons={setIconsOpen}
                    selectIcon={setSelectedIcon}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
          <div
            className={cn(
              "p-2 cursor-pointer rounded-xl transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
            )}
          >
            <EnterIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
