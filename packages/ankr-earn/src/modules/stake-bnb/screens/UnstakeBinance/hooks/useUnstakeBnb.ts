import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ACTION_CACHE_SEC, DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { useFlashUnstakeBNBMutation } from 'modules/stake-bnb/actions/flashUnstake';
import { useUnstakeBNBMutation } from 'modules/stake-bnb/actions/unstake';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/useGetBNBStatsQuery';
import { useGetBNBUnstakeStatsQuery } from 'modules/stake-bnb/actions/useGetBNBUnstakeStatsQuery';
import { useLazyApproveABNBCForSwapPoolQuery } from 'modules/stake-bnb/actions/useLazyApproveABNBCForSwapPoolQuery';
import { useLazyApproveABNBCUnstakeQuery } from 'modules/stake-bnb/actions/useLazyApproveABNBCUnstakeQuery';
import { RoutesConfig } from 'modules/stake-bnb/Routes';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { getValidSelectedToken } from 'modules/stake-bnb/utils/getValidSelectedToken';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';

import { getFlashUnstakeAmountWithFee } from '../../../utils/getFlashUnstakeAmountWithFee';

import { useUnstakeBNBAnalytics } from './useUnstakeBnbAnalytics';

interface IUseUnstakeBnb {
  syntTokenBalance?: BigNumber;
  minAmount: BigNumber;
  isFetchStatsLoading: boolean;
  isUnstakeLoading: boolean;
  isApproved: boolean;
  isWithApprove: boolean;
  isApproveLoading: boolean;
  closeHref: string;
  selectedToken: TBnbSyntToken;
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
  instantFee: BigNumber;
  poolBalance: BigNumber;
  isFlashApproved: boolean;
  isFlashUnstakeLoading: boolean;
  isSwapPoolApproveLoading: boolean;
}

export const useUnstakeBnb = (): IUseUnstakeBnb => {
  const { sendAnalytics } = useUnstakeBNBAnalytics();
  const [
    approveABNBCUnstake,
    { data: approveData, isLoading: isApproveLoading },
  ] = useLazyApproveABNBCUnstakeQuery();
  const [
    approveABNBCForSwapPool,
    { data: swapPoolApproved, isLoading: isSwapPoolApproveLoading },
  ] = useLazyApproveABNBCForSwapPoolQuery();

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
      !externalAddress?.toLowerCase().match(/^(0x)?[0-9a-f]{40}$/)
    ) {
      errors.externalAddress = t('validation.invalid-address');
    }

    return errors;
  };

  const onFlashExtraValidation = (
    {
      amount,
      isToExternalAddress,
      externalAddress,
    }: Partial<IUnstakeFormValues>,
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

    if (isToExternalAddress && !externalAddress?.match(/^[a-zA-Z0-9]+$/)) {
      errors.externalAddress = t('validation.invalid-address');
    }

    return errors;
  };

  const isApproved = !!approveData;
  const isFlashApproved = !!swapPoolApproved;
  const isWithApprove = !isBondToken;
  const shouldBeApproved = isWithApprove && !isApproved;

  useProviderEffect(() => {
    statsRefetch();
    unstakeStatsRefetch();
  }, []);

  const handleSubmit = useCallback(
    (formValues: IUnstakeFormValues) => {
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

      unstake(unstakeRequest)
        .unwrap()
        .then(() => {
          sendAnalytics(resultAmount, selectedToken);
        });
    },
    [selectedToken, sendAnalytics, unstake],
  );

  const handleFlashSubmit = useCallback(
    ({ amount }: IUnstakeFormValues) => {
      if (!amount) {
        return;
      }
      const resultAmount = new BigNumber(amount);

      const unstakeRequest = {
        amount: resultAmount,
        token: selectedToken,
      };

      flashUnstakeBNB(unstakeRequest)
        .unwrap()
        .then(() => {
          sendAnalytics(resultAmount, selectedToken);
        });
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
        fee: fetchUnstakeStatsData.instantFee ?? ZERO,
        amount,
        ratio: fetchStatsData.aBNBcRatio ?? ZERO,
      });
    },
    [fetchStatsData, fetchUnstakeStatsData],
  );

  return {
    syntTokenBalance,
    selectedToken,
    minAmount,
    isFetchStatsLoading: isFetchStatsLoading || isFetchUnstakeStatsLoading,
    isUnstakeLoading,
    isFlashUnstakeLoading,
    closeHref,
    isWithApprove,
    isApproved,
    isFlashApproved,
    isApproveLoading,
    isSwapPoolApproveLoading,
    onExtraValidation,
    onFlashExtraValidation,
    onUnstakeSubmit,
    onFlashUnstakeSubmit,
    calcTotalRecieve,
    calcFlashTotalRecieve,
    instantFee: fetchUnstakeStatsData?.instantFee ?? ZERO,
    poolBalance: fetchUnstakeStatsData?.poolBalance ?? ZERO,
  };
};
