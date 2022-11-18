import { locales } from '..';
import { useEffect, useState } from 'react';
import { AnkrIntl } from '@ankr.com/common';

export interface WithLocaleProps {
  locale: string;
}

export const useLocaleInitializer = ({ locale }: WithLocaleProps) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    setIsInitialized(false);

    AnkrIntl.instance
      .init({
        currentLocale: locale,
        locales,
        fallbackLocale: 'en-US',
      })
      .then(() => setIsInitialized(true));
  }, [locale]);

  return { isInitialized };
};
