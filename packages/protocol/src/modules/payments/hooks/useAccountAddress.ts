import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useAccountAddress = () => {
  const { selectedGroupAddress } = useSelectedUserGroup();
  const { authAddress } = useAuth();

  const accountAddress = selectedGroupAddress || authAddress!;

  return { accountAddress };
};
