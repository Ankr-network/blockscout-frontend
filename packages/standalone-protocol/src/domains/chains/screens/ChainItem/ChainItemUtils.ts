import { useEffect, useMemo } from 'react';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { ChainId, POLYGON_ZKEVM_CHAIN_NAME } from 'domains/chains/api/chain';

const renderChainName = (chainId: ChainId) => {
  if (chainId === ChainId.POLYGON_ZKEVM) {
    return POLYGON_ZKEVM_CHAIN_NAME;
  }

  return chainId.charAt(0).toUpperCase() + chainId.slice(1);
};

export const useMetatags = (chainId: ChainId) => {
  useEffect(() => {
    const name = renderChainName(chainId);
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
      return false;

    case ChainId.Near:
    case ChainId.Arbitrum:
      return false;

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

export const hasAnkrsInfo = (chainId: ChainId) => {
  return ![
    ChainId.Polygon,
    ChainId.BSC,
    ChainId.Fantom,
    ChainId.Secret,
    ChainId.Klaytn,
  ].includes(chainId);
};

export const useHasAnkrsInfo = (chainId: ChainId) => {
  return useMemo(() => hasAnkrsInfo(chainId), [chainId]);
};
