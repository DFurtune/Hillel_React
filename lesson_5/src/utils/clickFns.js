const stopBubbling = (event, fn) => {
  event.stopPropagation();
  fn();
};

export { stopBubbling };
