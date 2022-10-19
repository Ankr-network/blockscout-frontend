import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider-core';
import { useMemo } from 'react';

import { t } from 'common';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { TIcon, TNetworkIconMap } from 'modules/common/icons';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { PolygonIcon } from 'uiKit/Icons/Polygon';

interface UseNetworkTitleData {
  Icon: TIcon | null;
  text: string | null;
}

const ICONS_MAP: TNetworkIconMap = {
  1: EthIcon,
  5: EthIcon,
  137: PolygonIcon,
  80001: PolygonIcon,
};

export const useNetworkTitle = (): UseNetworkTitleData => {
  const { chainId } = useAuth(AvailableWriteProviders.ethCompatible);

  const Icon = useMemo(
    () =>
      typeof chainId === 'number'
        ? ICONS_MAP[chainId as EEthereumNetworkId] ?? null
        : null,
    [chainId],
  );

  const text = useMemo(() => {
    const val = typeof chainId === 'number' ? t(`chain.${chainId}`) : null;

    return val?.includes('chain.') ? null : val;
  }, [chainId]);

  return {
    Icon,
    text,
  };
};
