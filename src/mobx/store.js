import React from "react"
import { observable, action, makeObservable } from "mobx"
import { delay } from "../helpers/helpers"
import { ITodo } from "../types/todos"
import { persist } from "mobx-persist"

let API = "http://localhost:3000"

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
		    const res = await fetch(`${API}/tasks`)
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
		addNewTask = async (text ) => {
		  this.resetError()
		  try {
		    const res = await fetch(`${API}/tasks`, {
		      method: "POST",
		      headers: {
		        "Accept": "application/json",
		        "Content-Type": "application/json"
		      },
		      body: JSON.stringify({
		        text: text
		      })
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
		    const res = await fetch(`/tasks`, {
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
		      let task = await res.json()
		      this.tasks = this.tasks.map(el => {
		        if(el._id !== task._id) {
		          return el
		        } else {
		          return {...el, completed: completed}
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
		    const res = await fetch(`/tasks/${id}`, {
		      method: "DELETE",
		      headers: { "Accept": "application/json" }
		    })
		
		    if(res.status === 200) {
		      const task = await res.json()
		      this.tasks = this.tasks.filter(el => el._id !== task._id)
		    }
		  } catch (err) {
		    this.setError(err)
		  }
		}
}

export default new TodoStore()