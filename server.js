const express = require('express');
const http = require('http');
const {v4: uuidv4} = require('uuid');
const app = express();
const fs = require("fs");
const port = 3001;
const jsonParser = express.json();

const filePath = "./tasks.json";

// GET ALL TASKS
app.get('/tasks', (req,res) => {
  const content = fs.readFileSync(filePath, "utf8");
  const todos = JSON.parse(content);
  res.send(todos);
});

// app.post('/tasks', jsonParser, (req,res) => {
//   if(!req.body) return res.sendStatus(400);
//    let todo = {
//      cls: req.body.cls,
//      completed: req.body.completed,
//      text: req.body.text,
//      id: uuidv4()
//    }

//    let data = fs.readFileSync(filePath, "utf8");
//    let todos = JSON.parse(data);

//    todos.push(todo);
//    data = JSON.stringify(todos);

//    fs.writeFileSync("todos.json", data);
//    res.send(todo);
// })

const server = http.createServer(app);
server.listen(port, "localhost", () => console.log(`Listening on port ${port} http`));