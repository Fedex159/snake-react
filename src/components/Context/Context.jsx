import React, { createContext, useState, useEffect } from "react";
import { getToLocalStorage } from "../../utils";
import s from "./Context.module.css";

export const StateGlobal = createContext("Default Value");

function Context({ children }) {
  const [enableSound, setEnableSound] = useState(true);
  const [points, setPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState({ Easy: 0, Medium: 0, Hard: 0 });
  const [showPoints, setShowPoints] = useState(false);
  const [difficult, setDifficult] = useState(null);

  useEffect(() => {
    const storage = getToLocalStorage("maxPoints");
    if (storage) {
      setMaxPoints(storage);
    }
  }, []);

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
