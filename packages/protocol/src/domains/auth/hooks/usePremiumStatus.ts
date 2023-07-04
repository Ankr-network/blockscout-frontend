import {
  defaultPremiumStatusData,
  useLazyFetchPremiumStatusQuery,
} from 'domains/auth/actions/fetchPremiumStatus';
import { useGroupJwtToken } from 'domains/userGroup/hooks/useGroupJwtToken';

export const usePremiumStatus = () => {
  const { isLoadingGroupToken } = useGroupJwtToken();
  const [, { data: { isFreemium } = defaultPremiumStatusData, isLoading }] =
    useLazyFetchPremiumStatusQuery();

  return { isFreemium, isLoading: isLoadingGroupToken || isLoading };
};
