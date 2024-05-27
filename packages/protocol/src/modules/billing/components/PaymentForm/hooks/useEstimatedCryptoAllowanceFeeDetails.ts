import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { ECurrency, IFeeDetails } from 'modules/billing/types';
import { useAnkrAllowanceFee } from 'domains/account/hooks/useANKRAllowanceFee';
import { useUsdcAllowanceFee } from 'domains/account/hooks/useUSDCAllowanceFee';
import { useUsdtAllowanceFee } from 'domains/account/hooks/useUSDTAllowanceFee';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';
import {
  LOW_APPROXIMATED_CRYPTO,
  LOW_APPROXIMATED_USD,
} from 'modules/common/constants/const';
import { getTxExplorerUrl } from 'modules/billing/utils/getTxExplorerUrl';

export interface IUseEstimatedCryptoAllowanceFeeDetailsProps {
  amount: number;
  currency: ECurrency;
  network: EBlockchain;
  depositContractAddress: Web3Address;
  price: string;
  tokenAddress: Web3Address;
  tokenDecimals: number;
  txHash?: string;
}

export const useEstimatedCryptoAllowanceFeeDetails = ({
  amount,
  currency,
  network,
  depositContractAddress,
  price,
  tokenAddress,
  tokenDecimals,
  txHash,
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
    tokenDecimals,
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
    tokenDecimals,
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

  const approvalFeeDetails = useMemo<IFeeDetails>(() => {
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
      txURL: txHash ? getTxExplorerUrl(txHash) : undefined,
    };
  }, [fee, price]);

  return { approvalFeeDetails, isLoading };
};
