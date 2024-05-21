import { EBlockchain, Web3Address } from 'multirpc-sdk';

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
  network: EBlockchain;
  tokenDecimals: number;
  skipFetching?: boolean;
}

export const useWalletAccountUSDCBalance = ({
  skipFetching = false,
  ...queryParams
}: IUseWalletAccountUSDCBalanceProps) => {
  const { hasWeb3Service } = useWeb3Service();

  const { refetch: refetchUSDCBalance } = useFetchWalletAccountUSDCBalanceQuery(
    queryParams,
    {
      skip: skipFetching || !hasWeb3Service,
    },
  );

  const usdcBalance = useAppSelector(state =>
    selectWalletAccountUSDCBalance(state, queryParams),
  );
  const isFetching = useAppSelector(state =>
    selectWalletAccountUSDCBalanceFetching(state, queryParams),
  );
  const isLoading = useAppSelector(state =>
    selectWalletAccountUSDCBalanceLoading(state, queryParams),
  );

  return { usdcBalance, isFetching, isLoading, refetchUSDCBalance };
};
