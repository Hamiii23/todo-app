import { useEffect, useRef, useState } from "react";
import {
  BookIcon,
  BuildingIcon,
  HomeIcon,
  InboxIcon,
  ListIcon,
  NovelIcon,
  PeopleIcon,
  ProjectIcon,
  SearchIcon,
  WorkIcon,
} from "../lib/Icons";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { colorList } from "../lib";

export default function ListPicker({
  openList,
}: {
  openList?: (state: boolean) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const lists = [
    { title: "Inbox", color: "blue", icon: InboxIcon },
    { title: "Home", color: "purple", icon: HomeIcon },
    { title: "University", color: "pink", icon: BuildingIcon },
    { title: "Family", color: "green", icon: PeopleIcon },
    { title: "Books", color: "indigo", icon: BookIcon },
    { title: "Novels", color: "lime", icon: NovelIcon },
    { title: "Work", color: "amber", icon: WorkIcon },
    { title: "Projects", color: "emerald", icon: ProjectIcon },
  ];

  const filteredLists = lists.filter((list) => {
    return list.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn(
        "bg-neutral-50 rounded-2xl shadow-sm ring-1 ring-black/5 p-2",
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="overflow-auto w-full gap-1 flex flex-col"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          maxHeight: "240px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {filteredLists &&
            filteredLists.map((list) => {
              const colorConfig = colorList.find((c) => c.title === list.color);
              const Icon = list.icon;

              return (
                <div
                  className={cn(
                    "p-2 rounded-xl cursor-pointer w-full flex transition-all duration-400",
                    colorConfig?.hover,
                  )}
                  onClick={() => {
                    openList?.(false);
                  }}
                >
                  <div
                    className={cn(
                      "p-2 rounded-xl",
                      colorConfig?.text,
                      colorConfig?.background,
                    )}
                  >
                    <Icon />
                  </div>
                  <div className="p-2">{list.title}</div>
                </div>
              );
            })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {filteredLists.length === 0 && (
            <div
              className="hover:bg-green-200 rounded-xl cursor-pointer w-full flex p-2 transition-all duration-400"
              onClick={() => {
                lists.push({
                  title: searchTerm,
                  color: "green",
                  icon: ListIcon,
                });
                setSearchTerm("");
              }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-100 text-green-700 transition-transform">
                  <ListIcon className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  Create list
                  <span className="ml-1 font-semibold">"{searchTerm}"</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <div className="h-px bg-neutral-300"></div>
      <div className="p-2 flex">
        <div className="m-2">
          <SearchIcon className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="outline-none"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>
    </motion.div>
  );
}
