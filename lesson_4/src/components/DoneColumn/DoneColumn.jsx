import { useEffect, useState } from "react";

const DoneColumn = ({ tasks, updateTaskStatus, deleteTask }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(tasks.filter((task) => task.status === 2));
  }, [tasks]);

  return (
    <div>
      <h2>Done: {list.length}</h2>
      <ul>
        {list.map((task) => (
          <li key={task.id}>
            {task.title}
            <button
              onClick={() => {
                deleteTask(task.id);
              }}
            >
              To archive
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoneColumn;
