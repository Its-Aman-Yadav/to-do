const express = require('express');
const app = express();
const path = require("path");
const cors = require('cors');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
const { todo } = require('node:test');
require('dotenv').config()

const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString).then(()=> console.log('Connect to the DB..')).catch((err)=>console.log(err))


app.get('/to-do-app', async(req,res)=> {
    const todos = await Todo.find();
    res.json(todos)
})

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });

app.post('/to-do-app/new', async(req,res)=> {
    const task = await Todo.create(req.body)
    res.status(201).json({task})
})

app.delete('/to-do-app/delete/:id', async(req,res)=>{
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})


app.listen(port, console.log(`server is running on port ${port}`))
