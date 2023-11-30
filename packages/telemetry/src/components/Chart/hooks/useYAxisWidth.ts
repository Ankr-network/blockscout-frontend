import { MutableRefObject, useEffect, useRef, useState } from 'react';

const DEFAULT_WIDTH = 40;

type YAxisWidth = [
  MutableRefObject<MutableRefObject<HTMLElement> | undefined>,
  number,
];

const RECHART_Y_AXIS_LABEL_CLASSNAME = `.recharts-yAxis .recharts-cartesian-axis-tick`;

export const useYAxisWidth = (): YAxisWidth => {
  const ref = useRef<MutableRefObject<HTMLElement>>();
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  useEffect(() => {
    if (ref?.current?.current) {
      const callback = () => {
        const tickValueElements: NodeListOf<Element> | undefined =
          ref.current?.current.querySelectorAll(RECHART_Y_AXIS_LABEL_CLASSNAME);

        if (tickValueElements && tickValueElements.length > 0) {
          const highestWidth = [...tickValueElements]
            .map(el => {
              const boundingRect = el.getBoundingClientRect();

              if (boundingRect != null && boundingRect.width != null) {
                return boundingRect.width;
              }

              return 0;
            })
            .reduce((accumulator, value) => {
              if (accumulator < value) {
                return value;
              }

              return accumulator;
            }, 0);

          setWidth(highestWidth);
        }
      };

      callback();

      const observer = new MutationObserver(callback);

      observer.observe(ref.current.current, { childList: true, subtree: true });

      return () => observer.disconnect();
    }

    return () => {};
  }, []);

  return [ref, width];
};
