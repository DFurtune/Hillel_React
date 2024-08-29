import ToDoColumn from "../ToDoColumn/ToDoColumn";
import InProgressColumn from "../InProgressColumn/InProgressColumn";
import DoneColumn from "../DoneColumn/DoneColumn";
import { useState } from "react";
import tasks from "../../data/tasks";
import "./Wrapper.scss";

const Wrapper = () => {
  const [tasksArray, setTasksArray] = useState(tasks);

  const updateTaskStatus = (id, newStatus) => {
    setTasksArray((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasksArray((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  return (
    <div className="wrapper">
      <ToDoColumn tasks={tasksArray} updateTaskStatus={updateTaskStatus} />
      <InProgressColumn
        tasks={tasksArray}
        updateTaskStatus={updateTaskStatus}
      />
      <DoneColumn
        tasks={tasksArray}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default Wrapper;
