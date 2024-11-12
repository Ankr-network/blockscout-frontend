import { Chain, Timeframe } from '@ankr.com/chains-list';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import {
  selectAllPathsByChainId,
  selectPrivateChainById,
} from 'modules/chains/store/selectors';
import { selectDraftUserEndpointToken } from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';
import { useJWTStatus } from 'domains/jwtToken/hooks/useJWTStatus';
import { useProjectWhitelistBlockchains } from 'domains/projects/hooks/useProjectWhitelistBlockchains';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useChainProjectRequestsData } from './useChainProjectRequestsData';

export interface IUseChainProjectItemProps {
  chain: Chain;
  jwt: JWT;
  timeframe: Timeframe;
}

export const useChainProjectItem = ({
  chain: nestedChain,
  jwt,
  timeframe,
}: IUseChainProjectItemProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const draftUserEndpointToken = useAppSelector(selectDraftUserEndpointToken);

  const { userEndpointToken } = jwt;
  const isDraft = userEndpointToken === draftUserEndpointToken;

  const chain =
    useAppSelector(state =>
      selectPrivateChainById(state, nestedChain.id, userEndpointToken),
    ) || nestedChain;

  const { id } = chain;

  const { currentChainRequestsData, projectTotalRequestsLoading } =
    useChainProjectRequestsData(id, timeframe, userEndpointToken);

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

  return {
    chain,
    currentChainRequestsData,
    handleGoToProject,
    isCurrentChainIncluded,
    isDraft,
    projectPath,
    projectStatus,
    projectStatusLoading,
    projectTotalRequestsLoading,
    projectWhitelistBlockchains,
    projectWhitelistBlockchainsLoading,
  };
};
