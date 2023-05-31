import { useEffect } from 'react';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { useLazyFetchAllowedJwtTokensCountQuery } from 'domains/jwtToken/action/getAllowedJwtTokensCount';

export const useDashboardProjects = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { shouldShowTokenManager } = useTokenManagerConfigSelector();

  const [fetchJwtTokens] = useLazyFetchAllowedJwtTokensCountQuery();

  useEffect(() => {
    fetchJwtTokens({ group });
  }, [group, fetchJwtTokens]);

  return {
    shouldShowTokenManager,
  };
};
