import { skipToken } from '@reduxjs/toolkit/dist/query';
import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { useAppSelector } from 'store/useAppSelector';

import {
  selectWalletAccountUSDTBalance,
  selectWalletAccountUSDTBalanceFetching,
  selectWalletAccountUSDTBalanceLoading,
} from '../store/selectors';
import { useFetchWalletAccountUSDTBalanceQuery } from '../actions/balance/fetchWalletAccountUSDTBalance';

export interface IUseWalletAccountUSDTBalanceProps {
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  network: EBlockchain;
  tokenDecimals: number;
  skipFetching?: boolean;
}

export const useWalletAccountUSDTBalance = ({
  skipFetching = false,
  ...queryParams
}: IUseWalletAccountUSDTBalanceProps) => {
  const { refetch: refetchUSDTBalance } = useFetchWalletAccountUSDTBalanceQuery(
    skipFetching ? skipToken : queryParams,
  );

  const usdtBalance = useAppSelector(state =>
    selectWalletAccountUSDTBalance(state, queryParams),
  );

  const isFetching = useAppSelector(state =>
    selectWalletAccountUSDTBalanceFetching(state, queryParams),
  );

  const isLoading = useAppSelector(state =>
    selectWalletAccountUSDTBalanceLoading(state, queryParams),
  );

  return { usdtBalance, isFetching, isLoading, refetchUSDTBalance };
};
