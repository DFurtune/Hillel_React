import React, { useState, useEffect } from "react";
import "./ToDoList.css";
import { stopBubbling } from "../../utils/clickFns";
import { API } from "../../data/CONSTS";

export default function Todos() {
  const DEFAULT_NEW_TODO = {
    title: `Hello, world!`,
    completed: true,
  };

  const [todos, setTodos] = useState([]);
  const [sortedTodos, setSortedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(DEFAULT_NEW_TODO);

  const getTodos = async () => {
    try {
      const request = await fetch(API),
        response = await request.json();

      setTodos(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    setSortedTodos(todos.sort((a, b) => b.completed - a.completed));
  }, [todos]);

  const handleItemDelete = async (id) => {
    try {
      await fetch(API + `/${id}`, { method: `DELETE` });

      setTodos((prevState) => prevState.filter((item) => item.id !== id));
    } catch (err) {
      console.groupCollapsed(err);
    }
  };

  const getListItemClassName = (item) => {
    const classes = [];

    if (item.completed) classes.push(`item--completed`);

    return classes.join(` `);
  };

  const handleItemCompleted = async (item) => {
    try {
      const request = await fetch(API + `/${item.id}`, {
          method: `PUT`,
          body: JSON.stringify({ ...item, completed: !item.completed }),
          headers: {
            "Content-type": "application/json",
          },
        }),
        response = await request.json();

      setTodos((prevState) =>
        prevState.map((item) => {
          if (item.id === response.id) item = response;
          return item;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewTodoTitle = (event) => {
    setNewTodo((prevState) => ({ ...prevState, title: event.target.value }));
  };

  const handleNewTodoCompleted = (event) => {
    setNewTodo((prevState) => ({
      ...prevState,
      completed: event.target.checked,
    }));
  };

  const handleNewTodoSubmit = async (event) => {
    event.preventDefault();

    try {
      const request = await fetch(API, {
          method: `POST`,
          body: JSON.stringify(newTodo),
          headers: {
            "Content-type": "application/json",
          },
        }),
        response = await request.json();

      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="todos__form" onSubmit={handleNewTodoSubmit}>
        <label>
          Title:{" "}
          <input
            type="text"
            defaultValue={newTodo.title}
            onChange={handleNewTodoTitle}
          />
        </label>
        <label>
          Completed:{" "}
          <input
            type="checkbox"
            defaultChecked={newTodo.completed}
            onChange={handleNewTodoCompleted}
          />
        </label>
        <button>Add new todo</button>
      </form>

      {sortedTodos.length ? (
        <ol>
          {sortedTodos.map((item) => (
            <li
              className={getListItemClassName(item)}
              key={item.id}
              onClick={() => handleItemCompleted(item)}
            >
              {item.title}{" "}
              <button
                onClick={(event) =>
                  stopBubbling(event, () => handleItemDelete(item.id))
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      ) : null}
    </>
  );
}
