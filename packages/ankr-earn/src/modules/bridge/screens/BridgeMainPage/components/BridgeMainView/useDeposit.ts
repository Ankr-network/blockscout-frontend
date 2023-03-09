import { resetRequests } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import {
  IDepositArgs,
  useBridgeDepositMutation,
} from 'modules/bridge/actions/bridgeDeposit';
import { DEPOSIT_ACTION_NAME } from 'modules/bridge/const';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import { getWithdrawalQuery } from 'modules/bridge/utils/getWithdrawalQuery';
import { SupportedChainIDS } from 'modules/common/const';
import { useTxReceipt } from 'modules/common/hooks/useTxReceipt';

export interface IUseDepositArgs {
  fromChainId: SupportedChainIDS;
  toChainId: SupportedChainIDS;
  token: AvailableBridgeTokens;
  amount?: BigNumber;
}

interface IUseDeposit {
  isLoading: boolean;
  onClick: () => void;
}

export const useDeposit = ({
  amount,
  fromChainId,
  toChainId,
  token,
}: IUseDepositArgs): IUseDeposit => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [deposit, { isLoading: isDepositLoading, reset: resetDeposit }] =
    useBridgeDepositMutation();

  const { isLoading: isReceiptLoading, actionName: receiptActionName } =
    useTxReceipt(DEPOSIT_ACTION_NAME);

  const onSuccess: IDepositArgs['onSuccess'] = useCallback(
    ({ data }) => {
      if (!data) return;

      // todo: should be removed in favor of a separate route for this
      history.push({
        search: `?${getWithdrawalQuery(
          {
            tx: data.transactionHash,
            amount: amount?.toString(),
            token,
            chainIdFrom: fromChainId,
            chainIdTo: toChainId,
          },
          document.location.search,
        )}`,
      });
    },
    [amount, fromChainId, history, toChainId, token],
  );

  const onClick = useCallback(() => {
    if (!amount) {
      return;
    }

    const options: IDepositArgs = {
      fromChainId,
      toChainId,
      amount,
      token,
      onSuccess,
    };

    deposit(options);
  }, [amount, deposit, fromChainId, onSuccess, toChainId, token]);

  useEffect(() => {
    return () => {
      resetDeposit();
      dispatch(resetRequests([receiptActionName]));
    };
  }, [dispatch, receiptActionName, resetDeposit]);

  return {
    isLoading: isReceiptLoading || isDepositLoading,
    onClick,
  };
};
