import { Web3Address } from 'multirpc-sdk';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  createDepositTxState,
  setIsProcessing,
} from 'domains/account/store/accountTopUpSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';
import { usePaymentForm as usePaymentFromBase } from 'modules/billing/components/PaymentForm/hooks/usePaymentForm';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const usePaymentForm = () => {
  const { address: authAddress } = useAuth();

  const { connectedAddress } = useConnectedAddress();

  const { selectedGroupAddress } = useSelectedUserGroup();

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

  const onCryptoPaymentFlowClose = useCallback(() => {
    if (selectedGroupAddress) {
      dispatch(
        setIsProcessing({
          address: selectedGroupAddress,
          isProcessing: false,
        }),
      );

      return;
    }

    if (connectedAddress) {
      dispatch(
        setIsProcessing({
          address: connectedAddress,
          isProcessing: false,
        }),
      );
    }
  }, [connectedAddress, dispatch, selectedGroupAddress]);

  const paymentFormProps = usePaymentFromBase({
    onConnectAccount,
    onCryptoPaymentFlowClose,
  });

  return { paymentFormProps };
};
