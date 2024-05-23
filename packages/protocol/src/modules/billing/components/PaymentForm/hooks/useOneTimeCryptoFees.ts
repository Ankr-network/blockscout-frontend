import { EBlockchain } from 'multirpc-sdk';

import { ECurrency } from 'modules/billing/types';
import { selectPaymentOptionsByNetwork } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useNativeTokenPrice } from 'domains/account/hooks/useNativeTokenPrice';

import { useEstimatedCryptoAllowanceFeeDetails } from './useEstimatedCryptoAllowanceFeeDetails';
import { useEstimatedCryptoDepositFeeDetails } from './useEstimatedCryptoDepositFeeDetails';
import { useHasEnoughTokenBalance } from './useHasEnoughTokenBalance';

interface IOneTimeCryptoFees {
  amount: number;
  currency: ECurrency;
  network: EBlockchain;
}

export const useOneTimeCryptoFees = ({
  amount,
  currency,
  network,
}: IOneTimeCryptoFees) => {
  const { price, isLoading: isNativeTokenPriceLoading } = useNativeTokenPrice({
    network,
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
    refetchBalances,
  } = useHasEnoughTokenBalance({
    amount,
    currency,
    network,
    depositContractAddress,
    tokenAddress,
    tokenDecimals,
  });

  const { approvalFeeDetails, isLoading: isAllowanceFeeLoading } =
    useEstimatedCryptoAllowanceFeeDetails({
      amount,
      currency,
      network,
      depositContractAddress,
      price,
      tokenAddress,
      tokenDecimals,
    });

  const { depositFeeDetails, isLoading: isDepositFeeLoading } =
    useEstimatedCryptoDepositFeeDetails({
      amount,
      price,
      currency,
      network,
      depositContractAddress,
      tokenAddress,
      tokenDecimals,
    });

  return {
    approvalFeeDetails,
    depositFeeDetails,
    hasEnoughTokenBalance,
    isAllowanceFeeLoading,
    isDepositFeeLoading,
    isNativeTokenPriceLoading,
    isWalletTokenBalanceLoading,
    refetchBalances,
  };
};
