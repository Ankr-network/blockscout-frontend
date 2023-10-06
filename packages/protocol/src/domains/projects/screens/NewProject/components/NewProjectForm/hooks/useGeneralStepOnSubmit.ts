import { useCallback } from 'react';

import { useCreateJwtToken } from 'domains/jwtToken/hooks/useCreateJwtToken';

export const useGeneralStepOnSubmit = () => {
  const { handleCreateJwtToken } = useCreateJwtToken();

  return useCallback(
    async (tokenIndex: number, name: string, description?: string) => {
      const { data: url } = await handleCreateJwtToken({
        tokenIndex,
        name,
        description,
      });

      return url;
    },
    [handleCreateJwtToken],
  );
};
