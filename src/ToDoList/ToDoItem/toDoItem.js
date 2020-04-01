import React from 'react';

const ToDoItem = props => {
    return (
        <li className="box-list-item"> 
        <div className="checkbox">
            <input className="box-list-item__input" 
                type="checkbox" 
                id={props.id}
                defaultChecked={props.completed} 
                onChange={props.handleChange}/>
            <label htmlFor={props.id} className="checkbox-label"></label>
        </div>
        <div className="box-list-item__task"><span className={props.completed ? "box-list-item__task-id item-completed-num" : "box-list-item__task-id"}>{props.id}</span><p className={props.completed ? "box-list-item__task-text item-completed" : "box-list-item__task-text"}>{props.description}</p> </div>  
        <button className="box-list-item__btn-delete" 
                onClick={props.deleteTask}
                ><i className="fas fa-times box-list-item__btn-delete-marker"></i></button>
        </li>   
    )
}
export default ToDoItem;