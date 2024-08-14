const Description = ({ textStyle }) => {
  const name = prompt("How is your name?");
  const fontStyle = { fontStyle: textStyle };

  return <h2 style={fontStyle}>{name}'s first React application</h2>;
};

export default Description;
