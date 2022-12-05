import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useLazyGetStakeDataQuery } from 'modules/stake-xdc/actions/getStakeData';
import { useLazyGetStakeGasFeeQuery } from 'modules/stake-xdc/actions/getStakeGasFee';
import { useStakeMutation } from 'modules/stake-xdc/actions/stake';
import { XDC_PROVIDER_ID } from 'modules/stake-xdc/const';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { useAppDispatch } from 'store/useAppDispatch';

interface IUseStakeFormData {
  aXDCcPrice: BigNumber;
  amount: BigNumber;
  faqItems: IFAQItem[];
  gasFee: BigNumber;
  getStakeDataError?: FetchBaseQueryError | SerializedError;
  isGasFeeLoading: boolean;
  isStakeDataError: boolean;
  isStakeDataLoading: boolean;
  isStakeLoading: boolean;
  minAmount: BigNumber;
  tokenIn: Token;
  tokenOut: Token;
  totalAmount: BigNumber;
  xdcBalance: BigNumber;
  onFormChange: (data: IStakeFormPayload, isInvalid: boolean) => void;
  onFormSubmit: (data: IStakeSubmitPayload) => void;
}

const TOKEN_IN = Token.XDC;
const TOKEN_OUT = Token.aXDCc;

const resetRequests = () => resetReduxRequests([getFAQ.toString()]);

export const useStakeForm = (): IUseStakeFormData => {
  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState(ZERO);

  const [isError, setIsError] = useState(false);

  const { address, walletName } = useConnectedData(XDC_PROVIDER_ID);

  const [
    getStakeData,
    {
      data: stakeData,
      error: stakeDataError,
      isError: isStakeDataError,
      isFetching: isStakeDataLoading,
    },
  ] = useLazyGetStakeDataQuery();

  const [getStakeGasFee, { data: gasFee, isFetching: isGasFeeLoading }] =
    useLazyGetStakeGasFeeQuery();

  const [stake, { isLoading: isStakeLoading }] = useStakeMutation();

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  const aXDCcBalance = stakeData?.aXDCcBalance ?? ZERO;
  const aXDCcRatio = stakeData?.aXDCcRatio ?? ZERO;
  const minAmount = stakeData?.minStakeAmount ?? ZERO;
  const xdcBalance = stakeData?.xdcBalance ?? ZERO;

  const aXDCcPrice = useMemo(() => {
    const defaultState = new BigNumber(1);

    return aXDCcRatio.isZero()
      ? defaultState
      : defaultState.multipliedBy(aXDCcRatio);
  }, [aXDCcRatio]);

  const totalAmount = useMemo(() => {
    if (
      isError ||
      xdcBalance.isLessThan(amount) ||
      amount.isZero() ||
      aXDCcRatio.isZero()
    ) {
      return ZERO;
    }

    return amount.multipliedBy(aXDCcRatio);
  }, [aXDCcRatio, amount, isError, xdcBalance]);

  const sendAnalytics = (): void => {
    trackStake({
      address,
      amount,
      prevStakedAmount: xdcBalance,
      synthBalance: aXDCcBalance,
      tokenIn: TOKEN_IN,
      tokenOut: TOKEN_OUT,
      walletType: walletName,
      willGetAmount: amount,
    });
  };

  const onFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    // TODO: https://ankrnetwork.atlassian.net/browse/STAKAN-1482
    isInvalid: boolean,
  ): void => {
    const newAmount = formAmount ? new BigNumber(formAmount) : ZERO;

    setIsError(isInvalid);
    setAmount(newAmount);

    getStakeGasFee({
      amount: newAmount,
    });
  };

  const onFormSubmit = (data: IStakeSubmitPayload): void => {
    stake({
      amount: new BigNumber(data.amount),
    })
      .unwrap()
      .then(() => sendAnalytics())
      .catch(() => {
        setAmount(ZERO);

        getStakeGasFee({
          amount: ZERO,
        });
      });
  };

  useProviderEffect(() => {
    dispatch(resetRequests());

    dispatch(getFAQ(TOKEN_OUT));

    getStakeData();

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);

  return {
    aXDCcPrice,
    amount,
    faqItems,
    gasFee: gasFee ?? ZERO,
    getStakeDataError: stakeDataError,
    isGasFeeLoading,
    isStakeDataError,
    isStakeDataLoading,
    isStakeLoading,
    minAmount,
    tokenIn: TOKEN_IN,
    tokenOut: TOKEN_OUT,
    totalAmount,
    xdcBalance,
    onFormChange,
    onFormSubmit,
  };
};
