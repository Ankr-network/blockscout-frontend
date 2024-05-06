import { Web3Address } from 'multirpc-sdk';

import { useAppSelector } from 'store/useAppSelector';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';

import {
  selectWalletAccountUSDCBalance,
  selectWalletAccountUSDCBalanceFetching,
  selectWalletAccountUSDCBalanceLoading,
} from '../store/selectors';
import { useFetchWalletAccountUSDCBalanceQuery } from '../actions/balance/fetchWalletAccountUSDCBalance';

export interface IUseWalletAccountUSDCBalanceProps {
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
  skipFetching?: boolean;
}

export const useWalletAccountUSDCBalance = ({
  depositContractAddress,
  tokenAddress,
  tokenDecimals,
  skipFetching = false,
}: IUseWalletAccountUSDCBalanceProps) => {
  const { hasWeb3Service } = useWeb3Service();

  useFetchWalletAccountUSDCBalanceQuery(
    { depositContractAddress, tokenAddress, tokenDecimals },
    {
      skip: skipFetching || !hasWeb3Service,
    },
  );

  const usdcBalance = useAppSelector(selectWalletAccountUSDCBalance);
  const isFetching = useAppSelector(selectWalletAccountUSDCBalanceFetching);
  const isLoading = useAppSelector(selectWalletAccountUSDCBalanceLoading);

  return { usdcBalance, isFetching, isLoading };
};
