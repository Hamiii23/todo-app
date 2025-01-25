const {zod} = require('zod');

const todoSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    isCompleted: zod.boolean()
});

module.exports = {
    todoSchema
}