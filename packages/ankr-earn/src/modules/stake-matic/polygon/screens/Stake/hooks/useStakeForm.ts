import {
  abortRequests,
  resetRequests as resetReduxRequests,
} from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { t } from 'common';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { featuresConfig, ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { calcTotalAmount } from 'modules/stake-matic/common/utils/calcTotalAmount';
import { getCommonData } from 'modules/stake-matic/polygon/actions/getCommonData';
import { getStakeGasFee } from 'modules/stake-matic/polygon/actions/getStakeGasFee';
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
  extraValidation: (
    data: Partial<IStakeFormPayload>,
    errors: FormErrors<IStakeFormPayload>,
  ) => FormErrors<IStakeFormPayload>;
  gasFee: BigNumber;
  getStatsError?: Error;
  isGasFeeLoading: boolean;
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

const MAIN_TOKEN = Token.MATIC;

const resetMainRequests = () =>
  resetReduxRequests([
    getCommonData.toString(),
    getMetrics.toString(),
    getStakeGasFee.toString(),
    getStakeStats.toString(),
  ]);

const resetStakeTradeInfoRequests = () =>
  resetReduxRequests([getStakeTradeInfoData.toString()]);

export const useStakeForm = (): IUseStakeFormData => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { selectedToken, handleTokenSelect } = useSelectedToken();

  const {
    data: commonData,
    error: commonDataError,
    loading: isCommonDataLoading,
  } = useQuery({
    type: getCommonData,
  });

  const { data: gasFee, loading: isGasFeeLoading } = useQuery({
    type: getStakeGasFee,
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

      dispatch(
        getStakeGasFee({
          amount: readyAmount,
          token: selectedToken,
        }),
      );
    }
  };

  const onFormSubmit = (data: IStakeSubmitPayload): void => {
    dispatchRequest(
      stake({
        amount: new BigNumber(data.amount),
        token: selectedToken,
      }),
    ).then(({ error }): void => {
      if (!error) {
        sendAnalytics();
      }
    });
  };

  const onTokenSelect = (token: TMaticSyntToken) => (): void => {
    handleTokenSelect(token);

    const isUpdateGasFee = !totalAmount.isZero() && !isError;

    if (isUpdateGasFee) {
      dispatch(
        getStakeGasFee({
          amount,
          token,
        }),
      );
    }
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
    extraValidation,
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
