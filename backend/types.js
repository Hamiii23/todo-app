import { z } from "zod";

const createTodo = z.object({
  title: z.string(),
  description: z.string(),
});

const completedTodo = z.object({
  _id: z.string(),
});

const updateTodo = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
});

export { createTodo, completedTodo, updateTodo };
