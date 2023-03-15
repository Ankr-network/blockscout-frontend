import { useCallback, useMemo, useState } from 'react';
import { t } from '@ankr.com/common';
import { createJwtToken } from 'domains/jwtToken/action/createJwtToken';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { jwtTokenIntlRoot } from '../utils/utils';

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

  const [createJwtTokenQuery, { isLoading }, reset] =
    useQueryEndpoint(createJwtToken);

  const handleCreate = useCallback(() => {
    const create = async () => {
      const { data, error } = await createJwtTokenQuery(tokenIndex);

      if (error) {
        setAddProjectStep(AddProjectStep.failed);
      } else {
        setSuccessProjectName(
          t(`${jwtTokenIntlRoot}.additional`, {
            index: data?.index,
          }),
        );
        setUserEndpointToken(data?.userEndpointToken ?? '');
        setAddProjectStep(AddProjectStep.success);
      }

      reset();
    };

    create();
  }, [
    tokenIndex,
    createJwtTokenQuery,
    setAddProjectStep,
    setSuccessProjectName,
    setUserEndpointToken,
    reset,
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
