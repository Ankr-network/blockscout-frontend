import { sleep } from '@ankr.com/common';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ExtraWriteProviders } from 'modules/common/types';
import { EKnownDialogs, useDialog } from 'modules/dialogs';

const providerId = ExtraWriteProviders.suiCompatible;

interface IUseGuardSuiRouteProps {
  isOpenConnectInstantly: boolean;
}

interface IUseGuardSuiRoute {
  isConnected: boolean;
  handleOpen: () => void;
}

export const useGuardSuiRoute = ({
  isOpenConnectInstantly = true,
}: IUseGuardSuiRouteProps): IUseGuardSuiRoute => {
  const { handleOpen } = useDialog(EKnownDialogs.connect);
  const { isConnected } = useConnectedData(providerId);

  useProviderEffect(() => {
    (async () => {
      if (!isConnected && isOpenConnectInstantly) {
        // todo: should be removed after removal of double guard for sui
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
