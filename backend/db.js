require('dotenv').config()
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.DATABASE_URL);

const todoSchema = new Schema ({
    title: String,
    description: String,
    isComplete: Boolean
});

const todo = mongoose.model('todo', todoSchema);

module.exports = {
    todo
}