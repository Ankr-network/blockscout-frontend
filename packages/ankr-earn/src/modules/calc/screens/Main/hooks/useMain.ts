import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { getBalance } from 'modules/calc/actions/getBalance';
import { TCalcToken } from 'modules/calc/types';
import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { getDecimalPlaces } from 'modules/common/utils/numbers/getDecimalPlaces';

import { SUPPORTED_TOKENS } from '../../../const';

import { useMetrics } from './useMetrics';
import { TFormValues, useTokensValues } from './useTokensValues';
import {
  IUseTokensVisibility,
  TVisibilityState,
  useTokensVisibility,
} from './useTokensVisibility';

const balanceRequests = SUPPORTED_TOKENS.map(token => ({
  requestType: getBalance.toString(),
  requestKey: token,
}));

interface IToken {
  token: TCalcToken;
  apy: BigNumber;
  staked: BigNumber;
  balance: BigNumber;
  usdTokenPrice: BigNumber;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCloseClick: () => void;
}

interface IUseMain {
  avarageApy: BigNumber;
  dataByToken: IToken[];
  isLoading: boolean;
  totalYearlyYieldUsd: BigNumber;
  visibilityState: TVisibilityState;
  valuesState: TFormValues;
  setTokenVisibility: IUseTokensVisibility['setTokenVisibility'];
}

export const useMain = (): IUseMain => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const {
    state: valuesState,
    setTokenValue,
    updateState: updateValuesState,
    setDefaultState: setDefaultValuesState,
  } = useTokensValues();

  const {
    state: visibilityState,
    setTokenVisibility,
    updateState: updateVisibilityState,
    setDefaultVisibilityState,
  } = useTokensVisibility();

  const { isLoading: isMetricsLoading, metrics } = useMetrics();

  const balanceQueries = SUPPORTED_TOKENS.map(token =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({ type: getBalance, requestKey: token }),
  );

  const { dataByToken, isAllBalancesLoading } = useMemo(
    () =>
      SUPPORTED_TOKENS.reduce(
        (acc, token, index) => {
          const { apy, usdTokenPrice } = metrics[token];
          const { data: balanceData, loading: isBalanceloading } =
            balanceQueries[index];

          acc.isAllBalancesLoading =
            acc.isAllBalancesLoading || isBalanceloading;

          if (apy.isZero() || usdTokenPrice.isZero()) {
            return acc;
          }

          const staked = balanceData ? balanceData.staked : ZERO;
          const balance = balanceData ? balanceData.balance : ZERO;

          const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
            setTokenValue(event.target.value, token);

          const handleCloseClick = () => {
            setTokenVisibility(token, false);
            setTokenValue(
              balance.decimalPlaces(DEFAULT_ROUNDING).toString(),
              token,
            );
          };

          acc.dataByToken.push({
            token,
            balance,
            staked,
            apy,
            usdTokenPrice,
            handleChange,
            handleCloseClick,
          });

          return acc;
        },
        { dataByToken: [] as IToken[], isAllBalancesLoading: false },
      ),
    [balanceQueries, metrics, setTokenValue, setTokenVisibility],
  );

  const { totalBalanceUsd, totalYearlyYieldUsd } = useMemo(
    () =>
      dataByToken.reduce(
        (acc, { staked, apy, usdTokenPrice, token }) => {
          const isTokenActive = visibilityState[token];

          if (!isTokenActive) {
            return acc;
          }

          const value = valuesState[token];

          const totalTokenBalanceUsd = staked
            .plus(value || 0)
            .multipliedBy(usdTokenPrice);

          const yearlyTokenYieldUsd = totalTokenBalanceUsd.multipliedBy(
            apy.dividedBy(100),
          );

          acc.totalBalanceUsd = totalTokenBalanceUsd.plus(acc.totalBalanceUsd);
          acc.totalYearlyYieldUsd = yearlyTokenYieldUsd.plus(
            acc.totalYearlyYieldUsd,
          );

          return acc;
        },
        { totalBalanceUsd: ZERO, totalYearlyYieldUsd: ZERO },
      ),
    [dataByToken, valuesState, visibilityState],
  );

  const avarageApy = totalYearlyYieldUsd.isZero()
    ? ZERO
    : totalYearlyYieldUsd.dividedBy(totalBalanceUsd).multipliedBy(100);

  useProviderEffect(() => {
    dispatch(resetRequests(balanceRequests));

    SUPPORTED_TOKENS.forEach(token => {
      dispatchRequest(getBalance(token));
    });

    return () => {
      dispatch(resetRequests(balanceRequests));
    };
  }, [dispatchRequest]);

  useEffect(() => {
    if (isAllBalancesLoading) {
      return;
    }

    const { newValuesState, newVisibilityState, isAtLeastOneVisible } =
      balanceQueries.reduce(
        (acc, balanceQuery, index) => {
          const token = SUPPORTED_TOKENS[index];
          const balance = balanceQuery.data?.balance ?? ZERO;
          const staked = balanceQuery.data?.staked ?? ZERO;

          const isVisible = !balance.isZero() || !staked.isZero();

          const decimalPlaces = getDecimalPlaces(balance);
          acc.newValuesState[token] = balance
            .decimalPlaces(decimalPlaces)
            .toString();

          acc.newVisibilityState[token] = isVisible;

          acc.isAtLeastOneVisible = acc.isAtLeastOneVisible || isVisible;

          return acc;
        },
        {
          newValuesState: {} as TFormValues,
          newVisibilityState: {} as TVisibilityState,
          isAtLeastOneVisible: false,
        },
      );

    if (isAtLeastOneVisible) {
      updateValuesState(newValuesState);
      updateVisibilityState(newVisibilityState);
    } else {
      setDefaultValuesState();
      setDefaultVisibilityState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllBalancesLoading]);

  return {
    avarageApy,
    dataByToken,
    isLoading: isAllBalancesLoading || isMetricsLoading,
    totalYearlyYieldUsd,
    visibilityState,
    valuesState,
    setTokenVisibility,
  };
};
