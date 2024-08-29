import { useState, useEffect } from "react";

const InProgressColumn = ({ tasks, updateTaskStatus }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(tasks.filter((task) => task.status === 1));
  }, [tasks]);

  return (
    <div>
      <h2>In progress: {list.length}</h2>
      <ul>
        {list.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => updateTaskStatus(task.id, 0)}>To Do</button>
            <button onClick={() => updateTaskStatus(task.id, 2)}>Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InProgressColumn;
