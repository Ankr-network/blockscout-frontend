import { useAppSelector } from 'store/useAppSelector';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';

import {
  selectWalletAccountANKRBalance,
  selectWalletAccountANKRBalanceFetching,
  selectWalletAccountANKRBalanceLoading,
} from '../store/selectors';
import { useFetchWalletAccountANKRBalanceQuery } from '../actions/balance/fetchWalletAccountANRKBalance';

export interface IUseWalletAccountANKRBalanceProps {
  skipFetching?: boolean;
}

export const useWalletAccountANKRBalance = ({
  skipFetching = false,
}: IUseWalletAccountANKRBalanceProps | void = {}) => {
  const { hasWeb3Service } = useWeb3Service();

  const { refetch: refetchANKRBalance } = useFetchWalletAccountANKRBalanceQuery(
    undefined,
    {
      skip: skipFetching || !hasWeb3Service,
    },
  );

  const ankrBalance = useAppSelector(selectWalletAccountANKRBalance);
  const isFetching = useAppSelector(selectWalletAccountANKRBalanceFetching);
  const isLoading = useAppSelector(selectWalletAccountANKRBalanceLoading);

  return { ankrBalance, isFetching, isLoading, refetchANKRBalance };
};
