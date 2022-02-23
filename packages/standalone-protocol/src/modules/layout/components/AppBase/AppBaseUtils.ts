import { useState, useEffect } from 'react';
import intl from 'react-intl-universal';

import { useLocale } from '../../../i18n/utils/useLocale';
import { locales } from '../../../i18n';

export const useInitialaizeLocale = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { locale } = useLocale();

  useEffect(() => {
    setIsInitialized(false);

    intl
      .init({
        currentLocale: locale,
        locales,
        fallbackLocale: 'en-US',
      })
      .then(() => setIsInitialized(true));
  }, [locale]);

  return isInitialized;
};

export const getCurrentChainId = (chainId?: string) => {
  // using only for local development and stage
  return chainId ?? window?.location?.pathname?.split('/chain/')?.[1];
};
