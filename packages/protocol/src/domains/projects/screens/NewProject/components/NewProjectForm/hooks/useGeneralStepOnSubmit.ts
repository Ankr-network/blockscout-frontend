import { useCallback } from 'react';

import { useCreateJwtToken } from 'domains/jwtToken/hooks/useCreateJwtToken';
import { useUpdateJwtToken } from 'domains/jwtToken/hooks/useUpdateJwtToken';

export const useGeneralStepOnSubmit = () => {
  const { handleCreateJwtToken } = useCreateJwtToken();
  const { handleUpdateJwtToken } = useUpdateJwtToken();

  const handleCreateToken = useCallback(
    async (tokenIndex: number, name: string, description?: string) => {
      const { data } = await handleCreateJwtToken({
        tokenIndex,
        name,
        description,
      });

      return data;
    },
    [handleCreateJwtToken],
  );

  const handleUpdateToken = useCallback(
    async (tokenIndex: number, name: string, description?: string) => {
      const { data } = await handleUpdateJwtToken({
        tokenIndex,
        name,
        description,
      });

      return data;
    },
    [handleUpdateJwtToken],
  );

  return {
    handleCreateToken,
    handleUpdateToken,
  };
};
