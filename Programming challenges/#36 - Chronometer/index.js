const chronometer = document.getElementsByClassName("input-timer")[0];
const startButton = document.querySelector(".start");
const finishButton = document.querySelector(".finish");

const { timer, Subject } = rxjs;
const { takeUntil } = rxjs.operators;

const stopChronometer$ = new Subject();

let secondsElapsed = 0;

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${secs}`;
}

function startChronometer() {
  stopChronometer$.next();
  timer(0, 1000)
    .pipe(takeUntil(stopChronometer$))
    .subscribe(() => {
      secondsElapsed++;
      chronometer.innerText = formatTime(secondsElapsed);
    });
}

function stopChronometer() {
  stopChronometer$.next();
}

startButton.addEventListener("click", startChronometer);
finishButton.addEventListener("click", stopChronometer);