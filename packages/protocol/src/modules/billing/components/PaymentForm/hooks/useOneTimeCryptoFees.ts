import { EBlockchain } from 'multirpc-sdk';

import { ECurrency } from 'modules/billing/types';
import { useAppSelector } from 'store/useAppSelector';
import { selectPaymentOptionsByNetwork } from 'domains/account/store/selectors';

import { useHasEnoughTokenBalance } from './useHasEnoughTokenBalance';
import { useEstimatedCryptoAllowanceFeeDetails } from './useEstimatedCryptoAllowanceFeeDetails';
import { useEstimatedCryptoDepositFeeDetails } from './useEstimatedCryptoDepositFeeDetails';

interface IOneTimeCryptoFees {
  amount: number;
  currency: ECurrency;
  network: EBlockchain;
  price: string;
}

export const useOneTimeCryptoFees = ({
  amount,
  currency,
  network,
  price,
}: IOneTimeCryptoFees) => {
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
    hasEnoughTokenBalance,
    isWalletTokenBalanceLoading,
    refetchBalances,
    approvalFeeDetails,
    isAllowanceFeeLoading,
    depositFeeDetails,
    isDepositFeeLoading,
  };
};
