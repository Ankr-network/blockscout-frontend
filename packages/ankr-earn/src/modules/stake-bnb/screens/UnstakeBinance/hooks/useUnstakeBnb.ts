import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { DECIMAL_PLACES, featuresConfig, ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { t } from 'modules/i18n/utils/intl';
import { approveABNBCUnstake } from 'modules/stake-bnb/actions/approveABNBCUnstake';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';
import { unstake } from 'modules/stake-bnb/actions/unstake';
import { useRedeemData } from 'modules/stake-bnb/hooks/useRedeemData';
import { RoutesConfig } from 'modules/stake-bnb/Routes';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { getValidSelectedToken } from 'modules/stake-bnb/utils/getValidSelectedToken';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';

import { useUnstakeBNBAnalytics } from './useUnstakeBnbAnalytics';

interface IUseUnstakeBnb {
  syntTokenBalance?: BigNumber;
  minAmount: BigNumber;
  isFetchStatsLoading: boolean;
  isUnstakeLoading: boolean;
  isApproved: boolean;
  isWithApprove: boolean;
  isApproveLoading: boolean;
  redeemPeriod: string;
  redeemValue: string;
  closeHref: string;
  selectedToken: TBnbSyntToken;
  onExtraValidation: (
    values: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
  ) => FormErrors<IUnstakeFormValues>;
  onUnstakeSubmit: (values: IUnstakeFormValues) => void;
  calcTotalRecieve: (amount: BigNumber) => string;
}

export const useUnstakeBnb = (onSuccess: () => void): IUseUnstakeBnb => {
  const dispatchRequest = useDispatchRequest();
  const { sendAnalytics } = useUnstakeBNBAnalytics();

  const stakeParamsToken = RoutesConfig.unstake.useParams().token;
  const selectedToken = featuresConfig.stakeAbnbc
    ? getValidSelectedToken(stakeParamsToken)
    : Token.aBNBb;

  const { loading: isFetchStatsLoading, data: fetchStatsData } = useQuery({
    type: fetchStats,
  });

  const { data: approveData, loading: isApproveLoading } = useQuery({
    type: approveABNBCUnstake,
  });

  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const { redeemPeriod, redeemValue } = useRedeemData();

  const isBondToken = selectedToken === Token.aBNBb;

  const closeHref = DashboardRoutes.dashboard.generatePath();

  const syntTokenBalance = isBondToken
    ? fetchStatsData?.aBNBbBalance
    : fetchStatsData?.aBNBcBalance;

  const minAbnbbAmount = fetchStatsData?.minAbnbbUnstake ?? ZERO;
  const minAbnbcAmount = fetchStatsData?.minAbnbcUnstake ?? ZERO;
  const minAmount = isBondToken ? minAbnbbAmount : minAbnbcAmount;

  const onExtraValidation = (
    { amount }: Partial<IUnstakeFormValues>,
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

    return errors;
  };

  const isApproved = !!approveData;
  const isWithApprove = !isBondToken;
  const shouldBeApproved = isWithApprove && !isApproved;

  const handleSubmit = useCallback(
    (amount: BigNumber) => {
      const resultAmount = new BigNumber(amount);

      dispatchRequest(
        unstake({ amount: resultAmount, token: selectedToken }),
      ).then(({ error }) => {
        if (!error) {
          onSuccess();
          sendAnalytics(resultAmount, Token.aBNBb);
        }
      });
    },
    [dispatchRequest, onSuccess, selectedToken, sendAnalytics],
  );

  const onUnstakeSubmit = useCallback(
    ({ amount }: IUnstakeFormValues): void => {
      if (!amount) {
        return;
      }

      const value = new BigNumber(amount);

      if (shouldBeApproved) {
        dispatchRequest(approveABNBCUnstake(value));
      } else {
        handleSubmit(value);
      }
    },
    [dispatchRequest, handleSubmit, shouldBeApproved],
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

  return {
    syntTokenBalance,
    selectedToken,
    minAmount,
    isFetchStatsLoading,
    isUnstakeLoading,
    redeemPeriod,
    redeemValue,
    closeHref,
    isWithApprove,
    isApproved,
    isApproveLoading,
    onExtraValidation,
    onUnstakeSubmit,
    calcTotalRecieve,
  };
};
