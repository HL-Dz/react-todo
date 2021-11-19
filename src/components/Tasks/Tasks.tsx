import { observer } from "mobx-react"
import React, { useEffect } from "react"
import Spinner from "../Spinner/Spinner"
import Task from "../Task/Task"
import "./Tasks.scss"
import todostore from "../../mobx/store"

const Tasks= observer(() => {
  const { isLoading, tasks, getAllTaks} = todostore
  
  useEffect(() => {
    getAllTaks()
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
})

export default Tasks