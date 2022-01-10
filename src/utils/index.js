export function newMovement(itemsPerRow, columns, position, direction) {
  const row = Math.floor(position / itemsPerRow);
  const start = itemsPerRow * row;
  const final = start + itemsPerRow - 1;

  switch (direction) {
    case "ArrowRight":
      if (position + 1 <= final) return position + 1;
      break;
    case "ArrowLeft":
      if (position - 1 >= start) return position - 1;
      break;
    case "ArrowDown":
      const newPositionDown = (row + 1) * itemsPerRow + (position - start);
      if (newPositionDown <= itemsPerRow * columns - 1) return newPositionDown;
      break;
    case "ArrowUp":
      const newPositionUp = (row - 1) * itemsPerRow + (position - start);
      if (newPositionUp >= 0) return newPositionUp;
      break;
    default:
      return position;
  }

  return position;
}

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function addToLocalStorage(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

export function getToLocalStorage(key) {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
}

export function hasTouchScreen() {
  let hasTouchScreen = false;

  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
    let mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches;
    } else if ("orientation" in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      var UA = navigator.userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }

  return hasTouchScreen;
}
