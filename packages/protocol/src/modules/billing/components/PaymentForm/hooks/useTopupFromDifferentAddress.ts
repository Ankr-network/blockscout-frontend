import { useAuth } from 'domains/auth/hooks/useAuth';
import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';

export const useTopupFromDifferentAddress = () => {
  const { connectedAddress: depositAddress } = useConnectedAddress();

  const { address: authAddress } = useAuth();

  const isDepositAddressDifferent =
    depositAddress?.toLowerCase() !== authAddress.toLowerCase();

  return {
    depositAddress,
    isDepositAddressDifferent,
  };
};
