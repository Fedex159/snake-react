import React, { useRef, useState, useEffect } from "react";
import { newMovement, randomInteger } from "../../../utils";
import GameOver from "../GameOver/GameOver";
import eatingSFX from "../../../assets/sounds/eating.mp3";
import s from "./Board.module.css";

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

function Board({
  difficult,
  setDifficult,
  setPoints,
  setMaxPoints,
  setShowPoints,
}) {
  const width = 600;
  const height = 400;
  const total = (width / 20) * (height / 20);

  const refBoard = useRef(null);
  const [breaks, setBreaks] = useState([]);
  const [cells, setCells] = useState(new Array(total).fill(false));
  const [food, setFood] = useState(null);
  const [snake, setSnake] = useState([
    { dir: "ArrowDown", pos: 140 }, // Head
    { dir: "ArrowDown", pos: 110 },
    { dir: "ArrowDown", pos: 80 },
    { dir: "ArrowDown", pos: 50 },
    { dir: "ArrowDown", pos: 20 }, // Tail
  ]);
  const [gameOver, setGameOver] = useState(false);

  // generate a food when start
  useEffect(() => {
    let random = randomInteger(0, 599);
    while (cells[random] === true || cells[random] === null) {
      random = randomInteger(0, 599);
    }
    setFood(random);
    setShowPoints(true);
    // eslint-disable-next-line
  }, []);

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

      const audioEating = new Audio(eatingSFX);
      audioEating.play();
      setPoints((prev) => prev + 5);
    }
  }, [snake, food, cells, setPoints]);

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

    if (!gameOver) {
      interval = setInterval(() => {
        setSnake((prev) => {
          return prev.map((e) => {
            const index = breaks.findIndex((b) => b.pos === e.pos);
            const flag = index === -1 ? e.dir : breaks[index].dir;
            const newPos = newMovement(30, 20, e.pos, flag);
            const crash = snake.filter((s) => s.pos === newPos);

            if (e.pos === newPos || crash.length > 1) {
              setGameOver(true);
              setPoints((prevActual) => {
                setMaxPoints((prevMax) =>
                  prevActual > prevMax ? prevActual : prevMax
                );
                return 0;
              });
            }
            return {
              dir: flag,
              pos: newPos,
            };
          });
        });
      }, difficult);
    }

    return () => clearInterval(interval);
  }, [snake, breaks, difficult, gameOver, setPoints, setMaxPoints]);

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
      onKeyDown={!gameOver ? handleKey : null}
      tabIndex={0}
    >
      {cells.map((c, i) => (
        <div
          key={`cell_${i}`}
          className={`${s.cell} ${
            c === true
              ? gameOver
                ? s.death
                : s.fill
              : c === null && `${s.food} ${gameOver && s.death}`
          }`}
        ></div>
      ))}
      {gameOver ? (
        <GameOver setDifficult={setDifficult} setShowPoints={setShowPoints} />
      ) : null}
    </div>
  );
}

export default Board;
