import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { tHTML } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import {
  ANKR_1INCH_BUY_LINK,
  DECIMAL_PLACES,
  ZERO,
} from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { approveAMATICCUnstake } from 'modules/stake-polygon/actions/approveAMATICCUnstake';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import { getAnkrBalance } from 'modules/stake-polygon/actions/getAnkrBalance';
import { unstake } from 'modules/stake-polygon/actions/unstake';
import { RoutesConfig } from 'modules/stake-polygon/Routes';
import { TMaticSyntToken } from 'modules/stake-polygon/types';
import { getValidSelectedToken } from 'modules/stake-polygon/utils/getValidSelectedToken';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';
import { useAppDispatch } from 'store/useAppDispatch';

import { useUnstakeMaticAnalytics } from './useUnstakeMaticAnalytics';

interface IUseUnstakeMatic {
  syntTokenBalance?: BigNumber;
  minAmount: BigNumber;
  isFetchStatsLoading: boolean;
  isUnstakeLoading: boolean;
  isApproved: boolean;
  isWithApprove: boolean;
  isApproveLoading: boolean;
  unstakeFee: BigNumber;
  closeHref: string;
  selectedToken: TMaticSyntToken;
  onExtraValidation: (
    values: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
  ) => FormErrors<IUnstakeFormValues>;
  onUnstakeSubmit: (values: IUnstakeFormValues) => void;
  calcTotalRecieve: (amount: BigNumber) => string;
}

export const useUnstakeMatic = (onSuccess: () => void): IUseUnstakeMatic => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useAppDispatch();
  const { sendAnalytics } = useUnstakeMaticAnalytics();

  const { data: ankrBalance } = useQuery({
    type: getAnkrBalance,
  });

  const stakeParamsToken = RoutesConfig.unstake.useParams().token;
  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const { loading: isFetchStatsLoading, data: fetchStatsData } = useQuery({
    type: fetchStats,
  });
  const { data: approveData, loading: isApproveLoading } = useQuery({
    type: approveAMATICCUnstake,
  });
  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const isBondToken = selectedToken === Token.aMATICb;
  const closeHref = DashboardRoutes.dashboard.generatePath();
  const syntTokenBalance = isBondToken
    ? fetchStatsData?.aMATICbBalance
    : fetchStatsData?.aMATICcBalance;

  const minAmaticbAmount = fetchStatsData?.aMATICbBalance ?? ZERO;
  const minAmaticcAmount = fetchStatsData?.aMATICcBalance ?? ZERO;
  const amaticcRatio = fetchStatsData?.aMATICcRatio ?? ZERO;
  const unstakeFee = fetchStatsData?.unstakeFee ?? ZERO;
  const minAmount = isBondToken ? minAmaticbAmount : minAmaticcAmount;

  const isApproved = !!approveData;
  const isWithApprove = !isBondToken;
  const shouldBeApproved = isWithApprove && !isApproved;

  useProviderEffect(() => {
    dispatch(resetRequests([approveAMATICCUnstake.toString()]));
  }, []);

  const handleSubmit = useCallback(
    (amount: BigNumber) => {
      const resultAmount = new BigNumber(amount);

      dispatchRequest(
        unstake({ amount: resultAmount, token: selectedToken }),
      ).then(({ error }) => {
        if (!error) {
          onSuccess();
          sendAnalytics(resultAmount, selectedToken);
        }
      });
    },
    [dispatchRequest, onSuccess, selectedToken, sendAnalytics],
  );

  const onUnstakeSubmit = useCallback(
    ({ amount }: IUnstakeFormValues): void => {
      if (!amount) return;

      const value = new BigNumber(amount);

      if (shouldBeApproved) {
        dispatchRequest(approveAMATICCUnstake(value));
      } else {
        handleSubmit(value);
      }
    },
    [dispatchRequest, handleSubmit, shouldBeApproved],
  );

  const calcTotalRecieve = useCallback(
    (amount: BigNumber = ZERO): string => {
      let total = amount;
      if (!isBondToken) total = total.dividedBy(amaticcRatio ?? ZERO);

      return total.decimalPlaces(DECIMAL_PLACES).toFormat();
    },
    [amaticcRatio, isBondToken],
  );

  const onExtraValidation = (
    _data: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
  ): FormErrors<IUnstakeFormValues> => {
    if (ankrBalance?.isLessThan(unstakeFee)) {
      errors.amount = tHTML(
        'stake-polygon-dashboard.validation.is-not-enough-fee',
        {
          value: ankrBalance?.toFormat(),
          link: ANKR_1INCH_BUY_LINK,
        },
      );
    }

    return errors;
  };

  return {
    syntTokenBalance,
    selectedToken,
    minAmount,
    isFetchStatsLoading,
    isUnstakeLoading,
    unstakeFee,
    closeHref,
    isWithApprove,
    isApproved,
    isApproveLoading,
    onExtraValidation,
    onUnstakeSubmit,
    calcTotalRecieve,
  };
};
