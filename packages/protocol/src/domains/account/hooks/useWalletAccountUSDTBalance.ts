import { Web3Address } from 'multirpc-sdk';

import { useAppSelector } from 'store/useAppSelector';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';

import {
  selectWalletAccountUSDTBalance,
  selectWalletAccountUSDTBalanceFetching,
  selectWalletAccountUSDTBalanceLoading,
} from '../store/selectors';
import { useFetchWalletAccountUSDTBalanceQuery } from '../actions/balance/fetchWalletAccountUSDTBalance';

export interface IUseWalletAccountUSDTBalanceProps {
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
  skipFetching?: boolean;
}

export const useWalletAccountUSDTBalance = ({
  depositContractAddress,
  tokenAddress,
  tokenDecimals,
  skipFetching = false,
}: IUseWalletAccountUSDTBalanceProps) => {
  const { hasWeb3Service } = useWeb3Service();

  useFetchWalletAccountUSDTBalanceQuery(
    { depositContractAddress, tokenAddress, tokenDecimals },
    {
      skip: skipFetching || !hasWeb3Service,
    },
  );

  const usdtBalance = useAppSelector(selectWalletAccountUSDTBalance);
  const isFetching = useAppSelector(selectWalletAccountUSDTBalanceFetching);
  const isLoading = useAppSelector(selectWalletAccountUSDTBalanceLoading);

  return { usdtBalance, isFetching, isLoading };
};
