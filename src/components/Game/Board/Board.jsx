import React, { useRef, useState, useEffect } from "react";
import s from "./Board.module.css";

const directions = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"];

function newMovement(itemsPerRow, columns, position, direction) {
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

function Board() {
  const width = 600;
  const height = 400;
  const total = (width / 20) * (height / 20);

  const refBoard = useRef(null);
  const [breaks, setBreaks] = useState([]);
  const [cells, setCells] = useState(new Array(total).fill(false));
  const [snake, setSnake] = useState([
    { dir: "ArrowDown", pos: 140 },
    { dir: "ArrowDown", pos: 110 },
    { dir: "ArrowDown", pos: 80 },
    { dir: "ArrowDown", pos: 50 },
    { dir: "ArrowDown", pos: 20 },
  ]);

  useEffect(() => {
    // Remove break when all snake pass
    if (breaks.length) {
      const newBreaks = [];
      breaks.forEach((b) => {
        cells[b.pos] && newBreaks.push(b);
      });
      if (breaks.length !== newBreaks.length) {
        setBreaks(newBreaks);
      }
    }
  }, [snake, breaks, cells]);

  useEffect(() => {
    setCells(() => {
      const arr = new Array(total).fill(false);
      snake.forEach((e) => {
        arr[e.pos] = true;
      });
      return arr;
    });
  }, [snake, total]);

  useEffect(() => {
    if (refBoard.current) {
      refBoard.current.focus();
    }
  }, [refBoard]);

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setSnake((prev) => {
        return prev.map((e) => {
          const index = breaks.findIndex((b) => b.pos === e.pos);
          const flag = index === -1 ? e.dir : breaks[index].dir;
          return {
            dir: flag,
            pos: newMovement(30, 20, e.pos, flag),
          };
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [snake, breaks]);

  const handleKey = (event) => {
    const newDirection = event.key;
    const index = directions.indexOf(newDirection);
    if (index !== -1) {
      setSnake((prev) => {
        const arr = [...prev];
        setBreaks((prev) => [...prev, { dir: arr[0].dir, pos: arr[0].pos }]);
        arr[0].dir = newDirection;
        return arr;
      });
    }
  };

  return (
    <div
      ref={refBoard}
      className={s.container}
      onKeyDown={handleKey}
      tabIndex={0}
    >
      {cells.map((c, i) => (
        <div key={`cell_${i}`} className={`${s.cell} ${c && s.fill}`}></div>
      ))}
    </div>
  );
}

export default Board;
