import React, { FC, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../hooks/hooks"
import { getAllTasks } from "../../redux/todos-reducer"
import Spinner from "../Spinner/Spinner"
import Task from "../Task/Task"
import "./Tasks.scss"

const Tasks= () => {
  const dispatch = useDispatch()
  const { tasks, isLoading } = useTypedSelector(state => state.todosPage)
  
  const getTasks = () => {
    dispatch(getAllTasks())
  }
  
  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="tasks">
      {isLoading ? <Spinner/> : null}
      {
        tasks.length === 0 ? <div>No tasks...</div> : 
          tasks.map((task)=> <Task key={task._id} {...task}/>)
      }
    </div>
  )
}

export default Tasks