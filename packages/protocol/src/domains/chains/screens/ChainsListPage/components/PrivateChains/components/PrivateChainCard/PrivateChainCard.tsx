import React, { useCallback, useMemo } from 'react';

import { useCommonChainsItemData } from 'domains/chains/screens/ChainsListPage/hooks/useCommonChainsItemData';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { MappedWhitelistBlockchainsResponse } from 'domains/projects/actions/fetchWhitelistsBlockchains';
import { useAppSelector } from 'store/useAppSelector';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';
import { useMenu } from 'modules/common/hooks/useMenu';
import { useDialog } from 'modules/common/hooks/useDialog';
import { ChainProjectsDialog } from 'domains/chains/screens/ChainPage/components/ChainProjectsDialog';

import { usePrivateChainsItem } from './hooks/usePrivateChainsItem';
import { BaseChainsCard, IBaseChainCardProps } from '../../../BaseChainsCard';
import { IChainCardProps } from '../../../PublicChains/components/PublicChainCard';
import { ChainProjectsProps } from './components/ChainProjects';
import { PrivateChainCardActions } from './components/PrivateChainCardActions';
import { EChainView } from '../../../ChainViewSelector';

interface PrivateChainCardProps extends IChainCardProps, ChainProjectsProps {
  hasPremium: boolean;
  jwtTokens: JwtManagerToken[];
  allWhitelistsBlockchains?: MappedWhitelistBlockchainsResponse[];
  isLoadingProjects: boolean;
}

// eslint-disable-next-line max-lines-per-function
export const PrivateChainCard = ({
  allWhitelistsBlockchains,
  chain,
  hasPremium,
  isLoadingProjects,
  jwtTokens,
  timeframe,
  view = EChainView.Cards,
}: PrivateChainCardProps) => {
  const { loading, totalRequests } = usePrivateChainsItem({ chain });

  const isEndpointLocked = Boolean(chain.premiumOnly && !hasPremium);

  const allChainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, chain.id),
  );

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

  const { totalRequestsStr } = useCommonChainsItemData(
    chain,
    totalRequests,
    true,
  );

  const {
    isOpened: isOpenedAddToProjectsDialog,
    onClose: onCloseAddToProjectsDialog,
    onOpen: onOpenAddToProjectsDialog,
  } = useDialog();

  const cardProps: IBaseChainCardProps = useMemo(
    () => ({
      isPublicLayout: false,
      view,
      chain,
      loading,
      totalRequests: totalRequestsStr,
      shouldShowDashInsteadOfRequestsString:
        totalRequests.isZero() && isChainProjectsEmpty,
      isRequestsDisabled: isChainProjectsEmpty,
      timeframe,
      actions: (
        <PrivateChainCardActions
          anchorEl={anchorEl}
          chain={chain}
          chainProjects={chainProjects}
          filteredJwtTokens={filteredJwtTokens}
          handleClose={handleClose}
          handleOpenChainMenu={handleOpenChainMenu}
          isEndpointLocked={isEndpointLocked}
          isLoadingProjects={isLoadingProjects}
          onOpenAddToProjectsDialog={onOpenAddToProjectsDialog}
          open={open}
          isChainProjectsEmpty={isChainProjectsEmpty}
          isCardView={view === EChainView.Cards}
        />
      ),
    }),
    [
      view,
      chain,
      loading,
      totalRequests,
      isChainProjectsEmpty,
      totalRequestsStr,
      timeframe,
      anchorEl,
      chainProjects,
      filteredJwtTokens,
      handleClose,
      handleOpenChainMenu,
      isEndpointLocked,
      isLoadingProjects,
      onOpenAddToProjectsDialog,
      open,
    ],
  );

  return (
    <>
      <BaseChainsCard {...cardProps} />
      {isOpenedAddToProjectsDialog && (
        <ChainProjectsDialog
          chain={chain}
          isOpenedAddToProjectsDialog={isOpenedAddToProjectsDialog}
          onCloseAddToProjectsDialog={onCloseAddToProjectsDialog}
        />
      )}
    </>
  );
};
