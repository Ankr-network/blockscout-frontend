import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';

export const useShouldDepositForAnotherAccount = () => {
  const { authAddress } = useAuth();
  const { selectedGroupAddress: groupAddress } = useSelectedUserGroup();
  const { walletAddress } = useWalletAddress();

  const shouldDepositForAnotherAccount =
    Boolean(groupAddress) || authAddress !== walletAddress;

  return { shouldDepositForAnotherAccount };
};
