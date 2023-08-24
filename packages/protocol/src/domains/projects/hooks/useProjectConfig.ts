import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { NewProjectStep } from 'domains/projects/types';
import { useAppSelector } from 'store/useAppSelector';
import {
  NewProjectType,
  selectNewProjectConfig,
  setStepConfig,
  resetConfig,
} from 'domains/projects/store';
import { selectCurrentAddress } from 'domains/auth/store';

export const useProjectConfig = () => {
  const dispatch = useDispatch();
  const { step: projectStep, project = {} } = useAppSelector(
    selectNewProjectConfig,
  );
  const address = useAppSelector(selectCurrentAddress);

  const handleSetStepConfig = useCallback(
    (
      step: NewProjectStep,
      projectStepConfig: NewProjectType[NewProjectStep],
      nextStep: NewProjectStep,
    ) => {
      dispatch(
        setStepConfig({
          address,
          step,
          projectStepConfig,
          nextStep,
        }),
      );
    },
    [dispatch, address],
  );

  const handleResetConfig = useCallback(
    () => dispatch(resetConfig(address)),
    [dispatch, address],
  );

  return {
    handleSetStepConfig,
    handleResetConfig,
    projectStep,
    project,
    canEditProject:
      typeof projectStep === 'number' &&
      Boolean(project[NewProjectStep.Chain]?.userEndpointToken),
  };
};
