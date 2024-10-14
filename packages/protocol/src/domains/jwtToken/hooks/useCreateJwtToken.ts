import { useCallback } from 'react';

import { useCreateJwtTokenMutation } from 'domains/jwtToken/action/createJwtToken';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

interface CreateJwtTokenParams {
  tokenIndex: number;
  name?: string;
  description?: string;
}

export interface IUseCreateJwtProps {
  cacheKey?: string;
}

export const useCreateJwtToken = ({ cacheKey }: IUseCreateJwtProps = {}) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [createJwtTokenQuery, { isLoading }] = useCreateJwtTokenMutation({
    fixedCacheKey: cacheKey,
  });

  const handleCreateJwtToken = useCallback(
    ({ description, name, tokenIndex }: CreateJwtTokenParams) =>
      createJwtTokenQuery({
        tokenIndex,
        name,
        description,
        group,
      }),
    [group, createJwtTokenQuery],
  );

  return { handleCreateJwtToken, isLoading };
};
