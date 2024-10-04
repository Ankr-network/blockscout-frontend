import { useCallback, useMemo, useState, MouseEvent } from 'react';
import { t } from '@ankr.com/common';

import { NewProjectStep } from 'domains/projects/types';
import { is2FAError } from 'store/utils/is2FAError';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useDeleteJwtTokenMutation } from 'domains/jwtToken/action/deleteJwtToken';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

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

export const useDeleteProject = (
  tokenIndex: number,
  onSuccess: (
    is2FaError: boolean,
    event?: MouseEvent<HTMLButtonElement>,
  ) => void,
) => {
  const { handleResetConfig, project } = useProjectConfig();
  const newProjectTokenIndex = project?.[NewProjectStep.General]?.tokenIndex;
  const shouldResetNewProject = tokenIndex === newProjectTokenIndex;

  const [deleteProjectStep, setDeleteProjectStep] = useState(
    DeleteProjectStep.initial,
  );

  const [deleteProject, { isLoading }] = useDeleteJwtTokenMutation();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const handleDelete = useCallback(
    async (event?: MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();

      const response = await deleteProject({
        params: {
          tokenIndex,
          group,
        },
      });

      const error = isMutationSuccessful(response) ? undefined : response.error;

      if (error && !is2FAError(error)) {
        setDeleteProjectStep(DeleteProjectStep.failed);
      } else {
        setDeleteProjectStep(DeleteProjectStep.initial);

        if (shouldResetNewProject) {
          handleResetConfig();
        }

        onSuccess(is2FAError(error), event);
      }
    },
    [
      tokenIndex,
      deleteProject,
      onSuccess,
      setDeleteProjectStep,
      group,
      shouldResetNewProject,
      handleResetConfig,
    ],
  );

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
