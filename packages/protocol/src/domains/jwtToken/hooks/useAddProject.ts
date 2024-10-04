import { t } from '@ankr.com/common';
import { useCallback, useMemo, useState } from 'react';

import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';

import { jwtTokenIntlRoot } from '../utils/utils';
import { useCreateJwtToken } from './useCreateJwtToken';

export enum AddProjectStep {
  initial = 'initial',
  success = 'success',
  failed = 'failed',
}

export const useAddProject = (tokenIndex: number) => {
  const [addProjectStep, setAddProjectStep] = useState(AddProjectStep.initial);
  const [successProjectName, setSuccessProjectName] = useState('');
  const [userEndpointToken, setUserEndpointToken] = useState('');

  const projectName = useMemo(
    () =>
      t(`${jwtTokenIntlRoot}.additional`, {
        index: tokenIndex,
      }),
    [tokenIndex],
  );

  const { handleCreateJwtToken, isLoading } = useCreateJwtToken();

  const handleCreate = useCallback(async () => {
    const response = await handleCreateJwtToken({ tokenIndex });

    if (isMutationSuccessful(response)) {
      setSuccessProjectName(
        t(`${jwtTokenIntlRoot}.additional`, {
          index: response.data?.index,
        }),
      );
      setUserEndpointToken(response.data?.userEndpointToken || '');
      setAddProjectStep(AddProjectStep.success);
    } else {
      setAddProjectStep(AddProjectStep.failed);
    }
  }, [
    handleCreateJwtToken,
    setAddProjectStep,
    setSuccessProjectName,
    setUserEndpointToken,
    tokenIndex,
  ]);

  return {
    projectName,
    successProjectName,
    isLoading,
    userEndpointToken,
    addProjectStep,
    setAddProjectStep,
    handleCreate,
  };
};
