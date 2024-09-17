import React, { useCallback, useMemo } from 'react';

import { Chain } from 'modules/chains/types';
import { MappedWhitelistBlockchainsResponse } from 'domains/projects/actions/fetchWhitelistsBlockchains';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { hasEvmSubchains } from 'modules/chains/utils/hasEvmSubchains';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { filterChainByPaths } from 'modules/chains/utils/filterChainByPaths';

export interface IPrivateChainCardActionsProps {
  anchorEl: null | HTMLElement;
  chain: Chain;
  chainProjects?: MappedWhitelistBlockchainsResponse[];
  filteredJwtTokens: JwtManagerToken[];
  handleClose: () => void;
  handleOpenChainMenu: (event: React.MouseEvent<HTMLElement>) => void;
  isEndpointLocked: boolean;
  isLoadingProjects: boolean;
  onOpenAddToProjectsDialog: () => void;
  open: boolean;
  isChainProjectsEmpty?: boolean;
  isCardView?: boolean;
}

export const usePrivateChainCardActions = ({
  chain,
  chainProjects,
  handleClose,
  isEndpointLocked,
  isLoadingProjects,
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
    isLoadingProjects,
    open,
    projectChain,
  };
};
