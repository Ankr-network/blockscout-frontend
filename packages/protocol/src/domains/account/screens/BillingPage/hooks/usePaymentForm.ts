import { Web3Address } from 'multirpc-sdk';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { createDepositTxState } from 'domains/account/store/accountTopUpSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePaymentForm as usePaymentFromBase } from 'modules/billing/components/PaymentForm/hooks/usePaymentForm';

export const usePaymentForm = () => {
  const { address: authAddress } = useAuth();

  const dispatch = useDispatch();

  const onConnectAccount = useCallback(
    (depositAddress: Web3Address) =>
      dispatch(
        createDepositTxState({
          authAddress,
          depositAddress,
        }),
      ),
    [authAddress, dispatch],
  );

  const paymentFormProps = usePaymentFromBase({ onConnectAccount });

  return { paymentFormProps };
};
