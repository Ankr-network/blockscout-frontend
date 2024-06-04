import { ICryptoTransaction } from '../types';
import { useDeposit } from './useDeposit';
import { useSendAllowance } from './useSendAllowance';
import { useWaitForAllowanceConfirmation } from './useWaitForAllowanceConfirmation';
import { useWaitForDepositConfirmation } from './useWaitForDepositConfirmation';

export interface IUseCryptoPaymentProps {
  tx: ICryptoTransaction;
}

export const useCryptoPayment = ({ tx }: IUseCryptoPaymentProps) => {
  const { handleSendAllowance, isAllowanceSending } = useSendAllowance({ tx });
  const { handleWaitForAllowanceConfirmation, isAllowanceConfirming } =
    useWaitForAllowanceConfirmation({ tx });

  const { handleDeposit, isDepositing: isDepositSending } = useDeposit({ tx });
  const { handleWaitForDepositConfirmation, isDepositConfirming } =
    useWaitForDepositConfirmation({ tx });

  const isApproving = isAllowanceSending || isAllowanceConfirming;
  const isDepositing = isDepositSending || isDepositConfirming;
  const isPending = isApproving || isDepositing;

  return {
    handleDeposit,
    handleSendAllowance,
    handleWaitForAllowanceConfirmation,
    handleWaitForDepositConfirmation,
    isApproving,
    isDepositing,
    isPending,
  };
};
