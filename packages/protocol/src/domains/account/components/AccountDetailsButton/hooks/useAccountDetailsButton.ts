import { useAccountState } from 'domains/account/hooks/useAccountState';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBalance } from 'domains/account/hooks/useBalance';

export const useAccountDetailsButton = () => {
  const { hasStatusTransition, loading: isConnecting } = useAuth();

  const { creditBalance: balance, fetching: isBalanceLoading } = useBalance({
    skipFetching: true,
  });

  const { status } = useAccountState();

  return {
    balance,
    hasStatusTransition,
    isLoading: isBalanceLoading || isConnecting,
    status,
  };
};
