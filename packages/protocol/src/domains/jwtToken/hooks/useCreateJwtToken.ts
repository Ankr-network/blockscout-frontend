import { useCallback } from 'react';

import { createJwtToken } from 'domains/jwtToken/action/createJwtToken';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

interface CreateJwtTokenParams {
  tokenIndex: number;
  name?: string;
  description?: string;
}

export const useCreateJwtToken = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [createJwtTokenQuery, { isLoading }, resetCreateJwtToken] =
    useQueryEndpoint(createJwtToken);

  const handleCreateJwtToken = useCallback(
    ({ tokenIndex, name, description }: CreateJwtTokenParams) =>
      createJwtTokenQuery({
        tokenIndex,
        name,
        description,
        group,
      }),
    [group, createJwtTokenQuery],
  );

  return {
    handleCreateJwtToken,
    resetCreateJwtToken,
    isLoading,
  };
};
