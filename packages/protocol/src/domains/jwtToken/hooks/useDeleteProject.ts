import { useCallback, useMemo, useState } from 'react';
import { t } from '@ankr.com/common';
import { deleteJwtToken } from 'domains/jwtToken/action/deleteJwtToken';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { jwtTokenIntlRoot } from '../utils/utils';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { is2FAError } from 'store/utils/is2FAError';

export enum DeleteProjectStep {
  initial = 'initial',
  failed = 'failed',
}

export const useDeleteProject = (
  viewTokenIndex: number,
  selectTokenIndex: number,
  onClose: () => void,
  setSelectedIndex: (index: number) => void,
) => {
  const [deleteProjectStep, setDeleteProjectStep] = useState(
    DeleteProjectStep.initial,
  );

  const [deleteProject, { isLoading }, reset] =
    useQueryEndpoint(deleteJwtToken);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const handleDelete = useCallback(() => {
    const deleteAction = async () => {
      const { error } = await deleteProject({
        params: {
          tokenIndex: viewTokenIndex,
          group,
        },
      });

      if (error && !is2FAError(error)) {
        setDeleteProjectStep(DeleteProjectStep.failed);
      } else {
        setDeleteProjectStep(DeleteProjectStep.initial);

        if (viewTokenIndex === selectTokenIndex) {
          setSelectedIndex(0);
        }

        onClose();
      }

      reset();
    };

    deleteAction();
  }, [
    viewTokenIndex,
    selectTokenIndex,
    deleteProject,
    setSelectedIndex,
    onClose,
    setDeleteProjectStep,
    reset,
    group,
  ]);

  const title = useMemo(
    () =>
      deleteProjectStep === DeleteProjectStep.initial
        ? t(`${jwtTokenIntlRoot}.delete-project.title`)
        : t(`${jwtTokenIntlRoot}.${deleteProjectStep}.title`),
    [deleteProjectStep],
  );

  return {
    title,
    deleteProjectStep,
    setDeleteProjectStep,
    deleteProject,
    isLoading,
    handleDelete,
  };
};
