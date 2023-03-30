import { t } from '@ankr.com/common';
import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { skipToken } from '@reduxjs/toolkit/query';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { EthereumSSV } from '@ankr.com/staking-sdk';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { featuresConfig, ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { useLazyGetSSVStakeGasFeeQuery } from 'modules/stake-ssv/actions/getSSVStakeGasFee';
import { useGetSSVStakeDataQuery } from 'modules/stake-ssv/actions/getStakeData';
import { useStakeSSVMutation } from 'modules/stake-ssv/actions/stakeSSV';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

interface IUseStakeFormData {
  amount: BigNumber;
  ethBalance: BigNumber;
  extraValidation: (
    data: Partial<IStakeFormPayload>,
    errors: FormErrors<IStakeFormPayload>,
  ) => FormErrors<IStakeFormPayload>;
  faqItems: IFAQItem[];
  gasFee: BigNumber;
  getStakeDataError?: boolean;
  isGasFeeLoading: boolean;
  isStakeDataLoading: boolean;
  isStakeLoading: boolean;
  minAmount: BigNumber;
  tokenIn: Token;
  tokenOut: Token;
  totalAmount: BigNumber;
  onFormChange: (data: IStakeFormPayload, isInvalid: boolean) => void;
  onFormSubmit: (data: IStakeSubmitPayload) => void;
}

const TOKEN_IN = Token.ETH;
const TOKEN_OUT = Token.asETHc;

const resetMainRequests = () =>
  resetReduxRequests([getFAQ.toString(), getMetrics.toString()]);

export const useStakeForm = (): IUseStakeFormData => {
  const dispatch = useAppDispatch();

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const [
    stakeSSV,
    { isLoading: isStakeLoading, data: resData, isError: resErr },
  ] = useStakeSSVMutation();

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  const {
    data: stakeData,
    isError: stakeDataError,
    isLoading: isStakeDataLoading,
  } = useGetSSVStakeDataQuery(
    featuresConfig.ssvStaking ? undefined : skipToken,
  );

  const [getStakeGasFee, { data: gasFee, isLoading: isGasFeeLoading }] =
    useLazyGetSSVStakeGasFeeQuery();

  const [amount, setAmount] = useState(ZERO);

  const [isError, setIsError] = useState(false);

  const asETHcBalance = stakeData?.asETHcBalance ?? ZERO;
  const asETHcRatio = stakeData?.asETHcRatio ?? ZERO;
  const ethBalance = stakeData?.ethBalance ?? ZERO;
  const minAmount = stakeData?.minStakeAmount ?? ZERO;

  const totalAmount = useMemo(() => {
    if (isError || !ethBalance || ethBalance.isLessThan(amount)) {
      return ZERO;
    }

    return amount.multipliedBy(asETHcRatio);
  }, [amount, asETHcRatio, ethBalance, isError]);

  const extraValidation = (
    { amount: userAmount }: Partial<IStakeFormPayload>,
    errors: FormErrors<IStakeFormPayload>,
  ): FormErrors<IStakeFormPayload> => {
    if (typeof userAmount === 'string') {
      const currAmount = new BigNumber(userAmount);

      const isInvalidAmount = !EthereumSSV.isValidAmount({
        amount: currAmount,
        minStakeAmount: minAmount,
      });

      if (isInvalidAmount) {
        errors.amount = t('validation.multiple-of', {
          value: minAmount,
        });
      }
    }

    return errors;
  };

  const sendAnalytics = useCallback((): void => {
    trackStake({
      address,
      amount,
      prevStakedAmount: ethBalance,
      synthBalance: asETHcBalance,
      tokenIn: TOKEN_IN,
      tokenOut: TOKEN_OUT,
      walletType: walletName,
      willGetAmount: amount,
    });
  }, [address, amount, asETHcBalance, ethBalance, walletName]);

  const onFormChange = useCallback(
    (
      { amount: formAmount }: IStakeFormPayload,
      // TODO: https://ankrnetwork.atlassian.net/browse/STAKAN-1482
      isInvalid: boolean,
    ): void => {
      setIsError(isInvalid);

      setAmount(formAmount ? new BigNumber(formAmount) : ZERO);

      if (!isInvalid && formAmount) {
        const readyAmount = new BigNumber(formAmount);

        getStakeGasFee({
          amount: readyAmount,
        });
      }
    },
    [getStakeGasFee],
  );

  const onFormSubmit = useCallback(
    (data: IStakeSubmitPayload): void => {
      stakeSSV({
        amount: new BigNumber(data.amount),
      });
    },
    [stakeSSV],
  );

  useEffect(() => {
    if (!resData || resErr) {
      setAmount(ZERO);
    }
  }, [dispatch, resData, resErr]);

  useEffect(() => {
    if (resData && !isStakeLoading && !resErr) {
      setAmount(ZERO);

      sendAnalytics();
    }
  }, [dispatch, resData, isStakeLoading, resErr, sendAnalytics]);

  useProviderEffect(() => {
    dispatch(resetMainRequests());

    dispatch(getFAQ(Token.asETHc));
    dispatch(getMetrics());

    return () => {
      dispatch(abortRequests());
      dispatch(resetMainRequests());
    };
  }, [dispatch]);

  return {
    amount,
    ethBalance,
    extraValidation,
    faqItems,
    gasFee: gasFee ?? ZERO,
    getStakeDataError: stakeDataError,
    isGasFeeLoading,
    isStakeDataLoading,
    isStakeLoading,
    minAmount,
    tokenIn: TOKEN_IN,
    tokenOut: TOKEN_OUT,
    totalAmount,
    onFormChange,
    onFormSubmit,
  };
};
