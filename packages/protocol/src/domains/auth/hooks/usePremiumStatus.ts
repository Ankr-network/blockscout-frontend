import { useLazyFetchPremiumStatusQuery } from 'domains/auth/actions/fetchPremiumStatus';
import { useGroupJwtToken } from 'domains/userGroup/hooks/useGroupJwtToken';

export const usePremiumStatus = () => {
  const { isLoadingGroupToken } = useGroupJwtToken();
  const [, { data: status, isLoading }] = useLazyFetchPremiumStatusQuery();

  return { status, isLoading: isLoadingGroupToken || isLoading };
};
