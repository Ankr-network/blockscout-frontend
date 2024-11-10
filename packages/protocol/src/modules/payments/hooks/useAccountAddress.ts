import { selectAddress } from 'domains/auth/store';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useAccountAddress = () => {
  const { selectedGroupAddress } = useSelectedUserGroup();
  const authAddress = useAppSelector(selectAddress);

  const accountAddress = selectedGroupAddress || authAddress!;

  return { accountAddress };
};
