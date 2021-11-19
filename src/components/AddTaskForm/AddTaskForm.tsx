import React, { useState } from "react"
import { Button, Input } from "antd"
import "./AddTaskForm.scss"
import { observer } from "mobx-react"
import todostore from "../../mobx/store"

const AddTaskForm = observer(() => {
  const [taskValue, setTaskValue] = useState("")

  const createNewTask = () => {
    if(taskValue.trim()) {
      todostore.addNewTask(taskValue)
      setTaskValue("")
    }
  }

      
  return (
    <div className="todo-form">
      <div className="form">
        <div className="form__wrap">
          <Input 
            placeholder="Add new task..."
            value={taskValue}
            onChange={(e) => {setTaskValue(e.target.value)}}
          />
          <Button type="primary" onClick={createNewTask}>Add task</Button>
        </div>
      </div>
    </div>
  )
})

export default AddTaskForm