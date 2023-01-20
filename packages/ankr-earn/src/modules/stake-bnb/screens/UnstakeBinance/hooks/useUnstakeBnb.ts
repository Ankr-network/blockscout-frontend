import { t } from '@ankr.com/common';
import { SerializedError } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { AvailableWriteProviders, IWeb3SendResult } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ACTION_CACHE_SEC, DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { useFlashUnstakeBNBMutation } from 'modules/stake-bnb/actions/flashUnstake';
import { useUnstakeBNBMutation } from 'modules/stake-bnb/actions/unstake';
import { useApproveABNBCForSwapPoolMutation } from 'modules/stake-bnb/actions/useApproveABNBCForSwapPoolMutation';
import { useApproveABNBCUnstakeMutation } from 'modules/stake-bnb/actions/useApproveABNBCUnstakeMutation';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/useGetBNBStatsQuery';
import { useGetBNBUnstakeStatsQuery } from 'modules/stake-bnb/actions/useGetBNBUnstakeStatsQuery';
import { RoutesConfig } from 'modules/stake-bnb/Routes';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { getFlashUnstakeAmountWithFee } from 'modules/stake-bnb/utils/getFlashUnstakeAmountWithFee';
import { getValidSelectedToken } from 'modules/stake-bnb/utils/getValidSelectedToken';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';

import { useUnstakeBNBAnalytics } from './useUnstakeBnbAnalytics';

const addrRegExp = /^(0x)?[0-9a-f]{40}$/;

interface IUnstakeRes {
  data?: IWeb3SendResult;
  error?: SerializedError;
}

interface IUseUnstakeBnb {
  closeHref: string;
  instantFee: BigNumber;
  isApproved: boolean;
  isApproveLoading: boolean;
  isFetchStatsLoading: boolean;
  isFlashApproved: boolean;
  isFlashUnstakeLoading: boolean;
  isSwapPoolApproveLoading: boolean;
  isUnstakeLoading: boolean;
  isWithApprove: boolean;
  maxAmount?: BigNumber;
  minAmount: BigNumber;
  poolBalance: BigNumber;
  selectedToken: TBnbSyntToken;
  syntTokenBalance?: BigNumber;
  onExtraValidation: (
    values: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
    maxAmount?: BigNumber,
  ) => FormErrors<IUnstakeFormValues>;
  onFlashExtraValidation: (
    values: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
    maxAmount?: BigNumber,
  ) => FormErrors<IUnstakeFormValues>;
  onUnstakeSubmit: (values: IUnstakeFormValues) => void;
  calcTotalRecieve: (amount: BigNumber) => string;
  calcFlashTotalRecieve: (amount: BigNumber) => string;
  onFlashUnstakeSubmit: (values: IUnstakeFormValues) => void;
}

