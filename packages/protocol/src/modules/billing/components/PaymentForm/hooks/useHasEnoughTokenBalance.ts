import { Web3Address } from 'multirpc-sdk';
import { useMemo } from 'react';

import { ECurrency } from 'modules/billing/types';
import { useWalletAccountANKRBalance } from 'domains/account/hooks/useWalletAccountANKRBalance';
import { useWalletAccountUSDCBalance } from 'domains/account/hooks/useWalletAccountUSDCBalance';
import { useWalletAccountUSDTBalance } from 'domains/account/hooks/useWalletAccountUSDTBalance';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';

export interface IUseHasEnoughTokenBalanceProps {
  amount: number;
  currency: ECurrency;
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
}

export const useHasEnoughTokenBalance = ({
  amount,
  currency,
  depositContractAddress,
  tokenAddress,
  tokenDecimals,
}: IUseHasEnoughTokenBalanceProps) => {
  const { walletAddress: connectedAddress } = useWalletAddress();

  const {
    ankrBalance,
    isLoading: isWalletAnkrTokenBalanceLoading,
    refetchANKRBalance,
  } = useWalletAccountANKRBalance({
    skipFetching: !connectedAddress || currency !== ECurrency.ANKR,
  });

  const { usdtBalance, isLoading: isWalletUsdtTokenBalanceLoading } =
    useWalletAccountUSDTBalance({
      depositContractAddress,
      tokenAddress,
      tokenDecimals,
      skipFetching:
        currency !== ECurrency.USDT ||
        !connectedAddress ||
        !depositContractAddress ||
        !tokenAddress,
    });

  const { usdcBalance, isLoading: isWalletUsdcTokenBalanceLoading } =
    useWalletAccountUSDCBalance({
      depositContractAddress,
      tokenAddress,
      tokenDecimals,
      skipFetching:
        currency !== ECurrency.USDC ||
        !connectedAddress ||
        !depositContractAddress ||
        !tokenAddress,
    });

  const { tokenBalance, isWalletTokenBalanceLoading } = useMemo(() => {
    switch (currency) {
      case ECurrency.USDT:
        return {
          tokenBalance: usdtBalance,
          isWalletTokenBalanceLoading: isWalletUsdtTokenBalanceLoading,
        };
      case ECurrency.USDC:
        return {
          tokenBalance: usdcBalance,
          isWalletTokenBalanceLoading: isWalletUsdcTokenBalanceLoading,
        };
      default:
      case ECurrency.ANKR:
        return {
          tokenBalance: ankrBalance,
          isWalletTokenBalanceLoading: isWalletAnkrTokenBalanceLoading,
        };
    }
  }, [
    ankrBalance,
    currency,
    isWalletAnkrTokenBalanceLoading,
    isWalletUsdcTokenBalanceLoading,
    isWalletUsdtTokenBalanceLoading,
    usdcBalance,
    usdtBalance,
  ]);

  const hasEnoughTokenBalance = tokenBalance >= amount;

  return {
    hasEnoughTokenBalance,
    isWalletTokenBalanceLoading,
    refetchANKRBalance,
  };
};
