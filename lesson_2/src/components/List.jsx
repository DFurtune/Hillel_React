import { useEffect, useState } from "react";
import animals from "../data/animalsData";
import "./List.css";

const List = () => {
  const [list, setList] = useState(animals);

  useEffect(() => {
    const interval = setInterval(() => {
      setList((currentList) => {
        const inactiveItems = currentList.filter((item) => !item.active);

        if (inactiveItems.length === 0) {
          clearInterval(interval);
          return currentList;
        }

        const randomIndex = Math.floor(Math.random() * inactiveItems.length);
        const randomItem = inactiveItems[randomIndex];

        return currentList.map((item) =>
          item.type === randomItem.type ? { ...item, active: true } : item
        );
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getClassNames = (item) => {
    return item.active ? "active" : null;
  };

  return list.length ? (
    <>
      {list.map((item, index) => (
        <tr key={index} className={getClassNames(item)}>
          <td>{item.type}</td>
          <td>{item.icon}</td>
        </tr>
      ))}
    </>
  ) : null;
};

export default List;
