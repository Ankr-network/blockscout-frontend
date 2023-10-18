import { useEffect } from 'react';

import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep } from 'domains/projects/types';

import { useEnableWhitelist } from './useEnableWhitelist';

export const useEnableWhitelistedProject = (hasReason: boolean) => {
  const { project = {} } = useProjectConfig();

  const { handleEnableWhitelist, isLoading, userEndpointToken } =
    useEnableWhitelist();

  useEffect(() => {
    const isCheckedOut = project?.[NewProjectStep.Whitelist]?.isCheckedOut;

    if (isCheckedOut && hasReason) {
      handleEnableWhitelist();
    }
  }, [handleEnableWhitelist, project, hasReason]);

  return {
    isLoading,
    userEndpointToken,
  };
};
