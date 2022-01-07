import React, { useState } from "react";
import Game from "../Game/Game";
import Points from "./Points/Points";
import s from "./Home.module.css";

function Home() {
  const [points, setPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);

  return (
    <div className={s.container}>
      <Game
        setPoints={setPoints}
        setMaxPoints={setMaxPoints}
        setShowPoints={setShowPoints}
      />
      {showPoints ? <Points points={points} maxPoints={maxPoints} /> : null}
    </div>
  );
}

export default Home;
