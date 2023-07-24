import { useCallback } from 'react';

import { createJwtToken } from 'domains/jwtToken/action/createJwtToken';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useCreateJwtToken = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [createJwtTokenQuery, { isLoading }, resetCreateJwtToken] =
    useQueryEndpoint(createJwtToken);

  const handleCreateJwtToken = useCallback(
    (tokenIndex: number) =>
      createJwtTokenQuery({
        tokenIndex,
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
