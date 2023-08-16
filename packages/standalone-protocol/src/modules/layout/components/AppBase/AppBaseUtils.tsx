import { useState, useEffect } from 'react';
import intl from 'react-intl-universal';

import { AnkrSpinner } from 'uiKit/AnkrSpinner';
import { Spinner } from 'uiKit/Spinner';
import { ChainId } from 'domains/chains/api/chain';
import { useHasAnkrsInfo } from 'domains/chains/screens/ChainItem/ChainItemUtils';

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

export const getCurrentChainId = (chainId?: ChainId) => {
  // using only for local development and stage
  return (
    chainId ?? (window?.location?.pathname?.split('/chain/')?.[1] as ChainId)
  );
};

export const useSpinner = (chainId: ChainId) => {
  const hasAnkr = useHasAnkrsInfo(chainId);

  return hasAnkr ? <AnkrSpinner /> : <Spinner />;
};
