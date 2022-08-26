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
import { useCallback } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { t } from 'common';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { FormErrors } from 'modules/common/types/FormErrors';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { getValidSelectedToken } from 'modules/stake-matic/common/utils/getValidSelectedToken';
import { approveACUnstake } from 'modules/stake-matic/polygon/actions/approveACUnstake';
import { getCommonData } from 'modules/stake-matic/polygon/actions/getCommonData';
import { getUnstakeStats } from 'modules/stake-matic/polygon/actions/getUnstakeStats';
import { unstake } from 'modules/stake-matic/polygon/actions/unstake';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';
import { useAppDispatch } from 'store/useAppDispatch';

interface IUseUnstakeData {
  acPoolLiquidityInMATIC: BigNumber;
  closeHref: string;
  extraValidation?: (
    data: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
  ) => FormErrors<IUnstakeFormValues>;
  getTotalVal: (maxAmount: BigNumber, amount?: BigNumber) => BigNumber;
  isApproveLoading: boolean;
  isApproved: boolean;
  isGetStatsLoading: boolean;
  isSuccessOpened: boolean;
  isUnstakeLoading: boolean;
  isWithApprove: boolean;
  selectedToken: TMaticSyntToken;
  syntTokenBalance?: BigNumber;
  tokenOut: string;
  unstakeFeePct: BigNumber | null;
  onSuccessClose: () => void;
  onUnstakeSubmit: (data: IUnstakeFormValues) => void;
}

const CLOSE_HREF = DashboardRoutes.dashboard.generatePath();
const MAIN_TOKEN = Token.MATIC;

const resetRequests = () =>
  resetReduxRequests([
    approveACUnstake.toString(),
    getCommonData.toString(),
    getUnstakeStats.toString(),
  ]);

/**
 * TODO Remove a token hardcode (MATIC on Polygon)
 */
export const useUnstake = (): IUseUnstakeData => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessDialogClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const { data: approveData, loading: isApproveLoading } = useQuery({
    type: approveACUnstake,
  });

  const { data: commonData, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });

  const { data: getStatsData, loading: isUnstakeStatsLoading } = useQuery({
    type: getUnstakeStats,
  });

  const stakeParamsToken = Token.aMATICc;

  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const isApproved = !!approveData;

  const isBondToken = selectedToken === Token.aMATICb;

  const isWithApprove = !isBondToken;

  const isShouldBeApproved = isWithApprove && !isApproved;

  const acPoolLiquidity = getStatsData?.acPoolLiquidity ?? ZERO;

  const acPoolLiquidityInMATIC = getStatsData?.acPoolLiquidityInMATIC ?? ZERO;

  const acRatio = commonData?.ratio ?? ZERO;

  const syntTokenBalance = commonData?.maticCertBalance;

  const unstakeFeePct = getStatsData?.unstakeFeePct.isGreaterThan(0)
    ? getStatsData?.unstakeFeePct
    : null;

  const extraValidation = (
    { amount: userAmount }: Partial<IUnstakeFormValues>,
    errors: FormErrors<IUnstakeFormValues>,
  ): FormErrors<IUnstakeFormValues> => {
    if (typeof userAmount === 'string') {
      const currAmount = new BigNumber(userAmount);

      if (currAmount.isGreaterThan(acPoolLiquidity)) {
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
        ? amount.minus(amount.multipliedBy(unstakeFeePct))
        : amount;

      if (amountVal.isLessThanOrEqualTo(0)) {
        return ZERO;
      }

      return isCertToken ? amountVal.dividedBy(acRatio) : amountVal;
    },
    [acRatio, isBondToken, unstakeFeePct],
  );

  const sendAnalytics = (amount: BigNumber): void => {
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
  };

  const onSuccessClose = useCallback((): void => {
    dispatch(resetReduxRequests([approveACUnstake.toString()]));

    onSuccessDialogClose();
  }, [dispatch, onSuccessDialogClose]);

  const onUnstakeSubmit = useCallback(
    (data: IUnstakeFormValues): void => {
      if (!data.amount) {
        return;
      }

      const amount = new BigNumber(data.amount);

      if (isShouldBeApproved) {
        dispatchRequest(approveACUnstake(amount));

        return;
      }

      dispatchRequest(
        unstake({
          amount,
          token: selectedToken,
        }),
      ).then(({ error }) => {
        if (!error) {
          onSuccessOpen();

          sendAnalytics(amount);
        }
      });
    },
    [dispatchRequest, isShouldBeApproved, onSuccessOpen, selectedToken],
  );

  useProviderEffect(() => {
    dispatch(resetRequests());

    dispatch(getCommonData());
    dispatch(getUnstakeStats());

    return () => {
      dispatch(abortRequests());
      dispatch(resetRequests());
    };
  }, [dispatch]);

  return {
    acPoolLiquidityInMATIC,
    closeHref: CLOSE_HREF,
    extraValidation,
    getTotalVal,
    isApproveLoading,
    isApproved,
    isGetStatsLoading: isUnstakeStatsLoading || isCommonDataLoading,
    isSuccessOpened,
    isUnstakeLoading,
    isWithApprove,
    selectedToken,
    syntTokenBalance,
    tokenOut: MAIN_TOKEN,
    unstakeFeePct,
    onSuccessClose,
    onUnstakeSubmit,
  };
};
