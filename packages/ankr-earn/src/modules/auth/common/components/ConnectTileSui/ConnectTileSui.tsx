import { t } from '@ankr.com/common';
import { useMemo } from 'react';
import { DEFAULT_WALLET_NAME, SuiProvider } from 'sui';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { ExtraWriteProviders } from 'modules/common/types';

import { useConnectForModal } from '../../hooks/useConnectForModal';
import { ConnectTile } from '../ConnectTile/ConnectTile';

import { ReactComponent as SuiIcon } from './assets/sui-icon.svg';

const DOWNLOAD_SUI_URL = 'https://docs.sui.io/explore/wallet-browser';

export const ConnectTileSui = (): JSX.Element => {
  const { handleConnect } = useConnectForModal({
    provider: ExtraWriteProviders.suiCompatible,
  });

  const isInjected = SuiProvider.isInjected();

  const isDisabled = useMemo(() => {
    const providerManager = ProviderManagerSingleton.getInstance();
    const ethProvider = providerManager.getWriteProviderById(
      AvailableWriteProviders.ethCompatible,
    );

    return !ethProvider?.isConnected();
  }, []);

  return (
    <ConnectTile
      href={isInjected ? undefined : DOWNLOAD_SUI_URL}
      iconSlot={<SuiIcon />}
      isDisabled={isDisabled}
      title={DEFAULT_WALLET_NAME}
      tooltip={isDisabled ? t('wallets.tooltips.sui') : undefined}
      onClick={handleConnect}
    />
  );
};
