import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import { ECurrency } from 'modules/billing/types';
import { DEFAULT_TOKEN_DECIMALS } from 'modules/common/constants/const';

import {
  selectPaymentOptionsByNetwork,
  selectMyAllowanceAnkr,
  selectMyAllowanceAnkrLoading,
  selectMyAllowanceUsdt,
  selectMyAllowanceUsdtLoading,
  selectMyAllowanceUsdc,
  selectMyAllowanceUsdcLoading,
} from '../store/selectors';
import {
  useFetchMyAllowanceAnkrQuery,
  useLazyFetchMyAllowanceAnkrQuery,
} from '../actions/fetchMyAllowanceAnkr';
import {
  useFetchMyAllowanceUsdtQuery,
  useLazyFetchMyAllowanceUsdtQuery,
} from '../actions/fetchMyAllowanceUsdt';
import {
  useFetchMyAllowanceUsdcQuery,
  useLazyFetchMyAllowanceUsdcQuery,
} from '../actions/fetchMyAllowanceUsdc';
import { useTopUp } from './useTopUp';

export interface IUseMyAllowanceProps {
  skipFetching?: boolean;
}

export const useMyAllowance = ({
  skipFetching = false,
}: IUseMyAllowanceProps | void = {}) => {
  const { transactionCurrency: currency, transactionNetwork } = useTopUp();

  const {
    depositContractAddress = '',
    tokenAddress = '',
    tokenDecimals = DEFAULT_TOKEN_DECIMALS,
  } = useAppSelector(state =>
    selectPaymentOptionsByNetwork(state, transactionNetwork, currency),
  );

  const stableCoinTransactionParams = useMemo(
    () => ({
      depositContractAddress,
      tokenAddress,
      tokenDecimals,
    }),
    [depositContractAddress, tokenAddress, tokenDecimals],
  );

  useFetchMyAllowanceAnkrQuery(
    skipFetching || currency !== ECurrency.ANKR ? skipToken : undefined,
  );
  useFetchMyAllowanceUsdtQuery(
    skipFetching || currency !== ECurrency.USDT
      ? skipToken
      : stableCoinTransactionParams,
  );
  useFetchMyAllowanceUsdcQuery(
    skipFetching || currency !== ECurrency.USDC
      ? skipToken
      : stableCoinTransactionParams,
  );

  const [fetchMyAllowanceAnkr] = useLazyFetchMyAllowanceAnkrQuery();
  const myAllowanceAnkr = useAppSelector(selectMyAllowanceAnkr);
  const isLoadingAllowanceAnkr = useAppSelector(selectMyAllowanceAnkrLoading);

  const [fetchMyAllowanceUsdt] = useLazyFetchMyAllowanceUsdtQuery();
  const myAllowanceUsdt = useAppSelector(selectMyAllowanceUsdt);
  const isLoadingAllowanceUsdt = useAppSelector(selectMyAllowanceUsdtLoading);

  const [fetchMyAllowanceUsdc] = useLazyFetchMyAllowanceUsdcQuery();
  const myAllowanceUsdc = useAppSelector(selectMyAllowanceUsdc);
  const isLoadingAllowanceUsdc = useAppSelector(selectMyAllowanceUsdcLoading);

  const { fetchMyAllowance, isLoading, myAllowance } = useMemo(() => {
    switch (currency) {
      case ECurrency.USDT:
        return {
          fetchMyAllowance: () =>
            fetchMyAllowanceUsdt(stableCoinTransactionParams),
          isLoading: isLoadingAllowanceUsdt,
          myAllowance: myAllowanceUsdt,
        };
      case ECurrency.USDC:
        return {
          fetchMyAllowance: () =>
            fetchMyAllowanceUsdc(stableCoinTransactionParams),
          isLoading: isLoadingAllowanceUsdc,
          myAllowance: myAllowanceUsdc,
        };
      default:
      case ECurrency.ANKR:
        return {
          fetchMyAllowance: fetchMyAllowanceAnkr,
          isLoading: isLoadingAllowanceAnkr,
          myAllowance: myAllowanceAnkr,
        };
    }
  }, [
    currency,
    fetchMyAllowanceAnkr,
    fetchMyAllowanceUsdc,
    fetchMyAllowanceUsdt,
    isLoadingAllowanceAnkr,
    isLoadingAllowanceUsdc,
    isLoadingAllowanceUsdt,
    myAllowanceAnkr,
    myAllowanceUsdc,
    myAllowanceUsdt,
    stableCoinTransactionParams,
  ]);

  return { fetchMyAllowance, isLoading, myAllowance };
};
