import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { NotificationActions } from 'domains/notification/store/NotificationActions';

import {
  IUseProjectChainsConfirmUtilsProps,
  useProjectChainsNotification,
} from './useProjectChainsNotification';
import {
  IUseChangedProjectsProps,
  useChangedProjects,
} from './useChangedProjects';

interface IProjectsChainsConfirmProps
  extends IUseProjectChainsConfirmUtilsProps,
    IUseChangedProjectsProps {
  onCloseAddToProjectsSidebar: () => void;
}

const { showNotification } = NotificationActions;

export const useProjectsChainsConfirm = ({
  allCurrentChainPaths,
  allPathsExceptCurrentChain,
  allProjects,
  chain,
  onCloseAddToProjectsSidebar,
  selectedSubchains,
}: IProjectsChainsConfirmProps) => {
  const dispatch = useDispatch();

  const { getChangedProjects, isLoadingAddChainsToProject } =
    useChangedProjects({
      allCurrentChainPaths,
      allPathsExceptCurrentChain,
      allProjects,
      selectedSubchains,
    });

  const { getNotificationMessage } = useProjectChainsNotification({
    allCurrentChainPaths,
    chain,
    selectedSubchains,
  });

  const onConfirm = useCallback(async () => {
    const changedProjects = await getChangedProjects();

    if (changedProjects.length > 0) {
      const message = getNotificationMessage(changedProjects);

      dispatch(
        showNotification({
          message,
          severity: 'success',
        }),
      );
    }

    onCloseAddToProjectsSidebar();
  }, [
    getChangedProjects,
    getNotificationMessage,
    dispatch,
    onCloseAddToProjectsSidebar,
  ]);

  return {
    isLoadingAddChainsToProject,
    onConfirm,
  };
};
