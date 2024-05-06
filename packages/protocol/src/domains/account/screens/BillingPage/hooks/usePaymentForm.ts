import { Web3Address } from 'multirpc-sdk';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  createDepositTxState,
  setIsProcessing,
} from 'domains/account/store/accountTopUpSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePaymentForm as usePaymentFromBase } from 'modules/billing/components/PaymentForm/hooks/usePaymentForm';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';

export const usePaymentForm = () => {
  const { address: authAddress } = useAuth();

  const { walletAddress: connectedAddress } = useWalletAddress();

  const txAddress = connectedAddress || authAddress;

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
    if (txAddress) {
      dispatch(setIsProcessing({ address: txAddress, isProcessing: false }));
    }
  }, [dispatch, txAddress]);

  const paymentFormProps = usePaymentFromBase({
    onConnectAccount,
    onCryptoPaymentFlowClose,
  });

  return { paymentFormProps };
};
