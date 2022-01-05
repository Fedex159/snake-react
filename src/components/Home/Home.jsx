import React from "react";
import s from "./Home.module.css";
import Game from "../Game/Game";

function Home() {
  return (
    <div className={s.container}>
      <Game />
    </div>
  );
}

export default Home;
