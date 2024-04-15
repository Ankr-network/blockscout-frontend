import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';
import { useWalletAccountANKRBalance } from 'domains/account/hooks/useWalletAccountANKRBalance';

export interface IUseHasEnoughTokenBalanceProps {
  amount: number;
}

export const useHasEnoughTokenBalance = ({
  amount,
}: IUseHasEnoughTokenBalanceProps) => {
  const { connectedAddress } = useConnectedAddress();

  const { ankrBalance: tokenBalance, isLoading: isWalletTokenBalanceLoading } =
    useWalletAccountANKRBalance({
      skipFetching: !connectedAddress,
    });

  const hasEnoughTokenBalance = tokenBalance >= amount;

  return { hasEnoughTokenBalance, isWalletTokenBalanceLoading };
};
