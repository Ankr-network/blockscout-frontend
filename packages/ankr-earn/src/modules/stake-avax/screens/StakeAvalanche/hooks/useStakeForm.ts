import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useLazyGetAVAXStakeGasFeeQuery } from 'modules/stake-avax/actions/getStakeGasFee';
import { useStakeAVAXMutation } from 'modules/stake-avax/actions/stake';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/useGetAVAXCommonDataQuery';
import { calcTotalAmount } from 'modules/stake-avax/utils/calcTotalAmount';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
} from 'modules/stake/components/StakeForm';
import { INPUT_DEBOUNCE_TIME } from 'modules/stake/const';

interface IUseStakeFormData {
  syntheticTokenPrice: BigNumber;
  amount: BigNumber;
  balance?: BigNumber;
  fetchStatsError?: FetchBaseQueryError | SerializedError;
  isGetCommonDataLoading: boolean;
  isStakeGasLoading: boolean;
  isStakeLoading: boolean;
  stakeGasFee: BigNumber;
  tokenOut: string;
  totalAmount: BigNumber;
  handleFormChange: (values: IStakeFormPayload, invalid: boolean) => void;
  handleSubmit: (values: IStakeSubmitPayload) => void;
}

export const useStakeForm = (): IUseStakeFormData => {
  const [stake, { isLoading: isStakeLoading }] = useStakeAVAXMutation();

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const [amount, setAmount] = useState(ZERO);

  const [
    getAVAXStakeGasFee,
    { data: stakeGasFeeData, isFetching: isStakeGasLoading },
  ] = useLazyGetAVAXStakeGasFeeQuery();

  const {
    data: getStatsData,
    isFetching: isGetCommonDataLoading,
    error: getStatsError,
    refetch: getAvaxCommonData,
  } = useGetAVAXCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const aAVAXcRatio = getStatsData?.aAVAXcRatio;

  const syntheticTokenPrice = useMemo(
    () => (aAVAXcRatio ? new BigNumber(1).div(aAVAXcRatio) : ZERO),
    [aAVAXcRatio],
  );

  const totalAmount = useMemo(() => {
    if (!getStatsData || getStatsData.avaxBalance.isLessThan(amount)) {
      return ZERO;
    }

    return calcTotalAmount({
      selectedToken: Token.aAVAXc,
      amount: new BigNumber(amount),
      balance: getStatsData.avaxBalance,
      aAVAXcRatio,
    });
  }, [getStatsData, amount, aAVAXcRatio]);

  const handleFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    invalid: boolean,
  ): void => {
    if (formAmount && !invalid) {
      const readyAmount = new BigNumber(formAmount);
      getAVAXStakeGasFee({
        amount: readyAmount,
        token: Token.aAVAXc,
      });
    }

    setAmount(formAmount ? new BigNumber(formAmount) : ZERO);
  };

  const debouncedOnChange = useDebouncedCallback(
    handleFormChange,
    INPUT_DEBOUNCE_TIME,
  );

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount);

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.AVAX,
      tokenOut: Token.aAVAXc,
      prevStakedAmount: getStatsData?.avaxBalance ?? ZERO,
      synthBalance: getStatsData?.aAVAXcBalance ?? ZERO,
    });
  };

  const handleSubmit = (values: IStakeSubmitPayload): void => {
    const resultAmount = new BigNumber(values.amount);

    stake({ amount: resultAmount, token: Token.aAVAXc })
      .unwrap()
      .then(() => {
        sendAnalytics();
        setAmount(ZERO);
      });
  };

  // todo: remove this hook after fix bug with refetchOnMountOrArgChange
  useProviderEffect(() => {
    getAvaxCommonData();
  }, [getAvaxCommonData]);

  return {
    syntheticTokenPrice,
    amount,
    balance: getStatsData?.avaxBalance,
    fetchStatsError: getStatsError,
    isGetCommonDataLoading,
    isStakeGasLoading,
    isStakeLoading,
    stakeGasFee: stakeGasFeeData ?? ZERO,
    tokenOut: Token.aAVAXc,
    totalAmount,
    handleFormChange: debouncedOnChange,
    handleSubmit,
  };
};
