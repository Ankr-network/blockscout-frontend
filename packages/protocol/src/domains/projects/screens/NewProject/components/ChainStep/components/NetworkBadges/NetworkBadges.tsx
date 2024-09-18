import { Dispatch, SetStateAction, useCallback } from 'react';
import { IconButton } from '@mui/material';
import { Edit } from '@ankr.com/ui';
import { Chain, ChainBadge, ChainID } from '@ankr.com/chains-list';

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
  className,
  onOpenModal,
  setSelectedChainsIds,
}: NetworkBadgesProps) => {
  const { classes, cx } = useNetworksBadgesStyles();

  const {
    currentChainBeaconMainnetChainsBadges,
    currentChainBeaconTestnetChainsBadges,
    currentChainDevnetChainsBadges,
    currentChainMainnetChainsBadges,
    currentChainOpnodeMainnetChainsBadges,
    currentChainOpnodeTestnetChainsBadges,
    currentChainTestnetChainsBadges,
    isEditButtonVisible,
  } = useNetworkBadges(chain, setSelectedChainsIds);

  const handleOpenModal = useCallback(
    () => onOpenModal(chain),
    [chain, onOpenModal],
  );

  const renderSubChains = useCallback((chains: ChainBadge[]) => {
    return chains.map(({ id, isSelected, name }) => (
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
