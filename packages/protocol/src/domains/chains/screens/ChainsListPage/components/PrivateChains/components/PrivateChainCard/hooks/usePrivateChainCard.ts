import { Chain } from '@ankr.com/chains-list';
import { useCallback, useMemo } from 'react';

import { IProjectWithBlockchains } from 'domains/projects/types';
import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useMenu } from 'modules/common/hooks/useMenu';

export interface IUsePrivateChainCardProps {
  chain: Chain;
  hasPremium: boolean;
  jwts: JWT[];
  projectsWithBlockchains: IProjectWithBlockchains[];
}

export const usePrivateChainCard = ({
  chain,
  hasPremium,
  jwts,
  projectsWithBlockchains,
}: IUsePrivateChainCardProps) => {
  const allChainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, chain.id),
  );

  const isEndpointLocked = Boolean(chain.premiumOnly && !hasPremium);

  const chainProjects = useMemo(() => {
    return (
      projectsWithBlockchains?.filter(project => {
        // empty array means all chains are included
        if ((project.blockchains ?? []).length === 0) {
          return true;
        }

        const isCurrentPathIncluded =
          allChainPaths?.length > 0 &&
          project.blockchains.length > 0 &&
          allChainPaths.some(path => project.blockchains.includes(path));

        return isCurrentPathIncluded;
      }) ?? []
    );
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

  const hasChainProjects = chainProjects.length > 0;

  return {
    anchorEl,
    chainProjects,
    filteredJwtTokens,
    handleClose,
    handleOpenChainMenu,
    hasChainProjects,
    isEndpointLocked,
    isMenuOpened: open,
  };
};
