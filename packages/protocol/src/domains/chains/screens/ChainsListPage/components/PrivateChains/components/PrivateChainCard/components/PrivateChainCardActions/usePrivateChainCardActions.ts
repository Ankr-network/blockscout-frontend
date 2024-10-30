import React, { useCallback, useMemo } from 'react';
import { Chain } from '@ankr.com/chains-list';

import { IProjectWithBlockchains } from 'domains/projects/types';
import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { filterChainByPaths } from 'modules/chains/utils/filterChainByPaths';
import { hasEvmSubchains } from 'modules/chains/utils/hasEvmSubchains';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

export interface IPrivateChainCardActionsProps {
  anchorEl: null | HTMLElement;
  chain: Chain;
  chainProjects?: IProjectWithBlockchains[];
  filteredJwtTokens: JWT[];
  handleClose: () => void;
  handleOpenChainMenu: (event: React.MouseEvent<HTMLElement>) => void;
  isCardView?: boolean;
  isChainProjectsEmpty?: boolean;
  isEndpointLocked: boolean;
  onOpenAddToProjectsDialog: () => void;
  open: boolean;
  projectsLoading: boolean;
}

export const usePrivateChainCardActions = ({
  chain,
  chainProjects,
  handleClose,
  isEndpointLocked,
  onOpenAddToProjectsDialog,
  open,
}: IPrivateChainCardActionsProps) => {
  const handleOpenAddToProjectsDialog = useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      onOpenAddToProjectsDialog();
      handleClose();
    },
    [handleClose, onOpenAddToProjectsDialog],
  );

  const isAddToMetamaskButtonVisible = hasEvmSubchains(chain);

  const { tokenIndex: selectedProjectIndex } = useTokenManagerConfigSelector();

  const chainPaths = useMemo(
    () =>
      chainProjects?.find(project => project.index === selectedProjectIndex)
        ?.blockchains ?? [],
    [chainProjects, selectedProjectIndex],
  );

  const projectChain = useMemo(() => {
    if (chainPaths.length === 0) {
      return chain;
    }

    return filterChainByPaths({ chain, paths: chainPaths });
  }, [chain, chainPaths]);

  return {
    handleOpenAddToProjectsDialog,
    isAddToMetamaskButtonVisible,
    isEndpointLocked,
    open,
    projectChain,
  };
};
