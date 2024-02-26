import { asyncScheduler, fromEvent } from "rxjs";
import { map, throttleTime } from "rxjs/operators";

function calculateScrollPercentage(element) {
  const { scrollTop, scrollHeight, clientHeight } = element;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

const progressBar = document.querySelector(".progress-bar");
const scrollEvent = fromEvent(document, "scroll");
const progressEvent = scrollEvent.pipe(
  throttleTime(20, asyncScheduler, {
    leading: false,
    trailing: true,
  }),
  map(({ target }) => calculateScrollPercentage(target.scrollingElement))
);

progressEvent.subscribe((percent) => {
  progressBar.style.width = `${percent}%`;
});
