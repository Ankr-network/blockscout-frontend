import { EBlockchain } from 'multirpc-sdk';

import { ECurrency } from 'modules/billing/types';
import { selectPaymentOptionsByNetwork } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useNativeTokenPrice } from 'domains/account/hooks/useNativeTokenPrice';
import { useWeb3Service } from 'domains/auth/hooks/useWeb3Service';

import { useEstimatedCryptoAllowanceFeeDetails } from './useEstimatedCryptoAllowanceFeeDetails';
import { useEstimatedCryptoDepositFeeDetails } from './useEstimatedCryptoDepositFeeDetails';
import { useHasEnoughTokenBalance } from './useHasEnoughTokenBalance';

interface IOneTimeCryptoFees {
  allowanceTxHash?: string;
  amount: number;
  currency: ECurrency;
  depositTxHash?: string;
  network: EBlockchain;
}

export const useOneTimeCryptoFees = ({
  allowanceTxHash,
  amount,
  currency,
  depositTxHash,
  network,
}: IOneTimeCryptoFees) => {
  const { hasWeb3Service } = useWeb3Service();

  const { price, isLoading: isNativeTokenPriceLoading } = useNativeTokenPrice({
    network,
    skipFetching: !hasWeb3Service,
  });

  const {
    depositContractAddress = '',
    tokenAddress = '',
    tokenDecimals = 0,
  } = useAppSelector(state =>
    selectPaymentOptionsByNetwork(state, network, currency),
  );

  const {
    hasEnoughTokenBalance,
    isWalletTokenBalanceLoading,
    refetchANKRBalance,
  } = useHasEnoughTokenBalance({
    amount,
    currency,
    depositContractAddress,
    tokenAddress,
    tokenDecimals,
  });

  const { approvalFeeDetails, isLoading: isAllowanceFeeLoading } =
    useEstimatedCryptoAllowanceFeeDetails({
      amount,
      currency,
      depositContractAddress,
      price,
      tokenAddress,
      tokenDecimals,
      txHash: allowanceTxHash,
    });

  const { depositFeeDetails, isLoading: isDepositFeeLoading } =
    useEstimatedCryptoDepositFeeDetails({
      amount,
      price,
      currency,
      depositContractAddress,
      tokenAddress,
      tokenDecimals,
      txHash: depositTxHash,
    });

  const isLoading =
    isAllowanceFeeLoading ||
    isDepositFeeLoading ||
    isNativeTokenPriceLoading ||
    isWalletTokenBalanceLoading;

  return {
    approvalFeeDetails,
    depositFeeDetails,
    hasEnoughTokenBalance,
    isLoading,
    isWalletTokenBalanceLoading,
    refetchANKRBalance,
  };
};
