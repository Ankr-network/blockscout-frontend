import { useCallback, useEffect, useState } from 'react';

export interface IUseCopyTokenAddressHookData {
  isCopied: boolean;
  handleCopy: () => void;
}

const TIMEOUT = 1_500;

export const useCopyTokenAddressHook = (): IUseCopyTokenAddressHookData => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    setIsCopied(copied => !copied);
  }, [setIsCopied]);

  useEffect(() => {
    if (!isCopied) {
      return undefined;
    }

    const timeoutId = setTimeout(handleCopy, TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [isCopied, handleCopy]);

  return { isCopied, handleCopy };
};
