import { t } from '@ankr.com/common';
import { abortRequests } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { getValidSelectedToken } from 'modules/stake-matic/common/utils/getValidSelectedToken';
import { useGetMaticOnPolygonCommonDataQuery } from 'modules/stake-matic/polygon/actions/useGetMaticOnPolygonCommonDataQuery';
import { useGetMaticOnPolygonUnstakeStatsQuery } from 'modules/stake-matic/polygon/actions/useGetMaticOnPolygonUnstakeStatsQuery';
import { useLazyApproveAnkrMaticOnPolygonUnstakeQuery } from 'modules/stake-matic/polygon/actions/useLazyApproveAnkrMaticOnPolygonUnstakeQuery';
import { useUnstakeMaticOnPolygonMutation } from 'modules/stake-matic/polygon/actions/useUnstakeMaticOnPolygonMutation';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';
import { useAppDispatch } from 'store/useAppDispatch';

interface IUseUnstakeData {
  closeHref: string;
  extraValidation?: (
    data: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
  ) => FormErrors<IUnstakeFormValues>;
  getTotalVal: (maxAmount: BigNumber, amount?: BigNumber) => BigNumber;
  isApproveLoading: boolean;
  isApproved: boolean;
  isGetStatsLoading: boolean;
  isUnstakeLoading: boolean;
  isWithApprove: boolean;
  maticPoolLiquidityInAC: BigNumber;
  selectedToken: TMaticSyntToken;
  syntTokenBalance?: BigNumber;
  tokenOut: string;
  unstakeFeePct: BigNumber | null;
  onUnstakeSubmit: (data: IUnstakeFormValues) => void;
}

const CLOSE_HREF = DashboardRoutes.dashboard.generatePath();
const MAIN_TOKEN = Token.MATIC;

/**
 * TODO Remove a token hardcode (MATIC on Polygon)
 */
export const useUnstake = (): IUseUnstakeData => {
  const dispatch = useAppDispatch();

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const [unstake, { isLoading: isUnstakeLoading }] =
    useUnstakeMaticOnPolygonMutation();

  const [approveACUnstake, { data: approveData, isLoading: isApproveLoading }] =
    useLazyApproveAnkrMaticOnPolygonUnstakeQuery();

  const {
    data: commonData,
    isFetching: isCommonDataLoading,
    refetch: getMATICPOLYGONCommonDataRefetch,
  } = useGetMaticOnPolygonCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });
  const { data: unstakeStatsData, isFetching: isUnstakeStatsLoading } =
    useGetMaticOnPolygonUnstakeStatsQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const stakeParamsToken = Token.aMATICc;

  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const isApproved = !!approveData;

  const isBondToken = selectedToken === Token.aMATICb;

  const isWithApprove = !isBondToken;

  const isShouldBeApproved = isWithApprove && !isApproved;

  const acRatio = commonData?.ratio ?? ZERO;

  const maticPoolLiquidityInAC =
    unstakeStatsData?.maticPoolLiquidityInAC ?? ZERO;

  const syntTokenBalance = commonData?.maticCertBalance;

  const unstakeFeePct = unstakeStatsData?.unstakeFeePct.isGreaterThan(0)
    ? unstakeStatsData?.unstakeFeePct
    : null;

  const extraValidation = (
    { amount: userAmount }: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
  ): FormErrors<IUnstakeFormValues> => {
    if (typeof userAmount === 'string') {
      const currAmount = new BigNumber(userAmount);

      if (currAmount.isGreaterThan(maticPoolLiquidityInAC)) {
        errors.amount = t('stake-matic-polygon.validation.low-pool');
      }
    }

    return errors;
  };

  const getTotalVal = useCallback(
    (maxAmount: BigNumber, amount: BigNumber = ZERO): BigNumber => {
      const isInvalidAmount =
        amount.isZero() || amount.isNaN() || amount.isGreaterThan(maxAmount);

      if (isInvalidAmount) {
        return ZERO;
      }

      const isCertToken = !isBondToken && acRatio.isGreaterThan(0);

      const amountVal = unstakeFeePct
        ? amount.minus(amount.dividedBy(100).multipliedBy(unstakeFeePct))
        : amount;

      if (amountVal.isLessThanOrEqualTo(0)) {
        return ZERO;
      }

      return isCertToken ? amountVal.dividedBy(acRatio) : amountVal;
    },
    [acRatio, isBondToken, unstakeFeePct],
  );

  const sendAnalytics = useCallback(
    (amount: BigNumber): void => {
      const synthBalance = isBondToken
        ? commonData?.maticBondBalance ?? ZERO
        : commonData?.maticCertBalance ?? ZERO;

      trackUnstake({
        address,
        amount,
        name: walletName,
        newStakedBalance: synthBalance,
        newSynthTokens: synthBalance,
        newTokenBalance: commonData?.maticBalance ?? ZERO,
        stakeToken: MAIN_TOKEN,
        syntheticToken: selectedToken,
      });
    },
    [
      address,
      commonData?.maticBalance,
      commonData?.maticBondBalance,
      commonData?.maticCertBalance,
      isBondToken,
      selectedToken,
      walletName,
    ],
  );

  const onUnstakeSubmit = useCallback(
    (data: IUnstakeFormValues): void => {
      if (!data.amount) {
        return;
      }

      const amount = new BigNumber(data.amount);

      if (isShouldBeApproved) {
        approveACUnstake(amount);

        return;
      }

      unstake({
        amount,
        token: selectedToken,
      }).then(() => {
        sendAnalytics(amount);
      });
    },
    [
      approveACUnstake,
      isShouldBeApproved,
      selectedToken,
      sendAnalytics,
      unstake,
    ],
  );

  useProviderEffect(() => {
    getMATICPOLYGONCommonDataRefetch();

    return () => {
      dispatch(abortRequests());
    };
  }, [dispatch]);

  return {
    closeHref: CLOSE_HREF,
    extraValidation,
    getTotalVal,
    isApproveLoading,
    isApproved,
    isGetStatsLoading: isUnstakeStatsLoading || isCommonDataLoading,
    isUnstakeLoading,
    isWithApprove,
    maticPoolLiquidityInAC,
    selectedToken,
    syntTokenBalance,
    tokenOut: MAIN_TOKEN,
    unstakeFeePct,
    onUnstakeSubmit,
  };
};
