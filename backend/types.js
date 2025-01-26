const {z} = require('zod');

const createTodo = z.object({
    title: z.string(),
    description: z.string(),
});

const completedTodo = z.object({
    _id: z.string()
});

module.exports = {
    createTodo,
    completedTodo
}