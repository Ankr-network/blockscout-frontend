import { resetRequests } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ZERO } from '@ankr.com/staking-sdk';

import { MAX_SAFE_UINT256, MAX_UINT256 } from 'modules/common/const';
import { useTxReceipt } from 'modules/common/hooks/useTxReceipt';
import {
  resetAllowance,
  selectAllowance,
} from 'modules/common/store/allowanceSlice';
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
  receiptName: string;
  initialAllowance?: BigNumber;
  isAllowanceLoading: boolean;
  shouldFetchAllowance?: boolean;
  isApproveError: boolean;
}

type TApproveFormCallback = (params: IApprovalSettingsFormValues) => void;

export const useApprovalForm = ({
  isAllowanceLoading,
  isApproveLoading,
  receiptName,
  approve,
  getAllowance,
  shouldFetchAllowance = true,
}: IApprovalFormArgs): IUseApprovalForm => {
  const dispatch = useDispatch();

  const { isLoading: isTxReceiptLoading, actionName: txReceiptActionName } =
    useTxReceipt(receiptName);

  const allowance = useSelector(selectAllowance);

  const allowanceValue = allowance?.toString();

  const onApprovalSettingsFormSubmit = useCallback<TApproveFormCallback>(
    (params: IApprovalSettingsFormValues): void => {
      const allowanceBn = new BigNumber(allowanceValue);
      if (
        params.type === ApprovalOption.UNLIMITED &&
        allowanceBn.isLessThan(MAX_SAFE_UINT256)
      ) {
        approve(MAX_UINT256);
      } else if (
        params.type === ApprovalOption.CUSTOM &&
        allowanceBn.toString() !== params.amount
      ) {
        const readyAmount = params.amount ? new BigNumber(params.amount) : ZERO;
        approve(readyAmount);
      }
    },
    [approve, allowanceValue],
  );

  const onApproveSubmit = useCallback(
    (amountValue: BigNumber) => {
      approve(amountValue);
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
  }, [getAllowance, shouldFetchAllowance]);

  useEffect(() => {
    return () => {
      dispatch(resetAllowance());
      dispatch(resetRequests([txReceiptActionName]));
    };
  }, [dispatch, txReceiptActionName]);

  return {
    allowance,
    approvalSettingsMode,
    isApproveLoading:
      isAllowanceLoading || isApproveLoading || isTxReceiptLoading,
    onApprovalSettingsFormSubmit,
    onApproveSubmit,
  };
};
