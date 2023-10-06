import { useEffect } from 'react';

import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';

import { useEnableWhitelist } from './useEnableWhitelist';

export const useEnableWhitelistedProject = (hasReason: boolean) => {
  const { project = {}, projectStep } = useProjectConfig();

  const { handleEnableWhitelist } = useEnableWhitelist();

  useEffect(() => {
    if (hasReason) {
      handleEnableWhitelist();
    }
  }, [handleEnableWhitelist, project, projectStep, hasReason]);
};
