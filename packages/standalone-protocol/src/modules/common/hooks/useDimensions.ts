import { RefObject, useLayoutEffect, useState } from 'react';
import { debouncePromise } from '../utils/debouncePromise';

interface ElementDimesions {
  width: number;
  height: number;
}

const getElementDimensions = (elem: HTMLElement): ElementDimesions => {
  const { width, height } = elem.getBoundingClientRect();

  return { width, height };
};

export const useDimensions = (ref: RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState<ElementDimesions>({
    width: 0,
    height: 0,
  });

  const handleSetDimensions = debouncePromise(() => {
    if (ref.current) {
      setDimensions(getElementDimensions(ref.current!));
    }
  }, 10);

  useLayoutEffect(() => {
    window.addEventListener('resize', handleSetDimensions, true);
    handleSetDimensions();

    return () => {
      window.removeEventListener('resize', handleSetDimensions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return dimensions;
};
