const express = require("express")
const http = require("http")
const app = express()
const mongoose = require("mongoose")
const port = 5000
const jsonParser = express.json()

const Schema = mongoose.Schema
const todoScheme = new Schema(
  { cls: String, text: String, completed: Boolean },
  { versionKey: false }
)
const Todo = mongoose.model("Todo", todoScheme)

mongoose.connect(
  "mongodb://localhost:27017/todosdb",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) return console.log(err)
    const server = http.createServer(app)
    server.listen(port, () =>
      console.log(`Listening on port ${port} http`)
    )
  }
)

// GET ALL TASKS
app.get("/tasks", async (req, res) => {
  try {
    const todos = await Todo.find({})
    res.status(200).json(todos)
  } catch (error) {
    res.status(500)
  }
})

// ADD NEW TASK
app.post("/tasks", jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const textValue = req.body.text
  const todo = new Todo({
    cls: "task",
    completed: false,
    text: textValue,
  })

  todo.save((err) => {
    if (err) return console.log(err)
    res.send(todo)
  })
})

// DELETE TASK
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id
  Todo.findByIdAndDelete(id, (err, todo) => {
    if (err) return console.log(err)

    res.send(todo)
  })
})

// UPDATE TASK
app.put("/tasks", jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(404)
  const taskId = req.body.id
  const newCompleted = req.body.completed
  Todo.findOneAndUpdate(
    { _id: taskId },
    { $set: { completed: newCompleted } },
    (err, todo) => {
      if (err) console.log(err)
      res.send(todo)
    }
  )
})
