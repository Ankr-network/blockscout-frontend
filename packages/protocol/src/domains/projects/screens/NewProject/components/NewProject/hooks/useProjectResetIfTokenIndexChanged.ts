import { useEffect, useRef } from 'react';

import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { NewProjectStep } from 'domains/projects/types';

export const useProjectResetIfTokenIndexChanged = (onResetStep: () => void) => {
  const isCheckedRef = useRef<boolean>();

  const { project, handleResetConfig } = useProjectConfig();
  const { isLoaded, allowedAddProjectTokenIndex } = useJwtTokenManager(true);
  const projectTokenIndex = project[NewProjectStep.Chain]?.tokenIndex;

  useEffect(() => {
    const reset = async () => {
      if (Number(projectTokenIndex) === allowedAddProjectTokenIndex) {
        isCheckedRef.current = true;

        await handleResetConfig();
        onResetStep();
      }
    };

    if (!isCheckedRef.current && isLoaded) reset();
  }, [
    isLoaded,
    projectTokenIndex,
    allowedAddProjectTokenIndex,
    handleResetConfig,
    onResetStep,
  ]);
};
