import { useEffect, useState } from "react";

const ToDoColumn = ({tasks, updateTaskStatus}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(tasks.filter((task) => task.status === 0));
  }, [tasks]);

  return (
    <div>
      <h2>To do: {list.length}</h2>
      <ul>
        {list.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => updateTaskStatus(task.id, 1)}>
              In progress
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoColumn;
