const {z} = require('zod');

const todoSchema = z.object({
    title: z.string(),
    description: z.string(),
    isCompleted: z.boolean()
});

module.exports = {
    todoSchema
}