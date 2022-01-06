import React, { useRef, useState, useEffect } from "react";
import s from "./Board.module.css";
import { newMovement, randomInteger } from "../../../utils";

const directions = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"];
const validDir = {
  ArrowDown: ["ArrowLeft", "ArrowRight"],
  ArrowUp: ["ArrowLeft", "ArrowRight"],
  ArrowLeft: ["ArrowDown", "ArrowUp"],
  ArrowRight: ["ArrowDown", "ArrowUp"],
};
const oppositeMov = {
  ArrowLeft: "ArrowRight",
  ArrowUp: "ArrowDown",
  ArrowDown: "ArrowUp",
  ArrowRight: "ArrowLeft",
};

function Board({ difficult }) {
  const width = 600;
  const height = 400;
  const total = (width / 20) * (height / 20);

  const refBoard = useRef(null);
  const [breaks, setBreaks] = useState([]);
  const [cells, setCells] = useState(new Array(total).fill(false));
  const [food, setFood] = useState(530);
  const [snake, setSnake] = useState([
    { dir: "ArrowDown", pos: 140 }, // Head
    { dir: "ArrowDown", pos: 110 },
    { dir: "ArrowDown", pos: 80 },
    { dir: "ArrowDown", pos: 50 },
    { dir: "ArrowDown", pos: 20 }, // Tail
  ]);

  useEffect(() => {
    // eat food
    if (snake[0].pos === food) {
      const tail = snake[snake.length - 1];
      const newTail = newMovement(30, 20, tail.pos, oppositeMov[tail.dir]);
      setSnake((prev) => [...prev, { dir: tail.dir, pos: newTail }]);

      let random = randomInteger(0, 599);
      while (cells[random] === true || cells[random] === null) {
        random = randomInteger(0, 599);
      }
      setFood(random);
    }
  }, [snake, food, cells]);

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
      arr[food] = null;
      return arr;
    });
  }, [snake, total, food]);

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
    }, difficult);

    return () => clearInterval(interval);
  }, [snake, breaks, difficult]);

  const handleKey = (event) => {
    const newDirection = event.key;
    const indexDir = directions.indexOf(newDirection);

    const moveValids = validDir[snake[0].dir];
    const indexMov = moveValids.indexOf(newDirection);

    const flag = indexDir !== -1 && indexMov !== -1;
    if (flag) {
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
        <div
          key={`cell_${i}`}
          className={`${s.cell} ${c === true ? s.fill : c === null && s.food}`}
        ></div>
      ))}
    </div>
  );
}

export default Board;
