import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ColorsIcon,
  EnterIcon,
  IconsIcon,
  ListIcon,
  NoteIcon,
  TimeIcon,
} from "../lib/Icons";
import { cn } from "../lib/utils";
import ListPicker from "./ListPicker";
import ColorPicker from "./ColorPicker";
import IconsPicker from "./IconsPicker";

export default function TodoInput() {
  const [listOpen, setListOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [colorsOpen, setColorsOpen] = useState(false);
  const [iconsOpen, setIconsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setListOpen(false);
        setColorsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [listOpen, colorsOpen]);

  const items = [
    {
      id: "lists",
      icon: ListIcon,
      isOpen: listOpen,
      onClick: () => {
        setListOpen(!listOpen);
        setColorsOpen(false);
        setIconsOpen(false);
      },
    },
    {
      id: "time",
      icon: TimeIcon,
      isOpen: timeOpen,
      onClick: () => setTimeOpen(!timeOpen),
    },
    {
      id: "note",
      icon: NoteIcon,
      isOpen: noteOpen,
      onClick: () => setNoteOpen(!noteOpen),
    },
    {
      id: "colors",
      icon: ColorsIcon,
      isOpen: colorsOpen,
      onClick: () => {
        setColorsOpen(!colorsOpen);
        setListOpen(false);
        setIconsOpen(false);
      },
    },
    {
      id: "icons",
      icon: IconsIcon,
      isOpen: iconsOpen,
      onClick: () => {
        setIconsOpen(!iconsOpen);
        setListOpen(false);
        setColorsOpen(false);
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "p-2 rounded-xl relative w-md bg-neutral-50 shadow-sm ring-1 ring-black/5",
        "dark:bg-neutral-900 dark:ring-white/10",
      )}
    >
      <div className="flex flex-col">
        <input
          ref={inputRef}
          type="text"
          className={cn(
            "outline-none px-4 py-2 bg-transparent",
            "text-neutral-900 dark:text-neutral-100",
            "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
          )}
          placeholder="I'm going to..."
        />
        <AnimatePresence>
          {noteOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={cn(
                "flex px-3 py-1 text-sm bg-transparent",
                "text-neutral-900 dark:text-neutral-100",
                "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
              )}
            >
              <NoteIcon
                color="text-neutral-600 dark:text-neutral-400"
                className="w-5 h-5"
              />
              <input
                type="text"
                className="outline-none px-2 text-sm"
                placeholder="Note"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex px-2 py-1 justify-between">
          <div className="flex gap-2">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={item.onClick}
                  className={cn(
                    "p-2 cursor-pointer rounded-xl transition-all duration-300 hover:bg-neutral-100",
                    "dark:hover:bg-neutral-800",
                    item.isOpen &&
                      "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/40",
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
              );
            })}
            <AnimatePresence>
              {listOpen && (
                <div className="bottom-16 absolute left-0">
                  <ListPicker openList={setListOpen} />
                </div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {colorsOpen && (
                <div className="bottom-16 absolute left-0">
                  <ColorPicker />
                </div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {iconsOpen && (
                <div className="bottom-16 absolute left-0">
                  <IconsPicker openIcons={setIconsOpen} />
                </div>
              )}
            </AnimatePresence>
          </div>
          <div
            className={cn(
              "p-2 cursor-pointer rounded-xl transition-all duration-300 hover:bg-neutral-100",
              "dark:hover:bg-neutral-800",
            )}
          >
            <EnterIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
