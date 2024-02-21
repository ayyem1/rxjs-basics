import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";

function calculateScrollPercentage(element) {
  const { scrollTop, scrollHeight, clientHeight } = element;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

const progressBar = document.querySelector('.progress-bar')
const scrollEvent = fromEvent(document, "scroll");
const progressEvent = scrollEvent.pipe(
  map(({ target }) => calculateScrollPercentage(target.scrollingElement))
);

progressEvent.subscribe(percent => {
  progressBar.style.width = `${percent}%`
});
