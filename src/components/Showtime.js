import { useState } from "react";

export default function Showtime() {
  let time = new Date().toLocaleTimeString();
  let [currentTime, changeTime] = useState(time);

  function checkTime() {
    time = new Date().toLocaleTimeString();
    changeTime(time);
  }

  setInterval(checkTime, 1000);

  return (
    <>
      <p>{currentTime}</p>
    </>
  );
}
