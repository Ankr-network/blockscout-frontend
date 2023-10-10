import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { useChainSelectorContentStyles } from 'modules/common/components/ChainSelectorContent/useChainSelectorContentStyles';

import { TypeSelector } from './TypeSelector';
import { useChainsSelector } from './ChainStep/hooks/useChainsSelector';
import { useChainSelectVisibility } from './TypeSelector/hooks/useChainSelectVisibility';
import { ProjectChain } from '../hooks/useProjectChains';

export interface ChainSelectListProps {
  chain: ProjectChain;
  onOpenDialog: () => void;
}

export const ChainSelectList = ({
  chain,
  onOpenDialog,
}: ChainSelectListProps) => {
  const {
    id: chainId,
    beaconsMainnet,
    beaconsTestnet,
    opnodesMainnet,
    opnodesTestnet,
  } = chain;

  const {
    chainProtocolContext,
    chainTypes,
    selectType,
    groups,
    isTestnetOnlyChainSelected: isTestnetOnlyChain,
    chainType,
    endpoints,
    hasTypeSelector,
  } = useChainsSelector(chainId, onOpenDialog);

  const isVisible =
    useChainSelectVisibility({
      chainTypes,
      chainType,
      groups,
      isTestnetOnlyChain,
      selectType,
    }) ||
    beaconsMainnet ||
    beaconsTestnet ||
    opnodesMainnet ||
    opnodesTestnet;

  const { classes } = useChainSelectorContentStyles();

  if (!isVisible || !hasTypeSelector) return null;

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <Typography variant="body1" component="p" className={classes.title}>
        {t('projects.new-project.chain-modal.supported-network')}
      </Typography>

      <div className={classes.selectors}>
        <TypeSelector
          chainTypes={chainTypes}
          endpoints={endpoints}
          beaconsMainnet={beaconsMainnet}
          beaconsTestnet={beaconsTestnet}
          opnodesMainnet={opnodesMainnet}
          opnodesTestnet={opnodesTestnet}
        />
      </div>
    </ChainProtocolContext.Provider>
  );
};
