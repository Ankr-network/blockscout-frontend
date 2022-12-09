import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ACTION_CACHE_SEC, DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { useUnstakeAVAXMutation } from 'modules/stake-avax/actions/unstake';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/useGetAVAXCommonDataQuery';
import { RoutesConfig } from 'modules/stake-avax/Routes';
import { TAvaxSyntToken } from 'modules/stake-avax/types';
import { getValidSelectedToken } from 'modules/stake-avax/utils/getValidSelectedToken';
import { IUnstakeFormValues } from 'modules/stake/components/UnstakeDialog';

import { useUnstakeAvaxAnalytics } from './useUnstakeAvaxAnalytics';

interface IUseUnstakeAvax {
  syntTokenBalance?: BigNumber;
  maxAmount: BigNumber;
  isFetchStatsLoading: boolean;
  isUnstakeLoading: boolean;
  closeHref: string;
  selectedToken: TAvaxSyntToken;
  onUnstakeSubmit: (values: IUnstakeFormValues) => void;
  calcTotalRecieve: (amount: BigNumber) => string;
}

export const useUnstakeAvalance = (): IUseUnstakeAvax => {
  const { sendAnalytics } = useUnstakeAvaxAnalytics();

  const stakeParamsToken = RoutesConfig.unstake.useParams().token;
  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const {
    data: fetchStatsData,
    isFetching: isFetchStatsLoading,
    refetch: getAvaxCommonData,
  } = useGetAVAXCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const [unstake, { isLoading: isUnstakeLoading }] = useUnstakeAVAXMutation();

  const isBondToken = selectedToken === Token.aAVAXb;
  const closeHref = DashboardRoutes.dashboard.generatePath();
  const syntTokenBalance = isBondToken
    ? fetchStatsData?.aAVAXbBalance
    : fetchStatsData?.aAVAXcBalance;

  const maxAavaxbAmount = fetchStatsData?.aAVAXbBalance ?? ZERO;
  const maxAavaxcAmount = fetchStatsData?.aAVAXcBalance ?? ZERO;
  const maxAmount = isBondToken ? maxAavaxbAmount : maxAavaxcAmount;
  const aavaxcRatio = fetchStatsData?.aAVAXcRatio ?? ZERO;

  const onUnstakeSubmit = useCallback(
    ({ amount: formAmount }: IUnstakeFormValues): void => {
      if (!formAmount) {
        return;
      }

      const amount = new BigNumber(formAmount);

      unstake({ amount, token: selectedToken })
        .unwrap()
        .then(() => {
          sendAnalytics(amount, selectedToken);
        });
    },
    [selectedToken, sendAnalytics, unstake],
  );

  const calcTotalRecieve = useCallback(
    (amount: BigNumber = ZERO): string => {
      let total = amount;
      if (!isBondToken) total = total.dividedBy(aavaxcRatio ?? ZERO);

      return total.decimalPlaces(DECIMAL_PLACES).toFormat();
    },
    [aavaxcRatio, isBondToken],
  );

  useProviderEffect(() => {
    getAvaxCommonData();
  }, [getAvaxCommonData]);

  return {
    syntTokenBalance,
    selectedToken,
    maxAmount,
    isFetchStatsLoading,
    isUnstakeLoading,
    closeHref,
    onUnstakeSubmit,
    calcTotalRecieve,
  };
};
