import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { DEFAULT_WALLET_NAME, PolkadotProvider } from 'polkadot';

import { getProviderManager } from 'modules/api/getProviderManager';

import { ExtraWriteProviders } from '../../../../common/types';
import { useConnectForModal } from '../../hooks/useConnectForModal';
import { ConnectTile } from '../ConnectTile';

import { ReactComponent as PolkadotIcon } from './assets/polkadot-icon.svg';

const DOWNLOAD_POLKADOT_URL = 'https://polkadot.js.org/extension/';

export const ConnectTilePolkadot = (): JSX.Element => {
  const { handleConnect } = useConnectForModal({
    provider: ExtraWriteProviders.polkadotCompatible,
  });

  const isInjected = PolkadotProvider.isInjected();

  const isDisabled = useMemo(() => {
    const providerManager = getProviderManager();
    const ethProvider = providerManager.getWriteProviderById(
      AvailableWriteProviders.ethCompatible,
    );

    return !ethProvider?.isConnected();
  }, []);

  return (
    <ConnectTile
      href={isInjected ? undefined : DOWNLOAD_POLKADOT_URL}
      iconSlot={<PolkadotIcon />}
      isDisabled={isDisabled}
      title={DEFAULT_WALLET_NAME}
      tooltip={isDisabled ? t('wallets.tooltips.polkadot') : undefined}
      onClick={handleConnect}
    />
  );
};
