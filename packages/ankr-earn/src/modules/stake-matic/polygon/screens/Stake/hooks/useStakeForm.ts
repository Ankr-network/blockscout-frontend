import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import { useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { featuresConfig, ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { calcTotalAmount } from 'modules/stake-matic/common/utils/calcTotalAmount';
import { getCommonData } from 'modules/stake-matic/polygon/actions/getCommonData';
import { getStakeStats } from 'modules/stake-matic/polygon/actions/getStakeStats';
import { stake } from 'modules/stake-matic/polygon/actions/stake';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { getStakeTradeInfoData } from 'modules/stake/actions/getStakeTradeInfoData';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { EOpenOceanNetworks, EOpenOceanTokens } from 'modules/stake/types';
import { useAppDispatch } from 'store/useAppDispatch';

import { useSelectedToken } from './useSelectedToken';

interface IUseStakeFormData {
  acPoolLiquidityInMATIC: BigNumber;
  acRatio: BigNumber;
  amount: BigNumber;
  balance?: BigNumber;
  getStatsError?: Error;
  isGetStatsLoading: boolean;
  isStakeLoading: boolean;
  stakeFeePct: BigNumber | null;
  tokenIn: string;
  tokenOut: TMaticSyntToken;
  totalAmount: BigNumber;
  extraValidation: (
    data: Partial<IStakeFormPayload>,
    errors: FormErrors<IStakeFormPayload>,
  ) => FormErrors<IStakeFormPayload>;
  onFormChange: (data: IStakeFormPayload, isInvalid: boolean) => void;
  onFormSubmit: (data: IStakeSubmitPayload) => void;
  onTokenSelect: (token: TMaticSyntToken) => () => void;
}

const resetMainRequests = () =>
  resetReduxRequests([
    getCommonData.toString(),
    getMetrics.toString(),
    getStakeStats.toString(),
  ]);

const resetStakeTradeInfoRequests = () =>
  resetReduxRequests([getStakeTradeInfoData.toString()]);

export const useStakeForm = (): IUseStakeFormData => {
  const dispatch = useAppDispatch();

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { selectedToken, handleTokenSelect } = useSelectedToken();

  const {
    data: commonData,
    error: commonDataError,
    loading: isCommonDataLoading,
  } = useQuery({
    type: getCommonData,
  });

  const {
    data: getStatsData,
    error: stakeStatsError,
    loading: isStakeStatsLoading,
  } = useQuery({
    type: getStakeStats,
  });

  const [amount, setAmount] = useState(ZERO);
  const [isError, setIsError] = useState(false);

  const acPoolLiquidityInMATIC = getStatsData?.acPoolLiquidityInMATIC ?? ZERO;
  const acRatio = commonData ? commonData.ratio : ZERO;
  const stakeFeePct = getStatsData?.stakeFeePct.isGreaterThan(0)
    ? getStatsData?.stakeFeePct
    : null;

  const { maticBalance } = commonData || {};

  const totalAmount = useMemo(() => {
    if (isError || !maticBalance || maticBalance.isLessThan(amount)) {
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
      balance: maticBalance,
      selectedToken,
    });
  }, [acRatio, amount, maticBalance, isError, selectedToken, stakeFeePct]);

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
    dispatch(resetMainRequests());

    dispatch(getCommonData());
    dispatch(getMetrics());
    dispatch(getStakeStats());

    return () => {
      dispatch(abortRequests());
      dispatch(resetMainRequests());
    };
  }, [dispatch]);

  useProviderEffect(() => {
    if (!featuresConfig.isActiveStakeTradeInfo) {
      return () => {};
    }

    dispatch(resetStakeTradeInfoRequests());

    dispatch(
      getStakeTradeInfoData({
        baseToken: EOpenOceanTokens.MATIC,
        bondToken: EOpenOceanTokens.aMATICb,
        certificateRatio: acRatio,
        certificateToken: EOpenOceanTokens.aMATICc,
        network: EOpenOceanNetworks.POLYGON,
      }),
    );

    return () => {
      dispatch(resetStakeTradeInfoRequests());
    };
  }, [acRatio, dispatch]);

  return {
    acPoolLiquidityInMATIC,
    acRatio,
    amount,
    balance: maticBalance,
    getStatsError: stakeStatsError || commonDataError,
    isGetStatsLoading: isStakeStatsLoading || isCommonDataLoading,
    isStakeLoading,
    stakeFeePct,
    tokenIn: Token.MATIC,
    tokenOut: selectedToken,
    totalAmount,
    extraValidation,
    onFormChange,
    onFormSubmit,
    onTokenSelect,
  };
};
