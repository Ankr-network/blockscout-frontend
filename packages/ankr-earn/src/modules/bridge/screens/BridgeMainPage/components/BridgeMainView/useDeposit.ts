import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { deposit, IDepositArgs } from 'modules/bridge/actions/deposit';
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
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading: isDepositLoading } = useQuery({
    type: deposit,
  });

  const depositActionName = deposit.toString();

  const { isLoading: isReceiptLoading, actionName: receiptActionName } =
    useTxReceipt(depositActionName);

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

    dispatchRequest(deposit(options));
  }, [amount, dispatchRequest, fromChainId, onSuccess, toChainId, token]);

  useEffect(() => {
    return () => {
      dispatch(resetRequests([receiptActionName, depositActionName]));
    };
  }, [depositActionName, dispatch, receiptActionName]);

  return {
    isLoading: isReceiptLoading || isDepositLoading,
    onClick,
  };
};
