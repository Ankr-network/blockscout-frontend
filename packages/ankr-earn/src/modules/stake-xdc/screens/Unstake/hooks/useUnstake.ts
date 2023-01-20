import BigNumber from 'bignumber.js';
import { useCallback, useMemo, useState } from 'react';

import { trackUnstake } from 'modules/analytics/tracking-actions/trackUnstake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { useLazyGetUnstakeDataQuery } from 'modules/stake-xdc/actions/getUnstakeData';
import { useUnstakeMutation } from 'modules/stake-xdc/actions/unstake';
import { XDC_PROVIDER_ID } from 'modules/stake-xdc/const';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

interface IUseUnstakeData {
  closeHref: string;
  getTotalVal: (maxAmount: BigNumber, amount?: BigNumber) => BigNumber;
  infoLabel?: string;
  isUnstakeDataLoading: boolean;
  isUnstakeLoading: boolean;
  poolAmount: BigNumber;
  syntToken: Token;
  syntTokenBalance?: BigNumber;
  tokenOut: Token;
  onChange: (data: IUnstakeFormValues) => void;
  onSubmit: (data: IUnstakeFormValues) => void;
}

const CLOSE_HREF = DashboardRoutes.dashboard.generatePath();
const TOKEN_IN = Token.ankrXDC;
const TOKEN_OUT = Token.XDC;

export const useUnstake = (): IUseUnstakeData => {
  const [isActiveInfoLabel, setIsActiveInfoLabel] = useState(false);

  const { address, walletName } = useConnectedData(XDC_PROVIDER_ID);

  const [
    getUnstakeData,
    { data: unstakeData, isFetching: isUnstakeDataLoading },
  ] = useLazyGetUnstakeDataQuery();

  const [unstake, { isLoading: isUnstakeLoading }] = useUnstakeMutation();

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: TOKEN_OUT,
  });

  const infoLabel = useMemo(
    () => (isActiveInfoLabel ? unstakeLabel : undefined),
    [isActiveInfoLabel, unstakeLabel],
  );

  const poolAmount = unstakeData?.xdcPoolAmount ?? ZERO;
  const syntTokenBalance = unstakeData?.ankrXDCBalance ?? ZERO;
  const syntTokenRatio = unstakeData?.ankrXDCRatio ?? ZERO;
  const xdcBalance = unstakeData?.xdcBalance ?? ZERO;

  const getTotalVal = useCallback(
    (maxAmount: BigNumber, amount: BigNumber = ZERO): BigNumber => {
      const isInvalidData =
        amount.isZero() ||
        amount.isNaN() ||
        amount.isGreaterThan(maxAmount) ||
        syntTokenRatio.isZero();

      return isInvalidData ? ZERO : amount.dividedBy(syntTokenRatio);
    },
    [syntTokenRatio],
  );

  const sendAnalytics = (amount: BigNumber): void => {
    trackUnstake({
      address,
      amount,
      name: walletName,
      newStakedBalance: syntTokenBalance,
      newSynthTokens: syntTokenBalance,
      newTokenBalance: xdcBalance,
      stakeToken: TOKEN_OUT,
      syntheticToken: TOKEN_IN,
    });
  };

  const onChange = ({ amount }: IUnstakeFormValues): void => {
    if (!amount) {
      setIsActiveInfoLabel(false);

      return;
    }

    const resultAmount = new BigNumber(amount);
    const isNewActiveState = resultAmount.isGreaterThan(poolAmount);

    setIsActiveInfoLabel(isNewActiveState);
  };

  const onSubmit = ({ amount }: IUnstakeFormValues): void => {
    if (!amount) {
      return;
    }

    const resultAmount = new BigNumber(amount);

    unstake({ amount: resultAmount })
      .unwrap()
      .then(() => sendAnalytics(resultAmount));
  };

  useProviderEffect(() => {
    getUnstakeData();
  }, []);

  return {
    closeHref: CLOSE_HREF,
    getTotalVal,
    infoLabel,
    isUnstakeDataLoading,
    isUnstakeLoading,
    poolAmount,
    syntToken: TOKEN_IN,
    syntTokenBalance,
    tokenOut: TOKEN_OUT,
    onChange,
    onSubmit,
  };
};
