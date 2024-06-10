import { useEffect, useRef } from 'react';

export const useAutoupdatedRef = <Value>(value: Value) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;

    return () => {
      ref.current = null as Value;
    };
  }, [value]);

  return ref;
};
