import { isMobile } from 'web3modal';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { featuresConfig } from 'modules/common/const';
import { ExtraWriteProviders } from 'modules/common/types';
import { EKnownDialogs, useDialog } from 'modules/dialogs';

import { useConnectedData } from '../../hooks/useConnectedData';
import { ConnectTileCoin98 } from '../ConnectTileCoin98';
import { ConnectTileCoinbase } from '../ConnectTileCoinbase';
import { ConnectTileHuobi } from '../ConnectTileHuobi';
import { ConnectTileImToken } from '../ConnectTileImToken';
import { ConnectTileMath } from '../ConnectTileMath';
import { ConnectTileMetaMask } from '../ConnectTileMetaMask';
import { ConnectTileOKX } from '../ConnectTileOkx';
import { ConnectTilePolkadot } from '../ConnectTilePolkadot';
import { ConnectTileTrust, ConnectTileTrustViaWC } from '../ConnectTileTrust';
import { ConnectTileWalletConnect } from '../ConnectTileWalletConnect';

import { ConnectWalletsModalUI } from './ConnectWalletsModalUI';

export const ConnectWalletsModal = (): JSX.Element => {
  const { isOpened, handleClose } = useDialog(EKnownDialogs.connect);

  const {
    isLoading: isLoadingEthCompatible,
    isConnected: isConnectedEthCompatible,
  } = useConnectedData(AvailableWriteProviders.ethCompatible);

  const {
    isLoading: isLoadingPolkadotCompatible,
    isConnected: isConnectedPolkadotCompatible,
  } = useConnectedData(ExtraWriteProviders.polkadotCompatible);

  const isMobileDevice = isMobile();

  const renderedEthButtons = !isConnectedEthCompatible
    ? ((
        <>
          {!isMobileDevice && <ConnectTileMetaMask />}

          {featuresConfig.isCoin98SupportActive && !isMobileDevice && (
            <ConnectTileCoin98 />
          )}

          <ConnectTileCoinbase />

          {isMobileDevice ? <ConnectTileTrustViaWC /> : <ConnectTileTrust />}

          <ConnectTileWalletConnect />

          <ConnectTileImToken />

          <ConnectTileMath />

          <ConnectTileHuobi />

          {!isMobileDevice && <ConnectTileOKX />}
        </>
      ).props.children as JSX.Element[])
    : null;

  return (
    <ConnectWalletsModalUI
      isLoading={isLoadingEthCompatible || isLoadingPolkadotCompatible}
      isOpen={isOpened}
      onClose={handleClose}
    >
      {renderedEthButtons}

      {!isConnectedPolkadotCompatible && !isMobileDevice && (
        <ConnectTilePolkadot />
      )}
    </ConnectWalletsModalUI>
  );
};
