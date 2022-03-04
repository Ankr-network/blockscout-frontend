import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';

import { ZERO } from 'modules/common/const';
import { Milliseconds } from 'modules/common/types';
import { RoutesConfig } from 'modules/dashboard/Routes';
import { getBurnFee } from 'modules/stake-fantom/actions/getBurnFee';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { unstake } from 'modules/stake-fantom/actions/unstake';
import {
  IUnstakeDialogProps,
  IUnstakeFormValues,
} from 'modules/stake/components/UnstakeDialog';
import { useAppDispatch } from 'store/useAppDispatch';

const DEBOUNCE_TIME: Milliseconds = 1_000;

interface IUseUnstakeDialog
  extends Pick<IUnstakeDialogProps, 'onSubmit' | 'onChange'> {
  submitDisabled: boolean;
  isBalanceLoading: boolean;
  isBurnFeeLoading: boolean;
  isLoading: boolean;
  burnFee: BigNumber;
  balance: BigNumber;
  closeHref: string;
}

export const useUnstakeDialog = (
  openSuccess: () => void,
): IUseUnstakeDialog => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useAppDispatch();
  const { data: commonData, loading: isBalanceLoading } = useQuery({
    type: getCommonData,
  });
  const { data: burnFeeData, loading: isBurnFeeLoading } = useQuery({
    type: getBurnFee,
  });

  const { loading: isUnstakeLoading } = useMutation({
    type: unstake,
  });

  const submitDisabled = isBalanceLoading || isUnstakeLoading;
  const balance = commonData?.aFTMbBalance ?? ZERO;
  const burnFee = burnFeeData ?? ZERO;

  const onSubmit = useCallback(
    ({ amount }: IUnstakeFormValues) => {
      if (!amount) {
        return;
      }

      const resultAmount = new BigNumber(amount);

      dispatchRequest(unstake(resultAmount)).then(({ error }) => {
        if (!error) {
          openSuccess();
        }
      });
    },
    [dispatchRequest, openSuccess],
  );

  const onChange = useCallback(
    ({ amount }: IUnstakeFormValues, invalid: boolean) => {
      if (invalid) {
        dispatch(resetRequests([getBurnFee.toString()]));
      } else if (amount) {
        const readyAmount = new BigNumber(amount);
        dispatch(getBurnFee(readyAmount));
      }
    },
    [dispatch],
  );

  const debouncedOnChange = useDebouncedCallback(onChange, DEBOUNCE_TIME);

  return {
    submitDisabled,
    isBalanceLoading,
    isBurnFeeLoading,
    isLoading: isUnstakeLoading,
    balance,
    burnFee,
    closeHref: RoutesConfig.dashboard.generatePath(),
    onSubmit,
    onChange: debouncedOnChange,
  };
};
