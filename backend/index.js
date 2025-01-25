const express = require('express');
const app = express();
const {todo} = require('./db');
const {todoSchema} = require('./types');

app.get('/todos', (req, res) => {
    res.json({
        message: "Hamii"
    })
});

app.listen(3000)