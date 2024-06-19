import { EBlockchain, ethNetworkIdByBlockchainMap } from 'multirpc-sdk';
import { useCallback } from 'react';

import { ECryptoDepositStepStatus } from 'modules/payments/types';
import { THandleNetworkSwitch } from 'modules/common/hooks/useNetworkGuard';

export interface IUseConfirmButtonClickHandlerProps {
  allowanceStepStatus: ECryptoDepositStepStatus;
  handleDeposit: () => void;
  handleFetchAllowance: () => Promise<void>;
  handleSendAllowance: () => Promise<void>;
  handleNetworkSwitch?: THandleNetworkSwitch;
  isNetworkWrong?: boolean;
  network: EBlockchain;
}

export const useConfirmButtonClickHandler = ({
  allowanceStepStatus,
  handleDeposit,
  handleFetchAllowance,
  handleNetworkSwitch,
  handleSendAllowance,
  isNetworkWrong,
  network,
}: IUseConfirmButtonClickHandlerProps) => {
  const onConfirmButtonClick = useCallback(async () => {
    if (isNetworkWrong) {
      return handleNetworkSwitch?.(ethNetworkIdByBlockchainMap[network]);
    }

    const hasAllowanceInitializingStatus =
      allowanceStepStatus === ECryptoDepositStepStatus.Initializing;

    const hasAllowanceError =
      allowanceStepStatus === ECryptoDepositStepStatus.Error;

    if (hasAllowanceInitializingStatus || hasAllowanceError) {
      await handleSendAllowance();

      return handleFetchAllowance();
    }

    return handleDeposit();
  }, [
    allowanceStepStatus,
    handleDeposit,
    handleFetchAllowance,
    handleSendAllowance,
    handleNetworkSwitch,
    isNetworkWrong,
    network,
  ]);

  return { onConfirmButtonClick };
};