// todo: divide this large hook into several smaller ones
export const useUnstakeBnb = (): IUseUnstakeBnb => {
  const { sendAnalytics } = useUnstakeBNBAnalytics();
  const { address } = useConnectedData(AvailableWriteProviders.ethCompatible);

  const [
    approveABNBCUnstake,
    { data: approveData, isLoading: isApproveLoading, reset: resetApprove },
  ] = useApproveABNBCUnstakeMutation();

  const [
    approveABNBCForSwapPool,
    {
      data: swapPoolApproved,
      isLoading: isSwapPoolApproveLoading,
      reset: resetSwapPoolApprove,
    },
  ] = useApproveABNBCForSwapPoolMutation();

  const stakeParamsToken = RoutesConfig.unstake.useParams().token;
  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const {
    data: fetchStatsData,
    isFetching: isFetchStatsLoading,
    refetch: statsRefetch,
  } = useGetBNBStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const {
    data: fetchUnstakeStatsData,
    isFetching: isFetchUnstakeStatsLoading,
    refetch: unstakeStatsRefetch,
  } = useGetBNBUnstakeStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const [unstake, { isLoading: isUnstakeLoading }] = useUnstakeBNBMutation();

  const [flashUnstakeBNB, { isLoading: isFlashUnstakeLoading }] =
    useFlashUnstakeBNBMutation();

  const isBondToken = selectedToken === Token.aBNBb;

  const closeHref = DashboardRoutes.dashboard.generatePath();

  const syntTokenBalance = isBondToken
    ? fetchStatsData?.aBNBbBalance
    : fetchStatsData?.aBNBcBalance;

  const minAbnbbAmount = fetchUnstakeStatsData?.minAbnbbUnstake ?? ZERO;
  const minAbnbcAmount = fetchUnstakeStatsData?.minAbnbcUnstake ?? ZERO;
  const minAmount = isBondToken ? minAbnbbAmount : minAbnbcAmount;

  const onExtraValidation = (
    {
      amount,
      isToExternalAddress,
      externalAddress,
    }: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
  ): FormErrors<IUnstakeFormValues> => {
    const currAmount = new BigNumber(
      typeof amount === 'string' && amount.length ? amount : NaN,
    );

    if (currAmount.isGreaterThan(ZERO) && currAmount.isLessThan(minAmount)) {
      errors.amount = t('validation.greater-or-equal', {
        value: minAmount,
      });
    }

    if (
      isToExternalAddress &&
      !externalAddress?.toLowerCase().match(addrRegExp)
    ) {
      errors.externalAddress = t('validation.invalid-address');
    }

    return errors;
  };

  const onFlashExtraValidation = (
    { amount }: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
    maxAmount?: BigNumber,
  ): FormErrors<IUnstakeFormValues> => {
    const currAmount = new BigNumber(
      typeof amount === 'string' && amount.length ? amount : NaN,
    );

    if (maxAmount && currAmount.isGreaterThan(maxAmount)) {
      errors.amount = t('validation.max', {
        value: maxAmount,
      });
    }

    return errors;
  };

  const isApproved = !!approveData;
  const isFlashApproved = !!swapPoolApproved;
  const isWithApprove = !isBondToken;
  const shouldBeApproved = isWithApprove && !isApproved;

  useProviderEffect(() => {
    resetApprove();
    resetSwapPoolApprove();
  }, [address]);

  useProviderEffect(() => {
    statsRefetch();
    unstakeStatsRefetch();
  }, []);

  const handleSubmit = useCallback(
    async (formValues: IUnstakeFormValues) => {
      const { amount, isToExternalAddress, externalAddress } = formValues;

      if (!amount) {
        return;
      }

      const resultAmount = new BigNumber(amount);

      const unstakeRequest = {
        amount: resultAmount,
        token: selectedToken,
        externalAddress: isToExternalAddress ? externalAddress : undefined,
      };

      const data = (await unstake(unstakeRequest)) as IUnstakeRes;

      if (data?.error) {
        return;
      }

      sendAnalytics(resultAmount, selectedToken);
    },
    [selectedToken, sendAnalytics, unstake],
  );

  const handleFlashSubmit = useCallback(
    async ({ amount }: IUnstakeFormValues) => {
      if (!amount) {
        return;
      }

      const resultAmount = new BigNumber(amount);

      const unstakeRequest = {
        amount: resultAmount,
        token: selectedToken,
      };

      const data = (await flashUnstakeBNB(unstakeRequest)) as IUnstakeRes;

      if (data?.error) {
        return;
      }

      sendAnalytics(resultAmount, selectedToken);
    },
    [flashUnstakeBNB, selectedToken, sendAnalytics],
  );

  const onUnstakeSubmit = useCallback(
    (formValues: IUnstakeFormValues): void => {
      const { amount } = formValues;
      if (!amount) {
        return;
      }

      const value = new BigNumber(amount);

      if (shouldBeApproved) {
        approveABNBCUnstake(value);
      } else {
        handleSubmit(formValues);
      }
    },
    [approveABNBCUnstake, handleSubmit, shouldBeApproved],
  );

  const onFlashUnstakeSubmit = useCallback(
    (formValues: IUnstakeFormValues): void => {
      const { amount } = formValues;
      if (!amount) {
        return;
      }

      const value = new BigNumber(amount);

      if (!swapPoolApproved) {
        approveABNBCForSwapPool(value);
      } else {
        handleFlashSubmit(formValues);
      }
    },
    [approveABNBCForSwapPool, handleFlashSubmit, swapPoolApproved],
  );

  const calcTotalRecieve = useCallback(
    (amount: BigNumber = ZERO): string => {
      let total = amount;
      if (!isBondToken) {
        total = total.dividedBy(fetchStatsData?.aBNBcRatio ?? ZERO);
      }

      return total.decimalPlaces(DECIMAL_PLACES).toFormat();
    },
    [fetchStatsData?.aBNBcRatio, isBondToken],
  );

  const calcFlashTotalRecieve = useCallback(
    (amount: BigNumber = ZERO): string => {
      if (!fetchStatsData || !fetchUnstakeStatsData) {
        return ZERO.toString();
      }
      return getFlashUnstakeAmountWithFee({
        fee: fetchUnstakeStatsData.unstakeFeePct ?? ZERO,
        amount,
        ratio: fetchStatsData.aBNBcRatio ?? ZERO,
      });
    },
    [fetchStatsData, fetchUnstakeStatsData],
  );

  return {
    closeHref,
    instantFee: fetchUnstakeStatsData?.unstakeFeePct ?? ZERO,
    isApproved,
    isApproveLoading,
    isFetchStatsLoading: isFetchStatsLoading || isFetchUnstakeStatsLoading,
    isFlashApproved,
    isFlashUnstakeLoading,
    isSwapPoolApproveLoading,
    isUnstakeLoading,
    isWithApprove,
    minAmount,
    maxAmount: fetchUnstakeStatsData?.maxAnkrBnbAmount,
    poolBalance: fetchUnstakeStatsData?.poolBalance ?? ZERO,
    selectedToken,
    syntTokenBalance,
    calcFlashTotalRecieve,
    calcTotalRecieve,
    onExtraValidation,
    onFlashExtraValidation,
    onFlashUnstakeSubmit,
    onUnstakeSubmit,
  };
};
