import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Edit, Info } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { Chain, ChainID } from 'domains/chains/types';
import { ChainStepFields } from 'domains/projects/store';
import { getCustomLabelForChainsCornerCases } from 'domains/projects/utils/getCustomLabelForChainsCornerCases';
import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';

import { useNetworkBadges } from './useNetworkBadges';
import { NetworkBadgeItem } from './NetworkBadgeItem';
import { useNetworksBadgesStyles } from './useNetworksBadgesStyles';

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
    currentChainSelectedBeaconMainnetChains,
    currentChainSelectedBeaconTestnetChains,
    currentChainSelectedOpnodeMainnetChains,
    currentChainSelectedOpnodeTestnetChains,
    handleRemove,
    isIconInfoVisible,
    isEditButtonVisible,
  } = useNetworkBadges(chain, setSelectedChainsIds);

  const {
    selectedMainnetIds,
    selectedTestnetIds,
    selectedDevnetIds,
    selectedBeaconMainnetIds,
    selectedBeaconTestnetIds,
    selectedOpnodeMainnetIds,
    selectedOpnodeTestnetIds,
  } = useProjectFormValues();

  const { id: currentChainId, name: currentChainName } = chain;

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
          name={getCustomLabelForChainsCornerCases({
            chainId: id,
            label: name,
          })}
          onRemove={() => handleRemove(id, fieldName, selectedIds)}
        />
      ));
    },
    [handleRemove],
  );

  return (
    <div className={cx(classes.badgesWrapper, className)}>
      {isCurrentChainMainnetSelected && (
        <NetworkBadgeItem
          name={t('projects.new-project.step-1.mainnet-postfix', {
            label: currentChainName,
          })}
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

      {renderSubChains(
        currentChainSelectedBeaconMainnetChains,
        ChainStepFields.selectedBeaconMainnetIds,
        selectedBeaconMainnetIds,
      )}

      {renderSubChains(
        currentChainSelectedBeaconTestnetChains,
        ChainStepFields.selectedBeaconTestnetIds,
        selectedBeaconTestnetIds,
      )}

      {renderSubChains(
        currentChainSelectedOpnodeMainnetChains,
        ChainStepFields.selectedOpnodeMainnetIds,
        selectedOpnodeMainnetIds,
      )}

      {renderSubChains(
        currentChainSelectedOpnodeTestnetChains,
        ChainStepFields.selectedOpnodeTestnetIds,
        selectedOpnodeTestnetIds,
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
