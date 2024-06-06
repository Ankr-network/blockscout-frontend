import { useEffect, useRef } from 'react';
import { useForm } from 'react-final-form';

import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { GeneralStepFields } from 'domains/projects/store';
import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';

import { NewProjectFormValues } from '../../NewProjectForm/NewProjectFormTypes';

export const useGeneralStep = () => {
  const { change } = useForm<NewProjectFormValues>();

  const { projectName: initProjectName, tokenIndex: projectTokenIndex } =
    useProjectFormValues();

  const savedTokenIndex = useRef(projectTokenIndex);

  const { allowedAddProjectTokenIndex } = useJwtTokenManager();

  const currentTokenIndex =
    savedTokenIndex.current || allowedAddProjectTokenIndex;

  useEffect(() => {
    change(GeneralStepFields.tokenIndex, currentTokenIndex);
  }, [change, currentTokenIndex, initProjectName]);
};
