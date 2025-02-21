import "dotenv/config";
import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.DATABASE_URL);

const todoSchema = new Schema({
  title: String,
  description: String,
  isComplete: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

export { Todo };
