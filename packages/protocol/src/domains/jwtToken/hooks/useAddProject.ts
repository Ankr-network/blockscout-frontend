import { useCallback, useMemo, useState } from 'react';
import { t } from '@ankr.com/common';

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

  const { handleCreateJwtToken, isLoading, resetCreateJwtToken } =
    useCreateJwtToken();

  const handleCreate = useCallback(async () => {
    const { data, error } = await handleCreateJwtToken({
      tokenIndex,
    });

    if (error) {
      setAddProjectStep(AddProjectStep.failed);
    } else {
      setSuccessProjectName(
        t(`${jwtTokenIntlRoot}.additional`, {
          index: data?.index,
        }),
      );
      setUserEndpointToken(data?.userEndpointToken || '');
      setAddProjectStep(AddProjectStep.success);
    }

    resetCreateJwtToken();
  }, [
    handleCreateJwtToken,
    resetCreateJwtToken,
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
