import { useEffect } from 'react';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { ChainId } from 'domains/chains/api/chain';

export const useMetatags = (chainId: ChainId) => {
  useEffect(() => {
    const name = chainId.charAt(0).toUpperCase() + chainId.slice(1);
    const descriptionTag = document.getElementById(
      'meta-description',
    ) as HTMLMetaElement;

    document.title = t('chain-item.meta.title', {
      name,
    });

    if (descriptionTag) {
      descriptionTag.content = t('chain-item.meta.description', {
        name,
      });
    }

    return () => {
      document.title = t('meta.title');

      if (descriptionTag) {
        descriptionTag.content = t('meta.description');
      }
    };
  }, [chainId]);
};

export const hasAnnounce = (chainId: ChainId): boolean => {
  switch (chainId) {
    case ChainId.Polygon:
    case ChainId.Solana:
      return false;

    case ChainId.Near:
    case ChainId.Arbitrum:
      return false;

    default:
      return false;
  }
};

export const hasBanner = (chainId?: string): boolean => {
  switch (chainId) {
    case ChainId.Polygon:
      return true;

    default:
      return false;
  }
};

export const getBannerContent = (chainId?: string): string => {
  switch (chainId) {
    case ChainId.Polygon:
      return t('chain-item.banner.polygon');
    case ChainId.Moonbeam:
      return tHTML('chain-item.banner.moonbeam');

    default:
      return '';
  }
};
