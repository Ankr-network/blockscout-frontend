import { ICryptoTransaction } from 'modules/payments/types';
import {
  selectAllowanceStepStatus,
  selectCryptoDepositStep,
  selectDepositStepStatus,
  selectIsCryptoTxOngoing,
} from 'modules/payments/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

export interface IUseCryptoPaymentDepositStepStateProps {
  tx: ICryptoTransaction;
}

export const useCryptoPaymentDepositStepState = ({
  tx: { id: txId },
}: IUseCryptoPaymentDepositStepStateProps) => {
  const step = useAppSelector(state => selectCryptoDepositStep(state, txId));

  const allowanceStepStatus = useAppSelector(state =>
    selectAllowanceStepStatus(state, txId),
  );
  const depositStepStatus = useAppSelector(state =>
    selectDepositStepStatus(state, txId),
  );

  const isOngoingTx = useAppSelector(state =>
    selectIsCryptoTxOngoing(state, txId),
  );

  return { allowanceStepStatus, depositStepStatus, isOngoingTx, step };
};
