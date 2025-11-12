import { useEffect, useState } from "react";
import { colorList } from "../lib";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export default function ColorPicker() {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(colorList.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentColors = colorList.slice(startIndex, endIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else if (e.key === "ArrowRight" && currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn(
        "bg-neutral-50 rounded-2xl shadow-sm ring-1 ring-black/5 p-2",
      )}
    >
      <div
        className="w-full p-1 gap-1 flex flex-col"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          maxHeight: "240px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-1">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center transition-all",
              "bg-neutral-200 hover:bg-neutral-300",
              currentPage === 0 &&
                "opacity-30 cursor-not-allowed hover:bg-neutral-200",
            )}
          >
            ←
          </button>

          <span className="text-xs text-neutral-500 font-medium">
            {currentPage + 1} / {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
            }
            disabled={currentPage === totalPages - 1}
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center transition-all",
              "bg-neutral-200 hover:bg-neutral-300",
              currentPage === totalPages - 1 &&
                "opacity-30 cursor-not-allowed hover:bg-neutral-200",
            )}
          >
            →
          </button>
        </div>
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-4 gap-2"
        >
          {currentColors.map((color, idx) => (
            <div
              key={idx}
              className={cn(
                color.altBackground,
                color.altHover,
                "w-8 h-8 rounded-full cursor-pointer transition-all duration-500",
              )}
            ></div>
          ))}
        </motion.div>
        <div className="flex justify-center gap-1.5 mt-1">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                currentPage === idx ? "bg-neutral-600 w-4" : "bg-neutral-300",
              )}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
