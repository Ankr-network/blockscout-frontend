import { EBlockchain, ethNetworkIdByBlockchainMap } from 'multirpc-sdk';
import { EEthereumNetworkId } from '@ankr.com/provider';
import { useCallback } from 'react';

import { ECryptoDepositStepStatus } from 'modules/payments/types';

export interface IUseConfirmButtonClickHandlerProps {
  allowanceStepStatus: ECryptoDepositStepStatus;
  handleDeposit: () => void;
  handleFetchAllowance: () => Promise<void>;
  handleSendAllowance: () => Promise<void>;
  handleSwitchNetwork: (network: EEthereumNetworkId) => void;
  isWrongNetwork: boolean;
  network: EBlockchain;
}

export const useConfirmButtonClickHandler = ({
  allowanceStepStatus,
  handleDeposit,
  handleFetchAllowance,
  handleSendAllowance,
  handleSwitchNetwork,
  isWrongNetwork,
  network,
}: IUseConfirmButtonClickHandlerProps) => {
  const onConfirmButtonClick = useCallback(async () => {
    if (isWrongNetwork) {
      return handleSwitchNetwork(ethNetworkIdByBlockchainMap[network]);
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
    handleSwitchNetwork,
    isWrongNetwork,
    network,
  ]);

  return { onConfirmButtonClick };
};
