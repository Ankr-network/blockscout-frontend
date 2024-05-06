import { useCallback } from 'react';
import { EEthereumNetworkId } from '@ankr.com/provider';
import { EBlockchain, ethNetworkIdByBlockchainMap } from 'multirpc-sdk';

import { ECryptoDepositStepStatus } from 'modules/billing/types';

export interface IUseConfirmButtonClickHandlerProps {
  approvalError?: string;
  approvalStatus: ECryptoDepositStepStatus;
  network: EBlockchain;
  isWrongNetwork: boolean;
  handleSwitchNetwork: (network: EEthereumNetworkId) => void;
  handleDeposit: () => void;
  handleSendAllowance: () => void;
}

export const useConfirmButtonClickHandler = ({
  approvalError,
  approvalStatus,
  network,
  isWrongNetwork,
  handleSwitchNetwork,
  handleDeposit,
  handleSendAllowance,
}: IUseConfirmButtonClickHandlerProps) => {
  const onConfirmButtonClick = useCallback(() => {
    if (isWrongNetwork) {
      return handleSwitchNetwork(ethNetworkIdByBlockchainMap[network]);
    }

    const isApprovalConfirmationStatus =
      approvalStatus === ECryptoDepositStepStatus.Confirmation;

    const hasApprovalError = Boolean(approvalError);

    if (isApprovalConfirmationStatus || hasApprovalError) {
      return handleSendAllowance();
    }

    return handleDeposit();
  }, [
    approvalError,
    approvalStatus,
    handleDeposit,
    handleSendAllowance,
    handleSwitchNetwork,
    isWrongNetwork,
    network,
  ]);

  return { onConfirmButtonClick };
};
