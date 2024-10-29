import { useCallback, useMemo } from 'react';
import { Chain } from '@ankr.com/chains-list';

import { IProjectWithBlockchains } from 'domains/projects/actions/fetchProjectsWhitelistsBlockchains';
import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useMenu } from 'modules/common/hooks/useMenu';

export interface IUsePrivateChainCardProps {
  allWhitelistsBlockchains?: IProjectWithBlockchains[];
  chain: Chain;
  hasPremium: boolean;
  isLoadingProjects: boolean;
  jwtTokens: JWT[];
}

export const usePrivateChainCard = ({
  allWhitelistsBlockchains,
  chain,
  hasPremium,
  isLoadingProjects,
  jwtTokens,
}: IUsePrivateChainCardProps) => {
  const allChainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, chain.id),
  );

  const isEndpointLocked = Boolean(chain.premiumOnly && !hasPremium);

  const chainProjects = useMemo(() => {
    return allWhitelistsBlockchains?.filter(project => {
      // empty array means all chains are included
      if (project.blockchains.length === 0) {
        return true;
      }

      const isCurrentPathIncluded =
        allChainPaths?.length > 0 &&
        project.blockchains.length > 0 &&
        allChainPaths.some(path => project.blockchains.includes(path));

      return isCurrentPathIncluded;
    });
  }, [allChainPaths, allWhitelistsBlockchains]);

  const filteredJwtTokens = useMemo(
    () =>
      jwtTokens.filter(
        token =>
          !chainProjects?.every(
            project =>
              project.userEndpointToken.toLowerCase() !==
              token.userEndpointToken.toLowerCase(),
          ),
      ),
    [chainProjects, jwtTokens],
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

  const isChainProjectsEmpty =
    !isLoadingProjects && chainProjects?.length === 0;

  return {
    anchorEl,
    chainProjects,
    filteredJwtTokens,
    handleClose,
    handleOpenChainMenu,
    isChainProjectsEmpty,
    isEndpointLocked,
    isMenuOpened: open,
  };
};
