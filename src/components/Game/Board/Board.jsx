import React, { useRef, useState, useEffect, useContext } from "react";
import { newMovement, randomInteger } from "../../../utils";
import { StateGlobal } from "../../Context/Context";
import { useSwipeable } from "react-swipeable";
import GameOver from "../GameOver/GameOver";
import ArrowsKeys from "../ArrowsKeys/ArrowsKeys";
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
const swipes = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Left: "ArrowLeft",
  Right: "ArrowRight",
};

function Board() {
  const width = 600;
  const height = 400;
  const total = (width / 20) * (height / 20);

  const refBoard = useRef(null);
  const { enableSound, setPoints, setShowPoints, difficult } =
    useContext(StateGlobal);

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
  const [keyOn, setKeyOn] = useState(null);

  const handleSwiped = (event) => {
    const dir = swipes[event.dir];
    if (!gameOver) {
      handleKey({ key: dir });
    }
  };

  const handlers = useSwipeable({
    onSwiping: handleSwiped,
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  const handleKey = (event) => {
    const newDirection = event.key;
    const indexDir = directions.indexOf(newDirection);

    const moveValids = validDir[snake[0].dir];
    const indexMov = moveValids.indexOf(newDirection);

    const flag = indexDir !== -1 && indexMov !== -1;
    if (flag) {
      setKeyOn(newDirection);
      setSnake((prev) => {
        const arr = [...prev];
        setBreaks((prev) => [...prev, { dir: arr[0].dir, pos: arr[0].pos }]);
        arr[0].dir = newDirection;
        return arr;
      });
    }
  };

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
      if (enableSound) audioEating.play();
      setPoints((prev) => prev + 5);
    }
  }, [snake, food, cells, setPoints, enableSound]);

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
      refBoard.current.parentElement.focus();
    }
  }, [refBoard, snake]);

  // GameOver
  useEffect(() => {
    const crash = snake.filter((s) => s.pos === snake[0].pos);
    if (crash.length > 1) {
      setGameOver(true);
    }
  }, [snake]);

  // Update snake every time
  useEffect(() => {
    let interval = null;

    if (!gameOver) {
      interval = setInterval(() => {
        setSnake((prev) => {
          return prev.map((e) => {
            const index = breaks.findIndex((b) => b.pos === e.pos);
            const flag = index === -1 ? e.dir : breaks[index].dir;
            const newPos = newMovement(30, 20, e.pos, flag);

            return {
              dir: flag,
              pos: newPos,
            };
          });
        });
      }, difficult.value);
    }

    return () => clearInterval(interval);
  }, [snake, breaks, difficult, gameOver]);

  return (
    <div
      className={s.container}
      onKeyDown={!gameOver ? handleKey : null}
      {...handlers}
      tabIndex={0}
    >
      {cells.map((c, i) => (
        <div
          ref={i === 0 ? refBoard : null}
          style={{ userSelect: "none" }}
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
      {gameOver ? <GameOver /> : null}
      <ArrowsKeys handleKey={!gameOver ? handleKey : null} keyOn={keyOn} />
    </div>
  );
}

export default Board;
