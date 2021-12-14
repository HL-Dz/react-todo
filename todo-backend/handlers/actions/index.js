const { getAllTasks } = require("./getAllTasks")
const { addTask } = require("./addTask")
const { updateTask } = require("./updateTask")
const { deleteTask } = require("./deleteTask")

module.exports = {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask
}