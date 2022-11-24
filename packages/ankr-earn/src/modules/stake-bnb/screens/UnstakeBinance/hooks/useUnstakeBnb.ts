import { t } from '@ankr.com/common';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { approveABNBCForSwapPool } from 'modules/stake-bnb/actions/approveABNBCFlashUnstake';
import { approveABNBCUnstake } from 'modules/stake-bnb/actions/approveABNBCUnstake';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';
import { flashUnstake } from 'modules/stake-bnb/actions/flashUnstake';
import { unstake } from 'modules/stake-bnb/actions/unstake';
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
}

export const useUnstakeBnb = (): IUseUnstakeBnb => {
  const dispatchRequest = useDispatchRequest();
  const { sendAnalytics } = useUnstakeBNBAnalytics();

  const stakeParamsToken = RoutesConfig.unstake.useParams().token;
  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const { loading: isFetchStatsLoading, data: fetchStatsData } = useQuery({
    type: fetchStats,
  });

  const { data: approveData, loading: isApproveLoading } = useQuery({
    type: approveABNBCUnstake,
  });

  const { data: swapPoolApproved, loading: isSwapPoolApproveLoading } =
    useQuery({
      type: approveABNBCForSwapPool,
    });

  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const { loading: isFlashUnstakeLoading } = useMutation({
    type: flashUnstake,
  });

  const isBondToken = selectedToken === Token.aBNBb;

  const closeHref = DashboardRoutes.dashboard.generatePath();

  const syntTokenBalance = isBondToken
    ? fetchStatsData?.aBNBbBalance
    : fetchStatsData?.aBNBcBalance;

  const minAbnbbAmount = fetchStatsData?.minAbnbbUnstake ?? ZERO;
  const minAbnbcAmount = fetchStatsData?.minAbnbcUnstake ?? ZERO;
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

    if (isToExternalAddress && !externalAddress?.match(/^[a-zA-Z0-9]+$/)) {
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
  const isWithApprove = !isBondToken;
  const shouldBeApproved = isWithApprove && !isApproved;

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

      dispatchRequest(unstake(unstakeRequest)).then(({ error }) => {
        if (!error) {
          sendAnalytics(resultAmount, selectedToken);
        }
      });
    },
    [dispatchRequest, selectedToken, sendAnalytics],
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

      dispatchRequest(flashUnstake(unstakeRequest)).then(({ error }) => {
        if (!error) {
          sendAnalytics(resultAmount, selectedToken);
        }
      });
    },
    [dispatchRequest, selectedToken, sendAnalytics],
  );

  const onUnstakeSubmit = useCallback(
    (formValues: IUnstakeFormValues): void => {
      const { amount } = formValues;
      if (!amount) {
        return;
      }

      const value = new BigNumber(amount);

      if (shouldBeApproved) {
        dispatchRequest(approveABNBCUnstake(value));
      } else {
        handleSubmit(formValues);
      }
    },
    [dispatchRequest, handleSubmit, shouldBeApproved],
  );

  const onFlashUnstakeSubmit = useCallback(
    (formValues: IUnstakeFormValues): void => {
      const { amount } = formValues;
      if (!amount) {
        return;
      }

      const value = new BigNumber(amount);

      if (!swapPoolApproved) {
        dispatchRequest(approveABNBCForSwapPool(value));
      } else {
        handleFlashSubmit(formValues);
      }
    },
    [dispatchRequest, handleFlashSubmit, swapPoolApproved],
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
      if (!fetchStatsData) {
        return ZERO.toString();
      }
      return getFlashUnstakeAmountWithFee({
        fee: fetchStatsData.instantFee ?? ZERO,
        amount,
        ratio: fetchStatsData.aBNBcRatio ?? ZERO,
      });
    },
    [fetchStatsData],
  );

  return {
    syntTokenBalance,
    selectedToken,
    minAmount,
    isFetchStatsLoading,
    isUnstakeLoading: isUnstakeLoading || isFlashUnstakeLoading,
    closeHref,
    isWithApprove,
    isApproved,
    isApproveLoading: isApproveLoading || isSwapPoolApproveLoading,
    onExtraValidation,
    onFlashExtraValidation,
    onUnstakeSubmit,
    onFlashUnstakeSubmit,
    calcTotalRecieve,
    calcFlashTotalRecieve,
    instantFee: fetchStatsData?.instantFee ?? ZERO,
    poolBalance: fetchStatsData?.poolBalance ?? ZERO,
  };
};
