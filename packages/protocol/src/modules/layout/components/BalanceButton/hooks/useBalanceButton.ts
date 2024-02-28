import { useAccountState } from 'domains/account/hooks/useAccountState';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';

export const useBalanceButton = () => {
  const { hasStatusTransition, loading: isConnecting } = useAuth();

  const {
    creditBalance: balance,
    fetching: isBalanceLoading,
    isUninitialized,
  } = useBalance({
    skipFetching: true,
  });

  const { status } = useAccountState();

  return {
    balance,
    hasStatusTransition,
    isLoading: isBalanceLoading || isConnecting,
    isUninitialized,
    status, // TODO: remove?
  };
};
