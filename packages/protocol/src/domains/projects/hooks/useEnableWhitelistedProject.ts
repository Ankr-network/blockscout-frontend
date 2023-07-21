import { useEffect } from 'react';

import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep } from 'domains/projects/types';

import { useEnableWhitelist } from './useEnableWhitelist';

export const useEnableWhitelistedProject = (hasReason: boolean) => {
  const { project = {}, projectStep } = useProjectConfig();

  const { handleEnableWhitelist } = useEnableWhitelist();

  useEffect(() => {
    const isCheckedOut =
      projectStep === NewProjectStep.Checkout &&
      project?.[NewProjectStep.Checkout]?.isCheckedOut;

    if (isCheckedOut && hasReason) {
      handleEnableWhitelist();
    }
  }, [handleEnableWhitelist, project, projectStep, hasReason]);
};
