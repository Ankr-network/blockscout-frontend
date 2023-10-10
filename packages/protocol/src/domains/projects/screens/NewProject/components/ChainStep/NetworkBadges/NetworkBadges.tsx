import { Dispatch, SetStateAction, useCallback } from 'react';
import { IconButton } from '@mui/material';
import { Edit } from '@ankr.com/ui';

import { Chain, ChainBadge, ChainID } from 'domains/chains/types';
import { getCustomLabelForChainsCornerCases } from 'domains/projects/utils/getCustomLabelForChainsCornerCases';

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
    currentChainMainnetChainsBadges,
    currentChainTestnetChainsBadges,
    currentChainDevnetChainsBadges,
    currentChainBeaconMainnetChainsBadges,
    currentChainBeaconTestnetChainsBadges,
    currentChainOpnodeMainnetChainsBadges,
    currentChainOpnodeTestnetChainsBadges,
    isEditButtonVisible,
  } = useNetworkBadges(chain, setSelectedChainsIds);

  const handleOpenModal = useCallback(
    () => onOpenModal(chain),
    [chain, onOpenModal],
  );

  const renderSubChains = useCallback((chains: ChainBadge[]) => {
    return chains.map(({ id, name, isSelected }) => (
      <NetworkBadgeItem
        key={id}
        name={getCustomLabelForChainsCornerCases({
          chainId: id,
          label: name,
        })}
        isSelected={isSelected}
      />
    ));
  }, []);

  return (
    <div className={cx(classes.badgesWrapper, className)}>
      {renderSubChains(currentChainMainnetChainsBadges)}

      {renderSubChains(currentChainTestnetChainsBadges)}

      {renderSubChains(currentChainDevnetChainsBadges)}

      {renderSubChains(currentChainBeaconMainnetChainsBadges)}

      {renderSubChains(currentChainBeaconTestnetChainsBadges)}

      {renderSubChains(currentChainOpnodeMainnetChainsBadges)}

      {renderSubChains(currentChainOpnodeTestnetChainsBadges)}

      {isEditButtonVisible && (
        <IconButton className={classes.editButton} onClick={handleOpenModal}>
          <Edit className={classes.editIcon} />
        </IconButton>
      )}
    </div>
  );
};
