import { useEffect, useRef, useState } from 'react';

const DEFAULT_INPUT_WIDTH = 10;

export const useAutoWidth = (amount?: string) => {
  const autoWidthRef = useRef<HTMLDivElement>(null);

  const [autoWidth, setAutoWidth] = useState(DEFAULT_INPUT_WIDTH);

  useEffect(() => {
    setAutoWidth(autoWidthRef.current?.clientWidth || DEFAULT_INPUT_WIDTH);
  }, [amount]);

  return [autoWidth, autoWidthRef] as const;
};
