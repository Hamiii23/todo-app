const express = require('express');
const app = express();
const {todo} = require('./db');
const {todoSchema} = require('./types');

app.get('/todos', (req, res) => {
    res.json({
        message: "Hamii"
    })
});

app.post('/add-todo', (req, res) => {

});

app.put('/update-todo', (req, res) => {
    
})

app.delete('/delete-todo', (req, res ) => {

});

app.listen(3000)