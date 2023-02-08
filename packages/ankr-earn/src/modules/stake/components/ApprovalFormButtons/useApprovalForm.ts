import { resetRequests } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ZERO } from '@ankr.com/staking-sdk';

import { MAX_UINT256 } from 'modules/common/const';
import { useTxReceipt } from 'modules/common/hooks/useTxReceipt';
import { IUseApprovalForm } from 'modules/stake/components/ApprovalFormButtons/types';

import {
  ApprovalOption,
  IApprovalSettingsFormValues,
} from '../ApprovalSettingsDialog/types';

export interface IApprovalFormArgs {
  approve: (amount: BigNumber) => void;
  isApproveLoading: boolean;
  resetApprove: VoidFunction;
  getAllowance: VoidFunction;
  amount?: BigNumber;
  receiptName: string;
  initialAllowance?: BigNumber;
  isAllowanceLoading: boolean;
  shouldFetchAllowance?: boolean;
  isApproveError: boolean;
}

type TApproveFormCallback = (params: IApprovalSettingsFormValues) => void;

export const useApprovalForm = ({
  amount = ZERO,
  initialAllowance = ZERO,
  isAllowanceLoading,
  isApproveLoading,
  receiptName,
  approve,
  resetApprove,
  getAllowance,
  shouldFetchAllowance = true,
  isApproveError,
}: IApprovalFormArgs): IUseApprovalForm => {
  const dispatch = useDispatch();

  const { isLoading: isTxReceiptLoading, actionName: txReceiptActionName } =
    useTxReceipt(receiptName);

  const [allowance, setAllowance] = useState(ZERO);

  const onApprovalSettingsFormSubmit = useCallback<TApproveFormCallback>(
    (params: IApprovalSettingsFormValues): void => {
      if (params.type === ApprovalOption.UNLIMITED) {
        approve(MAX_UINT256);
      } else if (params.type === ApprovalOption.CUSTOM) {
        const readyAmount = params.amount ? new BigNumber(params.amount) : ZERO;
        approve(readyAmount);
      }
    },
    [approve],
  );

  const approvalSettingsMode = useMemo<ApprovalOption>(() => {
    if (allowance?.isGreaterThanOrEqualTo(MAX_UINT256.dividedBy(2))) {
      return ApprovalOption.UNLIMITED;
    }
    if (allowance?.isGreaterThan(ZERO)) {
      return ApprovalOption.CUSTOM;
    }
    return ApprovalOption.CURRENT;
  }, [allowance]);

  useEffect(() => {
    if (shouldFetchAllowance) {
      getAllowance();
    }
    return () => {
      resetApprove();
      dispatch(resetRequests([txReceiptActionName]));
    };
  }, [
    dispatch,
    getAllowance,
    resetApprove,
    shouldFetchAllowance,
    txReceiptActionName,
  ]);

  const allowanceValue = initialAllowance.toString();

  useEffect(() => {
    if (!isAllowanceLoading) {
      setAllowance(new BigNumber(allowanceValue) ?? ZERO);
    }
  }, [isAllowanceLoading, setAllowance, allowanceValue]);

  useEffect(() => {
    if (!isApproveLoading && !isApproveError) {
      setAllowance(amount);
    }
  }, [isApproveLoading, setAllowance, isApproveError, amount]);

  return {
    allowance,
    approvalSettingsMode,
    isApproveLoading:
      isAllowanceLoading || isApproveLoading || isTxReceiptLoading,
    onApprovalSettingsFormSubmit,
    onApproveSubmit: approve,
  };
};
