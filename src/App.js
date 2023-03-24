import React from 'react';
import './App.css';
import { useState } from 'react';

function Container( {children} ) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

function Button( {text, onClick}) {
  return (
    <button className = "button" onClick={onClick}>
      {text}
    </button>
  );
}

function Text( {onInput} ) {
  return (
    <input className = "input" onInput = {onInput}></input>
  )
}

// function TaskCount() {
//   return (
//     <span className = "task-count"></span>
//   )
// }

// function Tasks() {
//   return (
//     <div className = "tasks"></div>
//   )
// }

function List( {id, complete, onClick, children} ) {
  let state;
  if (complete) {
    state = "complete";
  }
  else {
    state = "incomplete";
  }
  return (
    <li className = {state} onClick = {onClick}>{children}</li>
  );
}

function App() { 
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  
  function handleClick() {
    const id = todoList.length + 1;
    setTodoList(prev => [
      ...prev,
      {
        id: id,
        task: input,
        complete: false,
      }
    ]);
    setInput("");
  }

  // handleComplete from https://medium.com/codex/building-a-to-do-list-app-using-react-hooks-and-styled-component-7e413a16b91e
  // A lot of it updates states/variables that aren't yet being used
  const handleComplete = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id == id) {
        if (!task.complete){
            //Task is pending, modifying it to complete and increment the count
            setCompletedTaskCount(completedTaskCount + 1);
        } 
        else {
            //Task is complete, modifying it back to pending, decrement Complete count
            setCompletedTaskCount(completedTaskCount - 1);
        }
      item = { ...task, complete: !task.complete };
      } 
      else item = { ...task };
    return item;
    });
    setTodoList(list);
  };

  return ( 
    <Container>
      <div>
        <h2>ToDo List</h2>
        <Text onInput = {(e)=>setInput(e.target.value)}/>
        <Button text="Add" onClick={handleClick}/>
        {/* <Tasks>
          <TaskCount>
            <b>Pending Tasks</b>
          </TaskCount>
          <TaskCount>
            <b>Completed Tasks</b>
          </TaskCount>
        </Tasks> */}
        <div>
          <ul>
            {todoList.map((todo) => {
              return (
                <List
                  id = {todo.id}
                  complete = {todo.complete}
                  onClick = {() => handleComplete(todo.id)}> {todo.task} 
                </List>
              )
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
}
export default App;