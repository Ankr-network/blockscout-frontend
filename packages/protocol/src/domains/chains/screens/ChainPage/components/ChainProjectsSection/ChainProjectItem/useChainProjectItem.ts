import React, { useCallback, useMemo } from 'react';
import { Chain, Timeframe } from '@ankr.com/chains-list';
import { useHistory } from 'react-router';

import { ANIMATION_DURATION } from 'domains/projects/screens/Project/components/ProjectChainsAccordion/components/AccordionItem/hooks/useAccordionItem';
import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { filterChainByPaths } from 'modules/chains/utils/filterChainByPaths';
import {
  selectAllPathsByChainId,
  selectPrivateChainById,
} from 'modules/chains/store/selectors';
import { selectDraftUserEndpointToken } from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useJWTStatus } from 'domains/jwtToken/hooks/useJWTStatus';
import { useProjectWhitelistBlockchains } from 'domains/projects/hooks/useProjectWhitelistBlockchains';
import { useSelectTokenIndex } from 'domains/jwtToken/hooks/useSelectTokenIndex';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';

import { useChainProjectRequestsData } from './useChainProjectRequestsData';
import { useCodeExampleStatus } from '../useCodeExampleStatus';

export interface IUseChainProjectItemProps {
  chain: Chain;
  jwt: JWT;
  onOpenAddToProjectsDialog: () => void;
  timeframe: Timeframe;
}

export const useChainProjectItem = ({
  chain: nestedChain,
  jwt,
  onOpenAddToProjectsDialog,
  timeframe,
}: IUseChainProjectItemProps) => {
  const { jwts } = useJWTsManager();
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const draftUserEndpointToken = useAppSelector(selectDraftUserEndpointToken);

  const { index: currentProjectIndex, userEndpointToken } = jwt;
  const isDraft = userEndpointToken === draftUserEndpointToken;

  const chain =
    useAppSelector(state =>
      selectPrivateChainById(state, nestedChain.id, userEndpointToken),
    ) || nestedChain;

  const { id } = chain;

  const { currentChainRequestsData, projectTotalRequestsLoading } =
    useChainProjectRequestsData(id, timeframe, userEndpointToken);

  const {
    isOpened: isOpenedCodeExample,
    onClose: handleCloseCodeExample,
    onOpen: onOpenCodeExampleDialog,
  } = useDialog();

  const { handleSelectTokenIndex } = useSelectTokenIndex();

  const onOpenCodeExample = useCallback(() => {
    handleSelectTokenIndex(currentProjectIndex);
    setTimeout(onOpenCodeExampleDialog, ANIMATION_DURATION);
  }, [currentProjectIndex, handleSelectTokenIndex, onOpenCodeExampleDialog]);

  const {
    loading: projectWhitelistBlockchainsLoading,
    projectWhitelistBlockchains,
  } = useProjectWhitelistBlockchains({
    group,
    token: userEndpointToken,
  });

  const { jwtStatus: projectStatus, loading: projectStatusLoading } =
    useJWTStatus({
      group,
      userEndpointToken,
    });

  const allChainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, chain.id),
  );

  const isCurrentPathIncluded = useMemo(() => {
    const hasProjectBlockchains = projectWhitelistBlockchains.length > 0;
    const isChainPathIncludedInProjectBlockchains = allChainPaths.some(path =>
      projectWhitelistBlockchains.includes(path),
    );

    return hasProjectBlockchains && isChainPathIncludedInProjectBlockchains;
  }, [allChainPaths, projectWhitelistBlockchains]);

  const isCurrentChainIncluded =
    isCurrentPathIncluded || projectWhitelistBlockchains.length === 0; // empty array means all chains

  const { isCodeExampleDisabled } = useCodeExampleStatus(
    chain,
    onOpenCodeExample,
  );

  const history = useHistory();

  const projectPath = useMemo(
    () =>
      isDraft
        ? ProjectsRoutesConfig.newProject.generatePath()
        : ProjectsRoutesConfig.project.generatePath(userEndpointToken),
    [isDraft, userEndpointToken],
  );

  const handleGoToProject = useCallback(() => {
    history.push(projectPath);
  }, [history, projectPath]);

  const handleOpenCodeExample = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();
      onOpenCodeExample();
    },
    [onOpenCodeExample],
  );

  const handleOpenAddToProjectsDialog = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();
      onOpenAddToProjectsDialog();
    },
    [onOpenAddToProjectsDialog],
  );

  const projectChain = useMemo(() => {
    // empty array means all chains are included, no need to filter.
    if (projectWhitelistBlockchains.length === 0) {
      return chain;
    }

    return filterChainByPaths({ chain, paths: projectWhitelistBlockchains });
  }, [chain, projectWhitelistBlockchains]);

  return {
    currentChainRequestsData,
    handleCloseCodeExample,
    handleGoToProject,
    handleOpenAddToProjectsDialog,
    handleOpenCodeExample,
    isCodeExampleDisabled,
    isCurrentChainIncluded,
    isDraft,
    isOpenedCodeExample,
    jwts,
    onOpenCodeExample,
    projectChain,
    projectPath,
    projectStatus,
    projectStatusLoading,
    projectTotalRequestsLoading,
    projectWhitelistBlockchains,
    projectWhitelistBlockchainsLoading,
  };
};
