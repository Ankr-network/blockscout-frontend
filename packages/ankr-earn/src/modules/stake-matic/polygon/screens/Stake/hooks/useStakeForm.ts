import { t } from '@ankr.com/common';
import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import {
  ACTION_CACHE_SEC,
  featuresConfig,
  ONE,
  ZERO,
} from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { calcTotalAmount } from 'modules/stake-matic/common/utils/calcTotalAmount';
import { useGetMaticOnPolygonCommonDataQuery } from 'modules/stake-matic/polygon/actions/useGetMaticOnPolygonCommonDataQuery';
import { useGetMaticOnPolygonStakeStatsQuery } from 'modules/stake-matic/polygon/actions/useGetMaticOnPolygonStakeStatsQuery';
import { useLazyGetMaticOnPolygonStakeGasFeeQuery } from 'modules/stake-matic/polygon/actions/useLazyGetMaticOnPolygonStakeGasFeeQuery';
import { useStakeMaticOnPolygonMutation } from 'modules/stake-matic/polygon/actions/useStakeMaticOnPolygonMutation';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';
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
  amount: BigNumber;
  balance?: BigNumber;
  extraValidation: (
    data: Partial<IStakeFormPayload>,
    errors: FormErrors<IStakeFormPayload>,
  ) => FormErrors<IStakeFormPayload>;
  faqItems: IFAQItem[];
  gasFee: BigNumber;
  getStatsError?: FetchBaseQueryError | SerializedError;
  isGasFeeLoading: boolean;
  isGetStatsLoading: boolean;
  isStakeLoading: boolean;
  stakeFeePct: BigNumber | null;
  tokenIn: string;
  tokenOut: TMaticSyntToken;
  totalAmount: BigNumber;
  syntheticTokenPrice: BigNumber;
  onFormChange: (data: IStakeFormPayload, isInvalid: boolean) => void;
  onFormSubmit: (data: IStakeSubmitPayload) => void;
  onTokenSelect: (token: TMaticSyntToken) => () => void;
}

const MAIN_TOKEN = Token.MATIC;

const resetMainRequests = () =>
  resetReduxRequests([getFAQ.toString(), getMetrics.toString()]);

const resetStakeTradeInfoRequests = () =>
  resetReduxRequests([getStakeTradeInfoData.toString()]);

export const useStakeForm = (): IUseStakeFormData => {
  const dispatch = useAppDispatch();

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const [stake, { isLoading: isStakeLoading }] =
    useStakeMaticOnPolygonMutation();

  const { selectedToken, handleTokenSelect } = useSelectedToken();

  const {
    data: commonData,
    isFetching: isCommonDataLoading,
    error: commonDataError,
    refetch: getMATICPOLYGONCommonDataRefetch,
  } = useGetMaticOnPolygonCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  const [getStakeGasFee, { data: gasFee, isFetching: isGasFeeLoading }] =
    useLazyGetMaticOnPolygonStakeGasFeeQuery();

  const {
    data: stakeStatsData,
    isFetching: isStakeStatsLoading,
    error: stakeStatsError,
  } = useGetMaticOnPolygonStakeStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const [amount, setAmount] = useState(ZERO);
  const [isError, setIsError] = useState(false);

  const acPoolLiquidityInMATIC = stakeStatsData?.acPoolLiquidityInMATIC ?? ZERO;
  const acRatio = commonData?.ratio ?? ZERO;
  const maticBalance = commonData?.maticBalance ?? ZERO;
  const stakeFeePct = stakeStatsData?.stakeFeePct.isGreaterThan(0)
    ? stakeStatsData?.stakeFeePct
    : null;

  const totalAmount = useMemo(() => {
    if (isError || !maticBalance || maticBalance.isLessThan(amount)) {
      return ZERO;
    }

    const amountVal = stakeFeePct
      ? amount.minus(amount.dividedBy(100).multipliedBy(stakeFeePct))
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

  const sendAnalytics = (): void => {
    const synthBalance =
      selectedToken === Token.aMATICb
        ? commonData?.maticBondBalance ?? ZERO
        : commonData?.maticCertBalance ?? ZERO;

    trackStake({
      address,
      amount,
      prevStakedAmount: maticBalance,
      synthBalance,
      tokenIn: MAIN_TOKEN,
      tokenOut: selectedToken,
      walletType: walletName,
      willGetAmount: amount,
    });
  };

  const onFormChange = (
    { amount: formAmount }: IStakeFormPayload,
    // TODO: https://ankrnetwork.atlassian.net/browse/STAKAN-1482
    isInvalid: boolean,
  ): void => {
    setIsError(isInvalid);

    setAmount(formAmount ? new BigNumber(formAmount) : ZERO);

    if (isInvalid) {
      dispatch(resetReduxRequests([getStakeGasFee.toString()]));
    } else if (formAmount) {
      const readyAmount = new BigNumber(formAmount);

      getStakeGasFee({
        amount: readyAmount,
        token: selectedToken,
      });
    }
  };

  const onFormSubmit = (data: IStakeSubmitPayload): void => {
    stake({
      amount: new BigNumber(data.amount),
      token: selectedToken,
    }).then(() => {
      sendAnalytics();
    });
  };

  const onTokenSelect = (token: TMaticSyntToken) => (): void => {
    handleTokenSelect(token);

    const isUpdateGasFee = !totalAmount.isZero() && !isError;

    if (isUpdateGasFee) {
      getStakeGasFee({
        amount,
        token,
      });
    }
  };

  useProviderEffect(() => {
    dispatch(resetMainRequests());

    getMATICPOLYGONCommonDataRefetch();
    dispatch(getFAQ(Token.MATIC));
    dispatch(getMetrics());

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
    syntheticTokenPrice: ONE.div(acRatio),
    amount,
    balance: maticBalance,
    extraValidation,
    faqItems,
    gasFee: gasFee ?? ZERO,
    getStatsError: commonDataError || stakeStatsError,
    isGasFeeLoading,
    isGetStatsLoading: isCommonDataLoading || isStakeStatsLoading,
    isStakeLoading,
    stakeFeePct,
    tokenIn: MAIN_TOKEN,
    tokenOut: selectedToken,
    totalAmount,
    onFormChange,
    onFormSubmit,
    onTokenSelect,
  };
};
