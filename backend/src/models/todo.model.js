import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Todo = mongoose.model("Todo", todoSchema);
