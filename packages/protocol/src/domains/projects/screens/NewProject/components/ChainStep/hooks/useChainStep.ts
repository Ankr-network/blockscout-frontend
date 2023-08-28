import { useEffect, useRef } from 'react';
import { useForm } from 'react-final-form';

import { ChainStepFields } from 'domains/projects/store';
import { useAddProject } from 'domains/jwtToken/hooks/useAddProject';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';

import { NewProjectFormValues } from '../../NewProjectForm/NewProjectFormTypes';

export const useChainStep = () => {
  const { change, getState } = useForm<NewProjectFormValues>();

  const { tokenIndex: projectTokenIndex, projectName: initProjectName } =
    getState().values;

  const savedTokenIndex = useRef(projectTokenIndex);

  const { allowedAddProjectTokenIndex } = useJwtTokenManager();

  const currentTokenIndex =
    savedTokenIndex.current || allowedAddProjectTokenIndex;

  const { projectName } = useAddProject(currentTokenIndex);

  useEffect(() => {
    change(ChainStepFields.tokenIndex, currentTokenIndex);
    if (!initProjectName || initProjectName.length === 0) {
      change(ChainStepFields.projectName, projectName);
    }
  }, [change, projectName, currentTokenIndex, initProjectName]);
};
