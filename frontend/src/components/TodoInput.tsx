import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  ColorsIcon,
  ListIcon,
  NoteIcon,
  TickIcon,
  TimeIcon,
} from "../lib/Icons";
import { cn } from "../lib/utils";
import ListPicker from "./ListPicker";
import ColorPicker from "./ColorPicker";

export default function TodoInput() {
  const [listOpen, setListOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [colorsOpen, setColorsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setColorsOpen(false);
        setListOpen(false);
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
      },
    },
  ];

  return (
    <div className="p-2 rounded-xl relative w-md bg-neutral-50 shadow-sm ring-1 ring-black/5">
      <div className="flex flex-col">
        <input
          type="text"
          className="outline-none px-4 py-2"
          placeholder="I'm going to..."
        />
        {noteOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex px-3 py-1"
          >
            <NoteIcon color="text-neutral-600" className="w-5 h-5" />
            <input
              type="text"
              className="outline-none px-2 text-sm"
              placeholder="Note"
            />
          </motion.div>
        )}
        <div className="flex gap-2 px-2 py-1">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={item.onClick}
                className={cn(
                  "p-2 cursor-pointer rounded-xl transition-all duration-300 hover:bg-neutral-100",
                  item.isOpen && "bg-blue-100 hover:bg-blue-200",
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
            );
          })}
          {listOpen && (
            <div className="bottom-16 absolute left-0">
              <ListPicker openList={setListOpen} />
            </div>
          )}
          {colorsOpen && (
            <div className="bottom-16 absolute left-0">
              <ColorPicker />
            </div>
          )}
          <div className="absolute right-3 top-5">
            <TickIcon
              className="cursor-pointer w-8 h-8"
              color="text-blue-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
