import { useCallback } from 'react';

import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useCreateJwtToken } from 'domains/jwtToken/hooks/useCreateJwtToken';
import { useUpdateJwtToken } from 'domains/jwtToken/hooks/useUpdateJwtToken';

export const useGeneralStepOnSubmit = () => {
  const { handleCreateJwtToken } = useCreateJwtToken();
  const { handleUpdateJwtToken } = useUpdateJwtToken();

  const handleCreateToken = useCallback(
    async (tokenIndex: number, name: string, description?: string) => {
      const response = await handleCreateJwtToken({
        tokenIndex,
        name,
        description,
      });

      return isMutationSuccessful(response) ? response.data : undefined;
    },
    [handleCreateJwtToken],
  );

  const handleUpdateToken = useCallback(
    async (tokenIndex: number, name: string, description?: string) => {
      const response = await handleUpdateJwtToken({
        tokenIndex,
        name,
        description,
      });

      return isMutationSuccessful(response) ? response.data : undefined;
    },
    [handleUpdateJwtToken],
  );

  return { handleCreateToken, handleUpdateToken };
};
