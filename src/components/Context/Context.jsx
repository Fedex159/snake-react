import React, { createContext, useState } from "react";
import s from "./Context.module.css";

export const StateGlobal = createContext("Default Value");

function Context({ children }) {
  const [enableSound, setEnableSound] = useState(true);
  const [points, setPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState({ Easy: 0, Medium: 0, Hard: 0 });
  const [showPoints, setShowPoints] = useState(false);
  const [difficult, setDifficult] = useState(null);

  return (
    <div className={s.container}>
      <StateGlobal.Provider
        value={{
          enableSound,
          setEnableSound,
          points,
          setPoints,
          maxPoints,
          setMaxPoints,
          showPoints,
          setShowPoints,
          difficult,
          setDifficult,
        }}
      >
        {children}
      </StateGlobal.Provider>
    </div>
  );
}

export default Context;
