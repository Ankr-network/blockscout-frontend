import { useAuth } from 'domains/auth/hooks/useAuth';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';

export const useTopupFromDifferentAddress = () => {
  const { walletAddress: depositAddress } = useWalletAddress();

  const { address: authAddress } = useAuth();

  const isDepositAddressDifferent =
    depositAddress?.toLowerCase() !== authAddress.toLowerCase();

  return {
    depositAddress,
    isDepositAddressDifferent,
  };
};
