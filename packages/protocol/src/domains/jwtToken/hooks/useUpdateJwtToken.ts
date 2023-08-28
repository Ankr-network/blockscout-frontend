import { useCallback } from 'react';

import { updateJwtToken } from 'domains/jwtToken/action/updateJwtToken';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

interface UpdateJwtTokenParams {
  tokenIndex: number;
  name?: string;
  description?: string;
}

export const useUpdateJwtToken = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [updateJwtTokenQuery, { isLoading }, resetUpdateJwtToken] =
    useQueryEndpoint(updateJwtToken);

  const handleUpdateJwtToken = useCallback(
    ({ tokenIndex, name, description }: UpdateJwtTokenParams) =>
      updateJwtTokenQuery({
        tokenIndex,
        name,
        description,
        group,
      }),
    [group, updateJwtTokenQuery],
  );

  return {
    handleUpdateJwtToken,
    resetUpdateJwtToken,
    isLoading,
  };
};
