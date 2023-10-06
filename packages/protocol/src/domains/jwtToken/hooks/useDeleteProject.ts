import { useCallback, useMemo, useState } from 'react';
import { t } from '@ankr.com/common';

import { deleteJwtToken } from 'domains/jwtToken/action/deleteJwtToken';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { is2FAError } from 'store/utils/is2FAError';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep } from 'domains/projects/types';

import { jwtTokenIntlRoot } from '../utils/utils';

export enum DeleteProjectStep {
  initial = 'initial',
  failed = 'failed',
}

const getTitle = (deleteProjectStep: DeleteProjectStep) => {
  return deleteProjectStep === DeleteProjectStep.initial
    ? t(`${jwtTokenIntlRoot}.delete-project.title`)
    : t(`${jwtTokenIntlRoot}.${deleteProjectStep}.title`);
};

export const useDeleteProject = (tokenIndex: number, onSuccess: () => void) => {
  const { project, handleResetConfig } = useProjectConfig();
  const newProjectTokenIndex = project?.[NewProjectStep.General]?.tokenIndex;
  const shouldResetNewProject = tokenIndex === newProjectTokenIndex;

  const [deleteProjectStep, setDeleteProjectStep] = useState(
    DeleteProjectStep.initial,
  );

  const [deleteProject, { isLoading }, reset] =
    useQueryEndpoint(deleteJwtToken);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const handleDelete = useCallback(async () => {
    const { error } = await deleteProject({
      params: {
        tokenIndex,
        group,
      },
    });

    if (error && !is2FAError(error)) {
      setDeleteProjectStep(DeleteProjectStep.failed);
    } else {
      setDeleteProjectStep(DeleteProjectStep.initial);

      if (shouldResetNewProject) {
        handleResetConfig();
      }

      onSuccess();
    }

    reset();
  }, [
    tokenIndex,
    deleteProject,
    onSuccess,
    setDeleteProjectStep,
    reset,
    group,
    shouldResetNewProject,
    handleResetConfig,
  ]);

  const title = useMemo(() => getTitle(deleteProjectStep), [deleteProjectStep]);

  return {
    title,
    deleteProjectStep,
    setDeleteProjectStep,
    deleteProject,
    isLoading,
    handleDelete,
  };
};
