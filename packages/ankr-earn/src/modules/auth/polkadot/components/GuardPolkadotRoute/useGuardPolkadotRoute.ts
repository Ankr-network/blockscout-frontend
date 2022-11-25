import { sleep } from '@ankr.com/common';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ExtraWriteProviders } from 'modules/common/types';
import { EKnownDialogs, useDialog } from 'modules/dialogs';

const providerId = ExtraWriteProviders.polkadotCompatible;

interface IUseGuardPolkadotRouteProps {
  isOpenConnectInstantly: boolean;
}

interface IUseGuardPolkadotRoute {
  isConnected: boolean;
  handleOpen: () => void;
}

export const useGuardPolkadotRoute = ({
  isOpenConnectInstantly = true,
}: IUseGuardPolkadotRouteProps): IUseGuardPolkadotRoute => {
  const { handleOpen } = useDialog(EKnownDialogs.connect);
  const { isConnected } = useConnectedData(providerId);

  useProviderEffect(() => {
    (async () => {
      if (!isConnected && isOpenConnectInstantly) {
        // todo: should be removed after removal of double guard for polkadot
        await sleep(10);
        handleOpen();
      }
    })();
  }, [handleOpen, isConnected, isOpenConnectInstantly]);

  return {
    isConnected,
    handleOpen,
  };
};
