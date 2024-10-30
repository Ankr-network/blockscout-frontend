import { Chain } from '@ankr.com/chains-list';
import { useCallback, useMemo } from 'react';

import { selectAllPathsByChainId } from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useProjectsWhitelistsBlockchains } from 'domains/projects/hooks/useProjectsWhitelistsBlockchains';

export interface IUsePrivateChainCardProps {
  chain: Chain;
}

export const usePrivateChainCard = ({ chain }: IUsePrivateChainCardProps) => {
  const { hasPremium } = useAuth();
  const allChainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, chain.id),
  );

  const { jwts, jwtsLoading } = useJWTsManager();

  const {
    loading: projectsWhitelistsBlockchainsLoading,
    projectsWhitelistsBlockchains: projectsWithBlockchains,
    state: { isError, isSuccess },
  } = useProjectsWhitelistsBlockchains({ projects: jwts, skipFetching: true });
  const projectBlockchainsLoaded = isSuccess || isError;

  const projectsLoading =
    jwtsLoading ||
    projectsWhitelistsBlockchainsLoading ||
    !projectBlockchainsLoaded;

  const isEndpointLocked = Boolean(chain.premiumOnly && !hasPremium);

  const chainProjects = useMemo(() => {
    return projectsWithBlockchains?.filter(project => {
      // empty array means all chains are included
      if ((project.blockchains ?? []).length === 0) {
        return true;
      }

      const isCurrentPathIncluded =
        allChainPaths?.length > 0 &&
        project.blockchains.length > 0 &&
        allChainPaths.some(path => project.blockchains.includes(path));

      return isCurrentPathIncluded;
    });
  }, [allChainPaths, projectsWithBlockchains]);

  const filteredJwtTokens = useMemo(
    () =>
      jwts.filter(
        token =>
          !chainProjects?.every(
            project =>
              project.userEndpointToken.toLowerCase() !==
              token.userEndpointToken.toLowerCase(),
          ),
      ),
    [jwts, chainProjects],
  );

  const { anchorEl, handleClose, handleOpen, open } = useMenu();

  const handleOpenChainMenu = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      handleOpen(e);
    },
    [handleOpen],
  );

  const isChainProjectsEmpty = !projectsLoading && chainProjects?.length === 0;

  return {
    anchorEl,
    chainProjects,
    filteredJwtTokens,
    handleClose,
    handleOpenChainMenu,
    isChainProjectsEmpty,
    isEndpointLocked,
    isMenuOpened: open,
    projectsLoading,
  };
};
