const Heading = ({ text = "Default heading", color = "black" }) => {
  //   const textColor = { color: 'red' };
  return <h1 style={{ color }}>{text}</h1>;
};

export default Heading;
