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
    isDone: {
      type: Boolean,
      default: false
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List"
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
  },
);

export const Todo = mongoose.model("Todo", todoSchema);
