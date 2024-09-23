import React from "react";
import { useNavigate } from "react-router-dom";
import './RedirectButtonComponent.css';

const RedirectButtonComponent = ({ to, text }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button className="redirect-button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default RedirectButtonComponent;
