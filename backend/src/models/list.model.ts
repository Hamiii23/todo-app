import mongoose, { Schema } from "mongoose";

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    protected: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export const List = mongoose.model("List", listSchema);
