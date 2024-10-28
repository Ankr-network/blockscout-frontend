import { useCallback, useMemo } from 'react';
import { ChainPath } from '@ankr.com/chains-list';
import { useDispatch } from 'react-redux';

import { useAddBlockchainsToWhitelistMutation } from 'domains/projects/actions/addBlockchainsToWhitelist';
import { useSelectedProject } from 'domains/projects/hooks/useSelectedProject';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useAppSelector } from 'store/useAppSelector';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import {
  selectAllChainsPaths,
  selectAllPathsByChainId,
  selectBlockchainsBySubchainIds,
  selectChainIdsByPaths,
} from 'modules/chains/store/selectors';
import { Locale } from 'modules/i18n';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { truncateString } from 'modules/common/utils/truncateString';
import { MAX_PROJECT_NAME_LENGTH } from 'domains/chains/screens/ChainPage/components/ChainProjectsSidebar/hooks/useProjectChainsNotification';
import { useProjectWhitelistBlockchains } from 'domains/projects/hooks/useProjectWhitelistBlockchains';

export interface UseAddChainHandlerParams {
  onAddChainsSuccess: () => void;
  selectedProjectChainsPaths: ChainPath[];
}

const { showNotification } = NotificationActions;

const addChainsToProjectHandlerTranslation = {
  [Locale.en]: {
    addedToProject: '{name} added to project',
    removedFromProject: '{name} removed from project',
    projectChainsEdited: "{name} project's chains edited",
  },
};

export const useAddChainsToProjectHandler = ({
  onAddChainsSuccess,
  selectedProjectChainsPaths,
}: UseAddChainHandlerParams) => {
  const allChainsPaths = useAppSelector(selectAllChainsPaths);

  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { project } = useSelectedProject();

  const token = project?.userEndpointToken;

  const { projectWhitelistBlockchains: projectBlockchainsBeforeEdit } =
    useProjectWhitelistBlockchains({
      group,
      skipFetching: true,
      token: token!,
    });

  const newChainsPaths = useMemo(
    () =>
      selectedProjectChainsPaths.filter(
        path => !projectBlockchainsBeforeEdit?.includes(path),
      ),
    [selectedProjectChainsPaths, projectBlockchainsBeforeEdit],
  );

  const removedChainsPaths = useMemo(
    () =>
      projectBlockchainsBeforeEdit?.filter(
        path => !selectedProjectChainsPaths.includes(path),
      ) || [],
    [selectedProjectChainsPaths, projectBlockchainsBeforeEdit],
  );

  const newChainIds = useAppSelector(state =>
    selectChainIdsByPaths(state, newChainsPaths),
  );

  const newChains =
    useAppSelector(state =>
      selectBlockchainsBySubchainIds(state, newChainIds),
    ) || [];

  const [firstNewChain] = newChains;

  const removedChainIds = useAppSelector(state =>
    selectChainIdsByPaths(state, removedChainsPaths),
  );

  const removedChains = useAppSelector(state =>
    selectBlockchainsBySubchainIds(state, removedChainIds),
  );

  const [firstRemovedChain] = removedChains;

  const allChainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, firstRemovedChain?.id),
  );

  const isChainFullyRemoved = useMemo(
    () =>
      removedChains.length === 1 &&
      selectedProjectChainsPaths.every(path => !allChainPaths.includes(path)),
    [selectedProjectChainsPaths, removedChains, allChainPaths],
  );

  const areAllChainsSelected =
    selectedProjectChainsPaths.length === allChainsPaths.length;

  const isOneChainAddedToProject =
    newChains.length === 1 && !removedChains.length;

  const isOneChainRemovedFromProject = !newChains.length && isChainFullyRemoved;

  const [addBlockchains, { isLoading: isAddingChainsToProject }] =
    useAddBlockchainsToWhitelistMutation();

  const dispatch = useDispatch();

  const { keys, t } = useTranslation(addChainsToProjectHandlerTranslation);

  const handleAddChainsToProject = useCallback(async () => {
    if (token) {
      addBlockchains({
        params: {
          blockchains: areAllChainsSelected ? [] : selectedProjectChainsPaths,
          group,
          userEndpointToken: token,
        },
      }).then(() => {
        let message = t(keys.projectChainsEdited, {
          name: project
            ? truncateString(project.name, MAX_PROJECT_NAME_LENGTH)
            : '',
        });

        if (isOneChainAddedToProject && !isOneChainRemovedFromProject) {
          message = t(keys.addedToProject, {
            name: firstNewChain?.name,
          });
        }

        if (isOneChainRemovedFromProject && !isOneChainAddedToProject) {
          message = t(keys.removedFromProject, {
            name: firstRemovedChain?.name,
          });
        }

        dispatch(
          showNotification({
            message,
            severity: 'success',
          }),
        );

        onAddChainsSuccess();
      });
    }
  }, [
    addBlockchains,
    areAllChainsSelected,
    dispatch,
    firstNewChain,
    firstRemovedChain,
    group,
    isOneChainAddedToProject,
    isOneChainRemovedFromProject,
    keys,
    onAddChainsSuccess,
    project,
    selectedProjectChainsPaths,
    t,
    token,
  ]);

  return { handleAddChainsToProject, isAddingChainsToProject };
};
