const express = require('express');
const app = express();
const {todo} = require('./db');
const {createTodo, completedTodo} = require('./types');
app.use(express.json())

app.get('/get-todos', async (req, res) => {
    const response = await todo.find();
    res.json(response)
});

app.post('/add-todo', async (req, res) => {
    const userTodo = req.body;
    const parsedTodo = createTodo.safeParse(userTodo);
    if(!parsedTodo.success) {
        res.status(411).json({
            msg: "wrong inputs"
        })
        return;
    }

    await todo.create({
        title: userTodo.title,
        description: userTodo.description,
        isComplete: false
    })
    res.json({
        msg: "todo created"
    })
});

app.put('/completed-todo', async(req, res) => {
    const completed = req.body.id;
    const parsedTodo = completedTodo.safeParse(completed);
    if(!parsedTodo.success) {
        res.status(411).json({
            msg: "wrong inputs"
        })
        return;
    }
    
    await todo.updateOne({
        _id: req.body.id
    }, {
        isComplete: true
    })

    res.json({
        msg: "todo marked as done"
    })

})

app.delete('/delete-todo', async (req, res ) => {
    const deleteTodo = req.body;
    const parsedTodo = completedTodo.safeParse(deleteTodo);

    if(!parsedTodo.success) {
        res.status(411).json({
            msg: "wrong inputs"
        })

        return;
    }

    await todo.deleteOne({
        _id: req.body._id
    })

    res.json({
        msg: "todo deleted"
    })
});

app.listen(3000)