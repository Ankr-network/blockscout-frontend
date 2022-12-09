import { useCallback } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import {
  AvailableStakingWriteProviders,
  ExtraWriteProviders,
} from 'modules/common/types';
import { EKnownDialogs, useDialog } from 'modules/dialogs';

import { useConnectMutation } from '../actions/connect';
import { TWalletId } from '../types';

interface IUseConnectForModalArgs {
  walletId: TWalletId;
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
  const [connectEthCompatible] = useConnectMutation({
    fixedCacheKey: AvailableWriteProviders.ethCompatible,
  });
  const [connectPolkadot] = useConnectMutation({
    fixedCacheKey: ExtraWriteProviders.polkadotCompatible,
  });
  const [connectSui] = useConnectMutation({
    fixedCacheKey: ExtraWriteProviders.suiCompatible,
  });
  const handleConnect = useCallback(async () => {
    let response;
    switch (provider) {
      case AvailableWriteProviders.ethCompatible: {
        response = await connectEthCompatible({
          providerId: provider,
          wallet: walletId,
        });
        break;
      }
      case ExtraWriteProviders.polkadotCompatible: {
        response = await connectPolkadot({
          providerId: provider,
          wallet: walletId,
        });
        break;
      }
      case ExtraWriteProviders.suiCompatible: {
        response = await connectSui({
          providerId: provider,
          wallet: walletId,
        });
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
