import { resetRequests } from '@redux-requests/core';
import { useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { calcTotalAmount } from 'modules/stake-matic/common/utils/calcTotalAmount';
import {
  getStakeStats,
  IGetStakeStatsData,
} from 'modules/stake-matic/polygon/actions/getStakeStats';
import { stake } from 'modules/stake-matic/polygon/actions/stake';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

import { useSelectedToken } from './useSelectedToken';

interface IUseStakeFormData {
  acPoolLiquidityInMATIC: BigNumber;
  acRatio: BigNumber;
  extraValidation: (
    data: Partial<IStakeFormPayload>,
    errors: FormErrors<IStakeFormPayload>,
  ) => FormErrors<IStakeFormPayload>;
  getStatsData: IGetStakeStatsData | null;
  getStatsError?: Error;
  isGetStatsLoading: boolean;
  isStakeLoading: boolean;
  stakeFeePct: BigNumber | null;
  tokenIn: string;
  tokenOut: TMaticSyntToken;
  totalAmount: BigNumber;
  onFormChange: (data: IStakeFormPayload, isInvalid: boolean) => void;
  onFormSubmit: (data: IStakeSubmitPayload) => void;
  onTokenSelect: (token: TMaticSyntToken) => () => void;
}

export const useStakeForm = (): IUseStakeFormData => {
  const dispatch = useAppDispatch();

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { selectedToken, handleTokenSelect } = useSelectedToken();

  const {
    data: getStatsData,
    error: getStatsError,
    loading: isGetStatsLoading,
  } = useQuery({
    type: getStakeStats,
  });

  const [amount, setAmount] = useState(ZERO);
  const [isError, setIsError] = useState(false);

  const acPoolLiquidityInMATIC = getStatsData?.acPoolLiquidityInMATIC ?? ZERO;
  const acRatio = getStatsData?.acRatio ?? ZERO;
  const stakeFeePct = getStatsData?.stakeFeePct.isGreaterThan(0)
    ? getStatsData?.stakeFeePct
    : null;

  const totalAmount = useMemo(() => {
    if (
      isError ||
      !getStatsData?.maticBalance ||
      getStatsData.maticBalance.isLessThan(amount)
    ) {
      return ZERO;
    }

    const amountVal = stakeFeePct
      ? amount.minus(amount.multipliedBy(stakeFeePct))
      : amount;

    if (amountVal.isLessThanOrEqualTo(0)) {
      return ZERO;
    }

    return calcTotalAmount({
      aMATICcRatio: acRatio,
      amount: amountVal,
      balance: getStatsData.maticBalance,
      selectedToken,
    });
  }, [
    acRatio,
    amount,
    getStatsData?.maticBalance,
    isError,
    selectedToken,
    stakeFeePct,
  ]);

  const extraValidation = (
    { amount: userAmount }: Partial<IStakeFormPayload>,
    errors: FormErrors<IStakeFormPayload>,
  ): FormErrors<IStakeFormPayload> => {
    if (typeof userAmount === 'string') {
      const currAmount = new BigNumber(userAmount);

      if (currAmount.isGreaterThan(acPoolLiquidityInMATIC)) {
        errors.amount = t('stake-matic-polygon.validation.low-pool');
      }
    }

    return errors;
  };

  const onFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    // TODO: https://ankrnetwork.atlassian.net/browse/STAKAN-1482
    isInvalid: boolean,
  ): void => {
    setIsError(isInvalid);

    setAmount(formAmount ? new BigNumber(formAmount) : ZERO);
  };

  const onFormSubmit = (data: IStakeSubmitPayload): void => {
    dispatch(
      stake({
        amount: new BigNumber(data.amount),
        token: selectedToken,
      }),
    );
  };

  const onTokenSelect = (token: TMaticSyntToken) => (): void => {
    handleTokenSelect(token);
  };

  useProviderEffect(() => {
    dispatch(getStakeStats());

    return () => {
      dispatch(resetRequests([getStakeStats.toString()]));
    };
  }, [dispatch]);

  return {
    acPoolLiquidityInMATIC,
    acRatio,
    extraValidation,
    getStatsData,
    getStatsError,
    isGetStatsLoading,
    isStakeLoading,
    stakeFeePct,
    tokenIn: Token.MATIC,
    tokenOut: selectedToken,
    totalAmount,
    onFormChange,
    onFormSubmit,
    onTokenSelect,
  };
};
