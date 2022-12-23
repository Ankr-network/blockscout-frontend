import { useCallback } from 'react';

import { AvailableWriteProviders, EWalletId } from '@ankr.com/provider';

import { useConnectEthCompatibleMutation } from 'modules/auth/eth/actions/connectEthCompatible';
import { useConnectPolkadotMutation } from 'modules/auth/polkadot/actions/connectPolkadot';
import {
  AvailableStakingWriteProviders,
  ExtraWriteProviders,
} from 'modules/common/types';
import { EKnownDialogs, useDialog } from 'modules/dialogs';

import { useConnectSuiMutation } from '../../sui/actions/connectSui';

interface IUseConnectForModalArgs {
  walletId?: EWalletId;
  provider?: AvailableStakingWriteProviders;
}

interface IUseConnectForModal {
  handleConnect: () => Promise<void>;
}

export const useConnectForModal = ({
  walletId,
  provider = AvailableWriteProviders.ethCompatible,
}: IUseConnectForModalArgs): IUseConnectForModal => {
  const { handleClose } = useDialog(EKnownDialogs.connect);

  const [connectEthCompatible] = useConnectEthCompatibleMutation({
    fixedCacheKey: AvailableWriteProviders.ethCompatible,
  });

  const [connectPolkadot] = useConnectPolkadotMutation({
    fixedCacheKey: ExtraWriteProviders.polkadotCompatible,
  });

  const [connectSui] = useConnectSuiMutation({
    fixedCacheKey: ExtraWriteProviders.suiCompatible,
  });

  const handleConnect = useCallback(async () => {
    let response;
    switch (provider) {
      case AvailableWriteProviders.ethCompatible: {
        response = await connectEthCompatible({ wallet: walletId });
        break;
      }
      case ExtraWriteProviders.polkadotCompatible: {
        response = await connectPolkadot();
        break;
      }
      case ExtraWriteProviders.suiCompatible: {
        response = await connectSui();
        break;
      }
      default:
        break;
    }

    if (response && 'data' in response) {
      handleClose();
    }
  }, [
    connectEthCompatible,
    connectPolkadot,
    connectSui,
    handleClose,
    provider,
    walletId,
  ]);

  return {
    handleConnect,
  };
};
