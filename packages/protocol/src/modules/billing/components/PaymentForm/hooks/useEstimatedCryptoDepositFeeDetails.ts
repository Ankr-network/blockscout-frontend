import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { ECurrency, IFeeDetails } from 'modules/billing/types';
import { useANKRDepositFee } from 'domains/account/hooks/useANKRDepositFee';
import { useUSDCDepositFee } from 'domains/account/hooks/useUSDCDepositFee';
import { useUSDTDepositFee } from 'domains/account/hooks/useUSDTDepositFee';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';

export interface IUseEstimatedCryptoDepositFeeDetailsParams {
  amount: number;
  price: string;
  currency: ECurrency;
  network: EBlockchain;
  depositContractAddress: Web3Address;
  tokenAddress: Web3Address;
  tokenDecimals: number;
}

export const useEstimatedCryptoDepositFeeDetails = ({
  amount,
  price,
  currency,
  network,
  depositContractAddress,
  tokenAddress,
  tokenDecimals,
}: IUseEstimatedCryptoDepositFeeDetailsParams) => {
  const { hasWeb3Service } = useWeb3Service();

  const { fee: feeAnkr, isLoading: isLoadingAnkr } = useANKRDepositFee({
    amount,
    skipFetching: !hasWeb3Service || currency !== ECurrency.ANKR,
  });

  const { fee: feeUsdt, isLoading: isLoadingUsdt } = useUSDTDepositFee({
    amount,
    network,
    depositContractAddress,
    tokenAddress,
    tokenDecimals,
    skipFetching:
      !hasWeb3Service ||
      !depositContractAddress ||
      !tokenAddress ||
      currency !== ECurrency.USDT,
  });

  const { fee: feeUsdc, isLoading: isLoadingUsdc } = useUSDCDepositFee({
    amount,
    network,
    depositContractAddress,
    tokenAddress,
    tokenDecimals,
    skipFetching:
      !hasWeb3Service ||
      !depositContractAddress ||
      !tokenAddress ||
      currency !== ECurrency.USDC,
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
    network,
    feeAnkr,
    feeUsdt,
    feeUsdc,
    isLoadingAnkr,
    isLoadingUsdt,
    isLoadingUsdc,
  ]);

  const depositFeeDetails = useMemo<IFeeDetails>(
    () => ({
      feeCrypto: fee,
      feeUSD: new BigNumber(fee).multipliedBy(price).toNumber(),
    }),
    [fee, price],
  );

  return { depositFeeDetails, isLoading };
};
