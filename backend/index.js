const express = require('express');
const app = express();
const {todo} = require('./db');
const {createTodo, updateTodo} = require('./types');
app.use(express.json())

app.get('/get-todos', async (req, res) => {
    const response = await todo.find();
    res.json(response)
});

app.post('/add-todo', async (req, res) => {
    const userTodo = req.body;
    const parsedTodo = createTodo.safeParse(userTodo);
    if(!parsedTodo.success) {
        res.json({
            error: "wrong inputs"
        })
        return;
    }else {
        await todo.create({
            title: userTodo.title,
            description: userTodo.description,
            isComplete: false
        })
        res.json({
            msg: "todo created"
        })
    }
});

app.put('/update-todo', (req, res) => {
    
})

app.delete('/delete-todo', (req, res ) => {

});

app.listen(3000)