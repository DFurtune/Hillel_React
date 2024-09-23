import React from "react";
import './RecursiveList.css'

const RecursiveList = ({ data }) => {
  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <RecursiveList data={item} />
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> <RecursiveList data={value} />
            </li>
          ))}
        </ul>
      );
    }
  }
  return <span>{String(data)}</span>;
};

export default RecursiveList;
