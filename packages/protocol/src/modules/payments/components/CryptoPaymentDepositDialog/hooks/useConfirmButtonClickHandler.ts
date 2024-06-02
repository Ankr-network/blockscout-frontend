import { EBlockchain, ethNetworkIdByBlockchainMap } from 'multirpc-sdk';
import { EEthereumNetworkId } from '@ankr.com/provider';
import { useCallback } from 'react';

import { ECryptoDepositStepStatus } from 'modules/payments/types';

export interface IUseConfirmButtonClickHandlerProps {
  allowanceStepStatus: ECryptoDepositStepStatus;
  handleDeposit: () => void;
  handleSendAllowance: () => void;
  handleSwitchNetwork: (network: EEthereumNetworkId) => void;
  isWrongNetwork: boolean;
  network: EBlockchain;
}

export const useConfirmButtonClickHandler = ({
  allowanceStepStatus,
  handleDeposit,
  handleSendAllowance,
  handleSwitchNetwork,
  isWrongNetwork,
  network,
}: IUseConfirmButtonClickHandlerProps) => {
  const onConfirmButtonClick = useCallback(() => {
    if (isWrongNetwork) {
      return handleSwitchNetwork(ethNetworkIdByBlockchainMap[network]);
    }

    const hasAllowanceConfirmationStatus =
      allowanceStepStatus === ECryptoDepositStepStatus.Confirmation;

    const hasAllowanceError =
      allowanceStepStatus === ECryptoDepositStepStatus.Error;

    if (hasAllowanceConfirmationStatus || hasAllowanceError) {
      return handleSendAllowance();
    }

    return handleDeposit();
  }, [
    allowanceStepStatus,
    handleDeposit,
    handleSendAllowance,
    handleSwitchNetwork,
    isWrongNetwork,
    network,
  ]);

  return { onConfirmButtonClick };
};
