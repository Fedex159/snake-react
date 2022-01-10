import React from "react";
import github from "../../../assets/imgs/github.png";
import linkedin from "../../../assets/imgs/linkedin.png";
import s from "./Info.module.css";

const socials = [
  { name: "github", img: github, ref: "https://github.com/Fedex159/" },
  {
    name: "linkedin",
    img: linkedin,
    ref: "https://www.linkedin.com/in/federico-avelin-dev/",
  },
];

function Info({ setShowInfo }) {
  return (
    <div className={s.container}>
      <button onClick={() => setShowInfo((prev) => !prev)}>X</button>
      <h2>How To Play</h2>
      <ul>
        <li>
          Use arrows keys <strong>(← → ↑ ↓)</strong> for movement.
        </li>
        <li>Use buttons on screen for movement.</li>
        <li>Use mouse/touch over game area with swipe movements.</li>
        <li>
          Press <strong>M</strong> to enable or disable sound.
        </li>
      </ul>
      <div className={s.imgs}>
        {socials.map((s, i) => (
          <a
            key={`${s.name}_${i}`}
            href={s.ref}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={s.img} alt={s.name} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Info;
