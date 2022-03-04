import { useState, useEffect } from 'react';
import intl from 'react-intl-universal';

import { locales } from '../modules/i18n';
import { useLocale } from '../modules/i18n/hooks/useLocale';

export const useInitializeLocale = (): boolean => {
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
