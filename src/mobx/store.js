import React from "react"
import { observable, action, makeObservable } from "mobx"
import { delay } from "../helpers/helpers"
import { v4 as uuidv4 } from "uuid"

let API = process.env.REACT_APP_TODO

class TodoStore {
		tasks = []
		isLoading = false
		isError = false
		errMessage = ""

		constructor(){
		  makeObservable(this, {
		    tasks: observable,
		    isLoading: observable,
		    isError: observable,
		    getAllTaks: action,
		    addNewTask: action,
		    completeTask: action,
		    deleteTask: action,
		    resetError: action,
		    setError: action 
		  })
		}

		setError = (err ) => {
		  this.isError = true
		  this.errMessage = err.message
		}
		resetError = () => {
		  this.isError = false
		  this.isError = false
		}
		
		getAllTaks = async () => {
		  this.isLoading = true
		  this.resetError()
		  await delay(500)
		  try {
		    const res = await fetch(`${API}`)
		    if(res.status === 200) {
		      const tasks = await res.json()
		      this.tasks = tasks
		    }
		    this.isLoading = false
		  } catch (err) {
		    this.setError(err)
		    this.isLoading = false
		  }
		}
		addNewTask = async (text) => {
		  let todo = {
		    cls: "task",
		    id: uuidv4(),
		    text: text,
		    completed: false
		  }
		  this.resetError()
		  try {
		    const res = await fetch(`${API}`, {
		      method: "POST",
		      headers: {
		        "Accept": "application/json",
		        "Content-Type": "application/json"
		      },
		      body: JSON.stringify(todo)
		    })
		    if(res.status === 200) {
		      const task = await res.json()
		      this.tasks.push(task)
		    }
		  } catch (err) {
		    this.setError(err)
		  }
		}
		completeTask = async (id , completed) =>{
		  this.resetError()
		  try {
		    const res = await fetch(`${API}`, {
		      method: "PUT",
		      headers: {
		        "Accept": "application/json",
		        "Content-Type": "application/json"
		      },
		      body: JSON.stringify({
		        id: id,
		        completed: completed
		      })
		    })
		    if(res.status === 200) {
		      let taskUpd = await res.json()
		      taskUpd = JSON.parse(taskUpd)
		      this.tasks = this.tasks.map(el => {
		        if(el.id !== taskUpd.id) {
		          return el
		        } else {
		          return {...el, completed: taskUpd.completed}
		        }
		      })
		    }
		  } catch (err) {
		    this.setError(err)
		  }
		}
		deleteTask = async (id) => {
		  this.resetError()
		  try {
		    const res = await fetch(`${API}`, {
		      method: "DELETE",
		      headers: {
		        "Accept": "application/json",
		        "Content-Type": "application/json"
		      },
		      body: JSON.stringify({id})
		    })
		
		    if(res.status === 200) {
		      const id = await res.json()
		      this.tasks = this.tasks.filter(el => el.id !== id)
		    }
		  } catch (err) {
		    this.setError(err)
		  }
		}
}

export default new TodoStore()