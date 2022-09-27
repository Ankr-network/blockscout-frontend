import { useState, useCallback, useEffect } from 'react';

export interface IHeaderData {
  refLLink: string;
  isRefLinkCopied: boolean;
  handleCopyRefLink: () => void;
}

const TIMEOUT = 1_500;

const DEMO_REF_LINK = 'ankr.com/ref/23423fed';

export const useHeader = (): IHeaderData => {
  const [isRefLinkCopied, setIsRefLinkCopied] = useState(false);

  const handleCopyRefLink = useCallback(() => {
    setIsRefLinkCopied(isCopied => !isCopied);
  }, [setIsRefLinkCopied]);

  useEffect(() => {
    if (!isRefLinkCopied) {
      return undefined;
    }

    const timeoutId = setTimeout(handleCopyRefLink, TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [isRefLinkCopied, handleCopyRefLink]);

  return {
    refLLink: DEMO_REF_LINK,
    isRefLinkCopied,
    handleCopyRefLink,
  };
};
