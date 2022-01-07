import React, { useState, useEffect } from "react";
import s from "./Scale.module.css";

function Scale({ children }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setScale(width > 1000 ? Number(width) / 1150 : Number(width) / 700);
  }, [width]);

  return (
    <div className={s.container} style={{ transform: `scale(${scale})` }}>
      {children}
    </div>
  );
}

export default Scale;
