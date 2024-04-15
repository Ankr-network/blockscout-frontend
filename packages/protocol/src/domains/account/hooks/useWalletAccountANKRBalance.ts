import { useAppSelector } from 'store/useAppSelector';
import { useHasWeb3Service } from 'domains/auth/hooks/useHasWeb3Service';

import {
  selectWalletAccountANKRBalance,
  selectWalletAccountANKRBalanceFetching,
  selectWalletAccountANKRBalanceLoading,
} from '../store/selectors';
import { useFetchWalletAccountANKRBalanceQuery } from '../actions/balance/fetchWalletAccountBalance';

export interface IUseWalletAccountANKRBalanceProps {
  skipFetching?: boolean;
}

export const useWalletAccountANKRBalance = ({
  skipFetching = false,
}: IUseWalletAccountANKRBalanceProps | void = {}) => {
  const { hasWeb3Service } = useHasWeb3Service();

  useFetchWalletAccountANKRBalanceQuery(undefined, {
    skip: skipFetching || !hasWeb3Service,
  });

  const ankrBalance = useAppSelector(selectWalletAccountANKRBalance);
  const isFetching = useAppSelector(selectWalletAccountANKRBalanceFetching);
  const isLoading = useAppSelector(selectWalletAccountANKRBalanceLoading);

  return { ankrBalance, isFetching, isLoading };
};
