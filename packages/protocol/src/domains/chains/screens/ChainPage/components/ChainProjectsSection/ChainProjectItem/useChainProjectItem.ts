import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import { Chain, Timeframe } from '@ankr.com/chains-list';

import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { useAppSelector } from 'store/useAppSelector';
import { selectDraftUserEndpointToken } from 'domains/projects/store';
import {
  selectAllProjects,
  selectProjectsStatuses,
} from 'domains/projects/store/WhitelistsSelector';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useSelectTokenIndex } from 'domains/jwtToken/hooks/useSelectTokenIndex';
import { ANIMATION_DURATION } from 'domains/projects/screens/Project/components/ProjectChainsAccordion/components/AccordionItem/hooks/useAccordionItem';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import {
  selectAllPathsByChainId,
  selectPrivateChainById,
} from 'modules/chains/store/selectors';
import { filterChainByPaths } from 'modules/chains/utils/filterChainByPaths';

import { useChainProjectRequestsData } from './useChainProjectRequestsData';
import { useCodeExampleStatus } from '../useCodeExampleStatus';

interface ChainProjectItemHookProps {
  chain: Chain;
  onOpenAddToProjectsDialog: () => void;
  jwtTokens: JwtManagerToken[];
  timeframe: Timeframe;
}

export interface IChainProjectItemProps
  extends JwtManagerToken,
    ChainProjectItemHookProps {
  isLoading: boolean;
}

export const useChainProjectItem = ({
  chain: nestedChain,
  jwtTokens,
  onOpenAddToProjectsDialog,
  timeframe,
  userEndpointToken,
}: ChainProjectItemHookProps & Pick<JwtManagerToken, 'userEndpointToken'>) => {
  const chain =
    useAppSelector(state =>
      selectPrivateChainById(state, nestedChain.id, userEndpointToken),
    ) || nestedChain;

  const { id } = chain;

  const allProjects = useAppSelector(selectAllProjects);
  const statusData = useAppSelector(selectProjectsStatuses);
  const draftUserEndpointToken = useAppSelector(selectDraftUserEndpointToken);

  const { currentChainRequestsData } = useChainProjectRequestsData(
    id,
    timeframe,
    userEndpointToken,
  );

  const {
    isOpened: isOpenedCodeExample,
    onClose: onCloseCodeExample,
    onOpen: onOpenCodeExampleDialog,
  } = useDialog();

  const { handleSelectTokenIndex } = useSelectTokenIndex();

  const currentProjectIndex = useMemo(
    () =>
      jwtTokens.find(token => token.userEndpointToken === userEndpointToken)
        ?.index || 0,
    [jwtTokens, userEndpointToken],
  );

  const onOpenCodeExample = useCallback(() => {
    handleSelectTokenIndex(currentProjectIndex);
    setTimeout(onOpenCodeExampleDialog, ANIMATION_DURATION);
  }, [currentProjectIndex, handleSelectTokenIndex, onOpenCodeExampleDialog]);

  const { blockchains = [] } =
    allProjects.find(
      project => project.userEndpointToken === userEndpointToken,
    ) || {};

  const allChainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, chain.id),
  );

  const isCurrentPathIncluded =
    allChainPaths?.length > 0 &&
    blockchains.length > 0 &&
    allChainPaths.some(path => blockchains.includes(path));

  const isCurrentChainIncluded =
    isCurrentPathIncluded || blockchains.length === 0; // empty array means all chains

  const currentProjectStatus = useMemo(
    () => ({
      ...statusData?.find(data => data.userEndpointToken === userEndpointToken)
        ?.status,
      draft: draftUserEndpointToken === userEndpointToken,
    }),
    [statusData, draftUserEndpointToken, userEndpointToken],
  );

  const { isCodeExampleDisabled } = useCodeExampleStatus(
    chain,
    onOpenCodeExample,
  );

  const history = useHistory();

  const projectPath = useMemo(
    () =>
      currentProjectStatus?.draft
        ? ProjectsRoutesConfig.newProject.generatePath()
        : ProjectsRoutesConfig.project.generatePath(userEndpointToken),
    [userEndpointToken, currentProjectStatus],
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

  const handleCloseCodeExample = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();
      onCloseCodeExample();
    },
    [onCloseCodeExample],
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
    if (blockchains.length === 0) {
      return chain;
    }

    return filterChainByPaths({ chain, paths: blockchains });
  }, [chain, blockchains]);

  return {
    currentChainRequestsData,
    currentProjectStatus,
    isCodeExampleDisabled,
    isCurrentChainIncluded,
    projectPath,

    /* actions */
    handleGoToProject,
    handleOpenCodeExample,
    handleCloseCodeExample,
    handleOpenAddToProjectsDialog,

    /* code example dialog props */
    isOpenedCodeExample,
    onCloseCodeExample,
    onOpenCodeExample,

    /* filtered chain by added paths */
    projectChain,
  };
};
