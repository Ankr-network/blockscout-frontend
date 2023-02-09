import { resetRequests } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ZERO } from '@ankr.com/staking-sdk';

import { MAX_SAFE_UINT256, MAX_UINT256 } from 'modules/common/const';
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
  receiptName: string;
  initialAllowance?: BigNumber;
  isAllowanceLoading: boolean;
  shouldFetchAllowance?: boolean;
  isApproveError: boolean;
}

type TApproveFormCallback = (params: IApprovalSettingsFormValues) => void;

export const useApprovalForm = ({
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

  const [allowance, setAllowance] = useState(initialAllowance);

  const allowanceValue = allowance.toString();
  const inittialAllowanceValue = initialAllowance.toString();

  const [requestAllowance, setRequstAllowance] = useState(allowance);

  const onApprovalSettingsFormSubmit = useCallback<TApproveFormCallback>(
    (params: IApprovalSettingsFormValues): void => {
      const allowanceBn = new BigNumber(allowanceValue);
      if (
        params.type === ApprovalOption.UNLIMITED &&
        allowanceBn.isLessThan(MAX_SAFE_UINT256)
      ) {
        approve(MAX_UINT256);
        setRequstAllowance(MAX_UINT256);
      } else if (
        params.type === ApprovalOption.CUSTOM &&
        allowanceBn.toString() !== params.amount
      ) {
        const readyAmount = params.amount ? new BigNumber(params.amount) : ZERO;
        approve(readyAmount);
        setRequstAllowance(readyAmount);
      }
    },
    [approve, allowanceValue],
  );

  const onApproveSubmit = useCallback(
    (amountValue: BigNumber) => {
      approve(amountValue);
      setRequstAllowance(amountValue);
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
      resetApprove();
      dispatch(resetRequests([txReceiptActionName]));
    };
  }, [dispatch, resetApprove, txReceiptActionName]);

  const requestAllowanceValue = requestAllowance.toString();

  useEffect(() => {
    if (!isApproveLoading && !isApproveError) {
      setAllowance(new BigNumber(requestAllowanceValue));
    }
  }, [isApproveLoading, setAllowance, isApproveError, requestAllowanceValue]);

  useEffect(() => {
    if (!isAllowanceLoading) {
      setAllowance(new BigNumber(inittialAllowanceValue));
    }
  }, [setAllowance, inittialAllowanceValue, isAllowanceLoading]);

  return {
    allowance,
    approvalSettingsMode,
    isApproveLoading:
      isAllowanceLoading || isApproveLoading || isTxReceiptLoading,
    onApprovalSettingsFormSubmit,
    onApproveSubmit,
  };
};
