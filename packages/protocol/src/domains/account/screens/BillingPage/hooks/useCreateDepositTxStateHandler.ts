import { Web3Address } from 'multirpc-sdk';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { createDepositTxState } from 'domains/account/store/accountTopUpSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useCreateDepositTxStateHandler = () => {
  const { address: authAddress } = useAuth();

  const dispatch = useDispatch();

  const handleCreateDepositTxState = useCallback(
    (depositAddress: Web3Address) =>
      dispatch(
        createDepositTxState({
          authAddress,
          depositAddress,
        }),
      ),
    [authAddress, dispatch],
  );

  return { handleCreateDepositTxState };
};
