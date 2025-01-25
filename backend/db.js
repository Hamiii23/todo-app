const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect("mongodb+srv://23hamiid:qYxhuK7nVzs5W6af@cluster0.9t7cf.mongodb.net/");

const todoSchema = new Schema ({
    title: String,
    description: String,
    isComplete: Boolean
});

const todo = mongoose.model('todo', todoSchema);

module.exports = {
    todo
}