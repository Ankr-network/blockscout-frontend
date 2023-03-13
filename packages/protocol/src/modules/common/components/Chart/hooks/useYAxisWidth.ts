import { MutableRefObject, useEffect, useRef, useState } from 'react';

const DEFAULT_WIDTH = 80;

const Y_AXIS_CLASSNAME = 'recharts-yAxis';

type YAxisWidth = [
  MutableRefObject<MutableRefObject<HTMLElement> | undefined>,
  number,
];

export const useYAxisWidth = (): YAxisWidth => {
  const ref = useRef<MutableRefObject<HTMLElement>>();
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  useEffect(() => {
    if (ref.current?.current) {
      const callback = () => {
        const yAxis =
          ref.current?.current.getElementsByClassName(Y_AXIS_CLASSNAME)?.[0];

        if (yAxis) {
          setWidth(yAxis.getBoundingClientRect().width);
        }
      };

      callback();

      const observer = new MutationObserver(callback);

      observer.observe(ref.current.current, { childList: true, subtree: true });

      return () => observer.disconnect();
    }

    return () => {};
  });

  return [ref, width];
};
