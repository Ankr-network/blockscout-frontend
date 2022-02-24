import { useEffect, useState, useCallback } from 'react';

export const useCopyToClip = (): [boolean, () => void] => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    let timerId: any = null;

    if (isCopied) {
      timerId = setTimeout(() => {
        setIsCopied(false);
        (document.activeElement as any)?.blur();
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isCopied]);

  const handleCopy = useCallback(() => setIsCopied(true), []);

  return [isCopied, handleCopy];
};
