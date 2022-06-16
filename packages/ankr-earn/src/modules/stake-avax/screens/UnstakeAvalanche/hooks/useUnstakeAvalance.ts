import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { fetchStats } from 'modules/stake-avax/actions/fetchStats';
import { unstake } from 'modules/stake-avax/actions/unstake';
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

export const useUnstakeAvalance = (onSuccess: () => void): IUseUnstakeAvax => {
  const dispatchRequest = useDispatchRequest();
  const { sendAnalytics } = useUnstakeAvaxAnalytics();

  const stakeParamsToken = RoutesConfig.unstake.useParams().token;
  const selectedToken = getValidSelectedToken(stakeParamsToken);

  const { loading: isFetchStatsLoading, data: fetchStatsData } = useQuery({
    type: fetchStats,
  });
  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const isBondToken = selectedToken === Token.aAVAXb;
  const closeHref = DashboardRoutes.dashboard.generatePath();
  const syntTokenBalance = isBondToken
    ? fetchStatsData?.aAVAXbBalance
    : fetchStatsData?.aAVAXcBalance;

  const maxAavaxbAmount = fetchStatsData?.aAVAXbBalance ?? ZERO;
  const maxAavaxcAmount = fetchStatsData?.aAVAXcBalance ?? ZERO;
  const maxAmount = isBondToken ? maxAavaxbAmount : maxAavaxcAmount;
  const aavaxcRatio = fetchStatsData?.aAVAXcRatio ?? ZERO;

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

      handleSubmit(value);
    },
    [handleSubmit],
  );

  const calcTotalRecieve = useCallback(
    (amount: BigNumber = ZERO): string => {
      let total = amount;
      if (!isBondToken) total = total.dividedBy(aavaxcRatio ?? ZERO);

      return total.decimalPlaces(DECIMAL_PLACES).toFormat();
    },
    [aavaxcRatio, isBondToken],
  );

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
