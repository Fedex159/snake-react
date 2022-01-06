export function newMovement(itemsPerRow, columns, position, direction) {
  const row = Math.floor(position / itemsPerRow);
  const start = itemsPerRow * row;
  const final = start + itemsPerRow - 1;

  switch (direction) {
    case "ArrowRight":
      if (position + 1 <= final) return position + 1;
      break;
    case "ArrowLeft":
      if (position - 1 >= start) return position - 1;
      break;
    case "ArrowDown":
      const newPositionDown = (row + 1) * itemsPerRow + (position - start);
      if (newPositionDown <= itemsPerRow * columns - 1) return newPositionDown;
      break;
    case "ArrowUp":
      const newPositionUp = (row - 1) * itemsPerRow + (position - start);
      if (newPositionUp >= 0) return newPositionUp;
      break;
    default:
      return position;
  }

  return position;
}

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
