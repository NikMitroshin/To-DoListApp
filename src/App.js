import React from 'react';
import './App.css';
import ToDoList from './ToDoList/toDoList.js'
import Header from './Header/header.js';



function App() {
  return (
    <div className="App">
        <Header/>
        <ToDoList/>
    </div>
  );
}

export default App;
