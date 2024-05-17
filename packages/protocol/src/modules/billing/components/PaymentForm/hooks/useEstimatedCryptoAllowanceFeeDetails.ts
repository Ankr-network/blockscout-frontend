import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { ECurrency, IFeeDetails } from 'modules/billing/types';
import { useAnkrAllowanceFee } from 'domains/account/hooks/useANKRAllowanceFee';
import { useUsdcAllowanceFee } from 'domains/account/hooks/useUSDCAllowanceFee';
import { useUsdtAllowanceFee } from 'domains/account/hooks/useUSDTAllowanceFee';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';

export interface IUseEstimatedCryptoAllowanceFeeDetailsProps {
  amount: number;
  price: string;
  currency: ECurrency;
  network: EBlockchain;
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
}

export const useEstimatedCryptoAllowanceFeeDetails = ({
  amount,
  price,
  currency,
  network,
  depositContractAddress,
  tokenAddress,
}: IUseEstimatedCryptoAllowanceFeeDetailsProps) => {
  const { hasWeb3Service } = useWeb3Service();

  const { fee: feeAnkr, isLoading: isLoadingAnkr } = useAnkrAllowanceFee({
    amount,
    skipFetching: !hasWeb3Service || currency !== ECurrency.ANKR,
  });

  const { fee: feeUsdt, isLoading: isLoadingUsdt } = useUsdtAllowanceFee({
    amount,
    network,
    tokenAddress,
    depositContractAddress,
    skipFetching:
      !hasWeb3Service ||
      currency !== ECurrency.USDT ||
      !depositContractAddress ||
      !tokenAddress,
  });

  const { fee: feeUsdc, isLoading: isLoadingUsdc } = useUsdcAllowanceFee({
    amount,
    network,
    tokenAddress,
    depositContractAddress,
    skipFetching:
      !hasWeb3Service ||
      currency !== ECurrency.USDC ||
      !depositContractAddress ||
      !tokenAddress,
  });

  const { fee, isLoading } = useMemo(() => {
    switch (currency) {
      case ECurrency.ANKR:
        return { fee: feeAnkr, isLoading: isLoadingAnkr };
      case ECurrency.USDT:
        return { fee: feeUsdt, isLoading: isLoadingUsdt };
      case ECurrency.USDC:
        return { fee: feeUsdc, isLoading: isLoadingUsdc };
      default:
        return { fee: 0, isLoading: false };
    }
  }, [
    currency,
    feeAnkr,
    feeUsdt,
    feeUsdc,
    isLoadingAnkr,
    isLoadingUsdt,
    isLoadingUsdc,
  ]);

  const approvalFeeDetails = useMemo<IFeeDetails>(
    () => ({
      feeCrypto: fee,
      feeUSD: new BigNumber(fee).multipliedBy(price).toNumber(),
    }),
    [fee, price],
  );

  return { approvalFeeDetails, isLoading };
};
