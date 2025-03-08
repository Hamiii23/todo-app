import mongoose, { Schema } from 'mongoose';

const listSchema = new Schema(
    {
        name: {

        },
        todos: [
            {
                type: Schema.Types.ObjectId,
                ref: "Todo"
            }
        ]
    }
);

export const List = mongoose.model("List", listSchema);