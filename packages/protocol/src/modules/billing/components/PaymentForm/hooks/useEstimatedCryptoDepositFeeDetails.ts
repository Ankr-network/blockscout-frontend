import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { ECurrency, IFeeDetails } from 'modules/billing/types';
import { useANKRDepositFee } from 'domains/account/hooks/useANKRDepositFee';
import { useUSDCDepositFee } from 'domains/account/hooks/useUSDCDepositFee';
import { useUSDTDepositFee } from 'domains/account/hooks/useUSDTDepositFee';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';
import {
  LOW_APPROXIMATED_CRYPTO,
  LOW_APPROXIMATED_USD,
} from 'modules/common/constants/const';

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
    feeAnkr,
    feeUsdt,
    feeUsdc,
    isLoadingAnkr,
    isLoadingUsdt,
    isLoadingUsdc,
  ]);

  const depositFeeDetails = useMemo<IFeeDetails>(() => {
    const feeCryptoBN = new BigNumber(fee);
    const feeCrypto = feeCryptoBN.isLessThan(LOW_APPROXIMATED_CRYPTO)
      ? LOW_APPROXIMATED_CRYPTO
      : feeCryptoBN;

    const feeUsdBN = feeCryptoBN.multipliedBy(price);
    const feeUsd = feeUsdBN.isLessThan(LOW_APPROXIMATED_USD)
      ? LOW_APPROXIMATED_USD
      : feeUsdBN;

    return {
      feeCrypto: feeCrypto.toNumber(),
      feeUSD: feeUsd.toNumber(),
    };
  }, [fee, price]);

  return { depositFeeDetails, isLoading };
};
