import { useEffect } from "react";
import { useState } from "react";
import useSound from "use-sound";
import notification from "../assets/notification.mp3";

function Timer() {
  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);
  const [bgColor, setBgColor] = useState("work");
  const [isActive, setIsActive] = useState(false);
  const [modeActive, setModeActive] = useState([
    { id: "work", active: true, name: "work" },
    { id: "short break", active: false, name: "short break" },
    { id: "long break", active: false, name: "long break" },
  ]);
  const [play] = useSound(notification);
  useEffect(() => {
    if (bgColor === "work") document.body.style.backgroundColor = "#4F6F52";
    else if (bgColor === "short break")
      document.body.style.backgroundColor = "#739072";
    else document.body.style.backgroundColor = "#5C8374";
    let timer;
    timer = setInterval(() => {
      if (isActive) {
        if (second === 0) {
          if (minute > 0) {
            setMinute((minute) => minute - 1);
            setSecond(59);
          } else {
            play();
            setIsActive(false);
          }
        } else {
          setSecond((second) => second - 1);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [minute, second, isActive, bgColor]);

  function handleTimerActivation() {
    setIsActive((isActive) => !isActive);
  }

  function handleTimerMode(modeId) {
    switch (modeId) {
      case "work": {
        setMinute(25);
        setSecond(0);
        setIsActive(false);
        setBgColor("work");
        setModeActive(
          modeActive.map((mode) => {
            if (mode.id === modeId) return { ...mode, active: true };
            return { ...mode, active: false };
          })
        );
        break;
      }
      case "short break": {
        setMinute(15);
        setSecond(0);
        setIsActive(false);
        setBgColor("short break");
        setModeActive(
          modeActive.map((mode) => {
            if (mode.id === modeId) return { ...mode, active: true };
            return { ...mode, active: false };
          })
        );

        break;
      }
      default: {
        setMinute(15);
        setSecond(0);
        setIsActive(false);
        setBgColor("long break");
        setModeActive(
          modeActive.map((mode) => {
            if (mode.id === modeId) return { ...mode, active: true };
            return { ...mode, active: false };
          })
        );

        break;
      }
    }
  }

  return (
    <div className="border-[#D2E3C8] border-2 max-w-screen-sm w-full m-auto">
      <div className="flex items-center gap-4 justify-center flex-wrap my-4">
        {modeActive.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleTimerMode(mode.id)}
            className={`px-4 py-2 rounded font-semibold text-xl ${
              mode.active &&
              "bg-[#50623A] text-[#D2E3C8] border-[#D2E3C8] border"
            }`}
          >
            {mode.name}
          </button>
        ))}
      </div>
      <h2 className="text-center text-3xl font-bold my-4">
        {minute}:{second === 0 ? "00" : second}
      </h2>
      <div className="flex justify-center items-center gap-4 my-4">
        <button
          onClick={handleTimerActivation}
          className="rounded text-white bg-transparent px-4 py-2 border text-4xl font-semibold"
        >
          {isActive ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
export default Timer;
