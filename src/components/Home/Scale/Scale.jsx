import React, { useState, useEffect } from "react";
import s from "./Scale.module.css";

function Scale({ children }) {
  const [width, setWidth] = useState(Number(window.innerWidth));
  const [height, setHeight] = useState(Number(window.innerHeight));
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setWidth(Number(window.innerWidth));
      setHeight(Number(window.innerHeight));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // default 1150
  useEffect(() => {
    setScale(() => {
      const value = width > 1000 ? 1.4 : width / 700;
      return width * value > height ? height / 600 - 0.1 : value;
    });
  }, [width, height]);

  return (
    <div className={s.container} style={{ transform: `scale(${scale})` }}>
      {children}
    </div>
  );
}

export default Scale;
