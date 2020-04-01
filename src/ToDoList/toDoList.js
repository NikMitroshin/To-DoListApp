import React, { useState, useRef } from 'react';
import ToDoItem from './ToDoItem/toDoItem.js';
import ToDoListData from './ToDoItem/toDoListData.js';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


const ToDoList = () => {

  let initTasks = JSON.parse(localStorage.getItem('tasks')) || ToDoListData;

  const [toDoItems, setToDoItems] = useState(initTasks); // состояние списка заданий
  const [maxIdOfTask, setMaxId] = useState((initTasks[[...initTasks].length-1].id) + 1); // состояние для последнего айду новому заданию
  const [inputValue, setInputValue] = useState(''); // состояние инпута нового задания
  const [classAddBtn, setClassAddBtn] = useState('block-create__btn'); // состояние инпута нового задания
  const inputRef = useRef(); // привязка к инпуту в ДОМ дереве

    const handleChange = id => { // выполнение задания
      const newToDos = toDoItems.map(item => item.id === id ? {...item, completed: !item.completed} : item);
      putNewToDoList(newToDos);
    }
    const deleteTask = id => { 
      // удаление задания
      const newToDos = toDoItems.filter(item => item.id !== id);
      putNewToDoList(newToDos);
      // const deleteTaskDelay = () =>{
      //   putNewToDoList(newToDos);
      // }
      // setTimeout(deleteTaskDelay, 2000); 
      // djDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
      
    }

    const putNewToDoList = (newList) => { // закидывание нового листа в состояние и локалСтор
      setToDoItems(newList);
      localStorage.setItem('tasks', JSON.stringify(newList));
    }
 

    const handleInput = () => { // сохраняю значение в инпуте
      const value = inputRef.current.value;
      setInputValue(value);
    }


    const delayClassAddBtn = () => { //на три секунды добавляю класс
      setClassAddBtn('block-create__btn');
    }

    const checkInput = () =>{
      if (inputValue.length > 3) {
        setClassAddBtn('block-create__btn btn-active');
        addNewTask();
        inputRef.current.style.borderColor = '#4967a8';
      } else {
        setClassAddBtn('block-create__btn btn-active-error');
        inputRef.current.style.borderColor = 'red';
      }
      setTimeout(delayClassAddBtn, 3000);
    }

    const addNewTask = () => { // передаю значение в инпуте в ЛокалСторад
      const newToDos = [...toDoItems, 
        {
          id: maxIdOfTask,
          completed: false,
          text: inputValue
        }]
      setMaxId(maxIdOfTask+1)
      localStorage.setItem('tasks', JSON.stringify(newToDos));
      setToDoItems(newToDos);
      setInputValue('');
    }

    let activeTasks = toDoItems.filter(task => task.completed === false); // собрать невыполненные
    let completedTasks = toDoItems.filter(task => task.completed === true); // собрать выполненные

    let finalTasks = [...activeTasks,...completedTasks].map( item =>{

      return (
        <CSSTransition
            classNames = {'item'}
            timeout={800}
            key = {item.id}
        >
          <ToDoItem
          id = {item.id}
          description = {item.text}
          completed = {item.completed}
          handleChange = { () => handleChange(item.id)}
          deleteTask = {() => deleteTask(item.id)}
          />
        </CSSTransition>
      )
    })
    return (
      <section className="block-wrapper">
        <div className="block-create">
          <input className="block-create__input" id='inputNewTask' type="text" onChange={handleInput} ref={inputRef} value={inputValue} placeholder="Введите задание"/>
            <button className={classAddBtn} onClick ={checkInput}><i className="fas fa-plus"></i></button>
        </div>
        <hr className="line"/>
        <TransitionGroup component="ul" className="box-list">
          {finalTasks}
        </TransitionGroup>
      </section>
    );
  }
  
  export default ToDoList; 
  