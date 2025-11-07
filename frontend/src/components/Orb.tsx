import { motion } from "motion/react";
import { cn } from "../lib/utils";

export default function Orb({
  delay,
  duration,
  size,
  color,
  x,
  y,
}: {
  delay: number;
  duration: number;
  color: string;
  size: string;
  x: string;
  y: string;
}) {
  return (
    <motion.div
      style={{ width: size, height: size, left: x, top: y }}
      animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.2, 1] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(`absolute rounded-full ${color} blur-3xl opacity-20`)}
    ></motion.div>
  );
}
