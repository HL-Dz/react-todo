import React from "react"
import "./App.scss"
import Todolist from "./components/Todolist/Todolist"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import UploadModule from "./components/UploadModule/UploadModule"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todolist/>}/>
        <Route path="/upload" element={<UploadModule/>}/>
      </Routes>
    </Router>
  )
}

export default App