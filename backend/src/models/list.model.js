import mongoose, { Schema } from 'mongoose';

const listSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        todos: [
            {
                type: Schema.Types.ObjectId,
                ref: "Todo"
            }
        ],
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
);

export const List = mongoose.model("List", listSchema);