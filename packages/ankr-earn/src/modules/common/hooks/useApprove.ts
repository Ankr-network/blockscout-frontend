import { resetRequests } from '@redux-requests/core';
import { UseMutation } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { MutationDefinition } from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';

import { ZERO } from '@ankr.com/staking-sdk';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { useTxReceipt } from 'modules/common/hooks/useTxReceipt';

interface IUseApproveArgs<MutationType> {
  receiptName: string;
  useApproveMutation: MutationType;
}

interface IUseApprove {
  isLoading: boolean;
  handleApprove: (amount: BigNumber) => void;
  allowance: BigNumber;
}

export interface IApproveMutation {
  amount: BigNumber;
  transactionHash?: string;
}

export const useApprove = ({
  useApproveMutation,
  receiptName,
}: IUseApproveArgs<
  UseMutation<
    MutationDefinition<
      BigNumber,
      BaseQueryFn,
      string,
      { amount?: BigNumber },
      string
    >
  >
>): IUseApprove => {
  const dispatch = useDispatch();

  const [approve, { isLoading: isApproveLoading, reset: resetApprove, data }] =
    useApproveMutation();

  const allowance = data?.amount ?? ZERO;

  const { isLoading: isTxReceiptLoading, actionName: txReceiptActionName } =
    useTxReceipt(receiptName);

  const isLoading = isApproveLoading || isTxReceiptLoading;

  useProviderEffect(() => {
    return () => {
      resetApprove();
      dispatch(resetRequests([txReceiptActionName]));
    };
  }, [dispatch]);

  return {
    isLoading,
    handleApprove: approve,
    allowance,
  };
};
