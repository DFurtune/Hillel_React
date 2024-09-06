import React, { useState } from "react";
import TodosForm from "../TodosForm/TodosForm";
import ToDoList from "../ToDoList/ToDoList";
import "./Todos.css";

function Todos({ liftingNewTodoToApp }) {
  const [newTodo, setNewTodo] = useState({});

  const liftedNewTodo = (item) => {
    setNewTodo(item);
  };

  return (
    <>
      <TodosForm liftingNewTodo={liftedNewTodo} />
      <ToDoList newTodo={newTodo} />
    </>
  );
}

export default Todos;
