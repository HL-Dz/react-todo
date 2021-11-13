import React from 'react';
import './App.scss';
import Todolist from './components/Todolist/Todolist';

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <Todolist/>
      </div>
    </div>
  )
}

export default App;