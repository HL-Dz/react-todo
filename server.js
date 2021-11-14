const express = require('express');
const http = require('http');
const {v4: uuidv4} = require('uuid');
const app = express();
const fs = require("fs");
const port = 3001;
const jsonParser = express.json();

const filePath = "tasks.json";

// GET ALL TASKS
app.get('/tasks', (req,res) => {
  const content = fs.readFileSync(filePath, "utf8");
  const todos = JSON.parse(content);
  res.send(todos);
});

// ADD NEW TASK
app.post('/tasks', jsonParser, (req,res) => {
  if(!req.body) return res.sendStatus(400);

  const textValue = req.body.text;

   let todo = {
     id: uuidv4(),
     cls: 'task',
     completed: false,
     text: textValue,
   }

   let data = fs.readFileSync(filePath, "utf8");
   let todos = JSON.parse(data);

   todos.push(todo);
   data = JSON.stringify(todos);

   fs.writeFileSync("tasks.json", data);
   res.send(todo);
});

// DELETE TASK
app.delete('/tasks/:id', (req,res) => {
  const id = req.params.id
  let data = fs.readFileSync(filePath, 'utf8');
  let tasks = JSON.parse(data);

  let index = -1;

  for(var i = 0; i < tasks.length; i++) {
    if(tasks[i].id === id) {
      index = i;
      break;
    }
  }
  if(index > -1) {
    const task = tasks.splice(index, 1)[0];
    data = JSON.stringify(tasks);
    fs.writeFileSync('tasks.json', data);
    res.send(task);
  } else {
    res.status(404).send("{}");
  }
})

// UPDATE TASK
app.put('/tasks', jsonParser, (req,res) => {
  if(!req.body) return res.sendStatus(404);

  const taskId = req.body.id;
  // const completedField = req.body.completed;

  let data = fs.readFileSync(filePath, "utf-8");
  const tasks = JSON.parse(data);
  let task;

  for(var i = 0; i < tasks.length; i++) {
    if(tasks[i].id == taskId) {
      task = tasks[i];
      break;
    }
  }

  if(task) {
    task.completed = !task.completed;
    data = JSON.stringify(tasks);
    fs.writeFileSync('tasks.json', data);
    res.send(task);
  } else {
    res.status(404).send(task);
  }
})


const server = http.createServer(app);
server.listen(port, "localhost", () => console.log(`Listening on port ${port} http`));