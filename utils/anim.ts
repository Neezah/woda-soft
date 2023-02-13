import { easeBounceOut } from 'd3-ease';
import { interpolateString } from 'd3-interpolate';

interface IstartAnimationLoop {
  duration: number;
  onComplete: any
  onProgress: (progress: number) => void
  initialProgress: number
}

function startAnimationLoop({ onProgress, onComplete, duration, initialProgress }: IstartAnimationLoop) {
  let start: any = null;
  let requestId: any = null;

  const startTimeDiff = (initialProgress || 0) * duration;

  const step = (timestamp: number) => {
    if (!start) start = timestamp - startTimeDiff;
    let progress = (timestamp - start) / duration;
    if (progress > 1) {
      progress = 1;
    }
    onProgress(progress);

    if (progress < 1) {
      requestId = window.requestAnimationFrame(step);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  }
  requestId = window.requestAnimationFrame(step);

  return {
    stop() {
      cancelAnimationFrame(requestId);
    }
  }
}



function getStyles(element: any, props: any) {
  const computed = window.getComputedStyle(element);
  return props.reduce((obj: any, prop: any) => {
    obj[prop] = computed[prop];
    return obj;
  }, {});
}



/* custom animations */
function slide(element: { style: { [x: string]: string; }; }, { duration, direction, onComplete }: { direction: string; duration: number; onComplete: any; }) {
  const collapsedStyles = {
    marginTop: '0px',
    marginBottom: '0px',
    height: '0px',
  }
  const props = Object.keys(collapsedStyles);

  const [ startStyles, targetStyles ] = direction === 'DOWN'
    ? [ collapsedStyles, getStyles(element, props) ]
    : [ getStyles(element, props), collapsedStyles ]
  const interpolators = new Map(props.map(
    prop => [prop, interpolateString(startStyles[prop], targetStyles[prop])]
  ));

  return startAnimationLoop({
    duration,
    onComplete,
    onProgress: (progress: number) => {
      const delta = easeBounceOut(progress);
      interpolators.forEach((interpolator, prop) => {
        element.style[prop] = interpolator(delta);
      });
    },
    initialProgress: 1
  });
}

function slideDown(element: any, { duration = 750, onComplete }: any = {}) {
  return slide(element, { direction: 'DOWN', duration, onComplete });
}

function slideUp(element: any, { duration = 750, onComplete }: any = {}) {
  return slide(element, { direction: 'UP', duration, onComplete });
}


export { startAnimationLoop, slide, slideDown, slideUp }