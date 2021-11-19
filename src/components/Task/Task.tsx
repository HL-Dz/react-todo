import React, { FC } from "react"
import "./Task.scss"
import { Button, Checkbox, Typography } from "antd"
import { ITodo } from "../../types/todos"
import { observer } from "mobx-react"
const { Text } = Typography
import todostore from "../../mobx/store"

const Task: FC<ITodo> = observer(({...task}) => {

  const deleteCurrentTask = async (id:string) => {
    todostore.deleteTask(id)
  }
  
  return (
    <div className={task.cls}>
      <Checkbox
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => {todostore.completeTask(task._id, !task.completed)}}
        id="checkbox-elem"
      />
      <Text
        disabled={task.completed}
      >
        <span className="task__text">
          {task.text}
        </span>
      </Text>
      <Button
        className="task__remove"
        onClick={() => {deleteCurrentTask(task._id)}}
        danger={true}
        type="primary"
      >Delete</Button>
    </div>
  )
})

export default Task