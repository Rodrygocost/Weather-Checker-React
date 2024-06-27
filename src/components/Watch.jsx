import { useEffect, useState } from "react";

export default function WatchShower(props) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function GetTime() {
    const my_timezone = props.timezone / 3600;

    let dataAtual = new Date();
    let horarioLocal = dataAtual.toLocaleTimeString("pt-BR", {
      timeZone: "UTC",
    });

    if (!horarioLocal) {
      console.log("timer calc error...");
    } else if (parseFloat(horarioLocal.slice(0, 2)) + my_timezone > 23) {
      const final_calc = parseFloat(+horarioLocal.slice(0, 2)) + my_timezone;

      setHours("0" + (final_calc - 24));
      setMinutes(horarioLocal.slice(3, 5));
      setSeconds(horarioLocal.slice(6, 8));
    } else if (parseFloat(horarioLocal.slice(0, 2)) + my_timezone <= 23) {
      if (parseFloat(horarioLocal.slice(0, 2)) + my_timezone < 0) {
        setHours(parseFloat(horarioLocal.slice(0, 2)) + 24 + my_timezone);
      } else {
        setHours(parseFloat(horarioLocal.slice(0, 2)) + my_timezone);
      }
      setMinutes(horarioLocal.slice(3, 5));
      setSeconds(horarioLocal.slice(6, 8));
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      GetTime();
    }, 1000);
  });

  return (
    <>
      {useEffect(() => {
        GetTime();
      }, [])}
      <div id="time_showed">
        <div className="all_watch">
          <div className="timer_on_screen">
            <h1 className="timer" id="timer_hours">
              {hours}
            </h1>
            <h1 className="timer" id="timer_minutes">
              {minutes}
            </h1>
            <h1 className="timer" id="timer_seconds">
              {seconds}
            </h1>
          </div>
          <div className="timer_message">
            <p>Horário local</p>
          </div>
        </div>
      </div>
    </>
  );
}
