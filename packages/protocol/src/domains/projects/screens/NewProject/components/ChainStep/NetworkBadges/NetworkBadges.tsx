import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Edit, Info } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { Chain, ChainID } from 'domains/chains/types';
import { ChainStepFields } from 'domains/projects/store';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';

import { useNetworkBadges } from './useNetworkBadges';
import { NetworkBadgeItem } from './NetworkBadgeItem';
import { useNetworksBadgesStyles } from './useNetworksBadgesStyles';
import { isChainHasSingleOptionToSelect } from '../../../utils/isChainHasSingleOptionToSelect';

interface NetworkBadgesProps {
  chain: Chain;
  setSelectedChainsIds: Dispatch<SetStateAction<ChainID[]>>;
  onOpenModal: (chain: Chain) => void;
  className?: string;
}

export const NetworkBadges = ({
  chain,
  setSelectedChainsIds,
  onOpenModal,
  className,
}: NetworkBadgesProps) => {
  const { classes, cx } = useNetworksBadgesStyles();

  const {
    isCurrentChainMainnetSelected,
    currentChainSelectedExtensions,
    currentChainSelectedTestnetChains,
    currentChainSelectedDevnetChains,
    hasSelectedChains,
    handleRemove,
    selectedMainnetIds,
    selectedTestnetIds,
    selectedDevnetIds,
  } = useNetworkBadges(chain, setSelectedChainsIds);

  const {
    id: currentChainId,
    name: currentChainName,
    testnets = [],
    devnets = [],
    extensions = [],
  } = chain;

  const handleOpenModal = useCallback(
    () => onOpenModal(chain),
    [chain, onOpenModal],
  );

  const handleRemoveCurrentChainFromMainnet = useCallback(
    () =>
      handleRemove(
        currentChainId,
        ChainStepFields.selectedMainnetIds,
        selectedMainnetIds,
      ),
    [currentChainId, handleRemove, selectedMainnetIds],
  );

  const renderSubChains = useCallback(
    (chains: Chain[], fieldName: ChainStepFields, selectedIds: ChainID[]) => {
      return chains.map(({ id, name }) => (
        <NetworkBadgeItem
          key={id}
          name={name}
          onRemove={() => handleRemove(id, fieldName, selectedIds)}
        />
      ));
    },
    [handleRemove],
  );

  const hasOnlyOneMainnetToSelect =
    !testnets?.length && !devnets?.length && !extensions.length;

  const hasOnlyOneTestnetToSelect =
    isTestnetOnlyChain(chain.id) && testnets?.length === 1 && !devnets?.length;

  const isIconInfoVisible =
    (hasOnlyOneMainnetToSelect && isCurrentChainMainnetSelected) ||
    (hasOnlyOneTestnetToSelect &&
      currentChainSelectedTestnetChains.length === 1) ||
    (isChainHasSingleOptionToSelect(chain.id) && isCurrentChainMainnetSelected);

  const isEditButtonVisible =
    !hasOnlyOneMainnetToSelect &&
    !hasOnlyOneTestnetToSelect &&
    hasSelectedChains &&
    !isChainHasSingleOptionToSelect(chain.id);

  return (
    <div className={cx(classes.badgesWrapper, className)}>
      {isCurrentChainMainnetSelected && (
        <NetworkBadgeItem
          name={`${currentChainName} mainnet`}
          onRemove={handleRemoveCurrentChainFromMainnet}
        />
      )}

      {renderSubChains(
        currentChainSelectedExtensions,
        ChainStepFields.selectedMainnetIds,
        selectedMainnetIds,
      )}

      {renderSubChains(
        currentChainSelectedTestnetChains,
        ChainStepFields.selectedTestnetIds,
        selectedTestnetIds,
      )}

      {renderSubChains(
        currentChainSelectedDevnetChains,
        ChainStepFields.selectedDevnetIds,
        selectedDevnetIds,
      )}

      {isIconInfoVisible && (
        <Tooltip title={t('projects.new-project.step-1.tooltip-text')}>
          <Info />
        </Tooltip>
      )}

      {isEditButtonVisible && (
        <IconButton className={classes.editButton} onClick={handleOpenModal}>
          <Edit className={classes.editIcon} />
        </IconButton>
      )}
    </div>
  );
};
