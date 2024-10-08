import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { ChainProtocolContext } from 'domains/chains/screens/ChainPage/constants/ChainProtocolContext';
import { useChainSelectorContentStyles } from 'modules/common/components/ChainSelectorContent/useChainSelectorContentStyles';
import { ProjectChain } from 'domains/projects/types';

import { TypeSelector } from './TypeSelector';
import { useChainsSelector } from './ChainStep/hooks/useChainsSelector';
import { useChainSelectVisibility } from './TypeSelector/hooks/useChainSelectVisibility';
import { useAllChainsSelection } from './TypeSelector/hooks/useAllChainsSelection';

export interface ChainSelectListProps {
  chain: ProjectChain;
  onOpenDialog: () => void;
}

export const ChainSelectList = ({
  chain,
  onOpenDialog,
}: ChainSelectListProps) => {
  const {
    beaconsMainnet,
    beaconsTestnet,
    id: chainId,
    opnodesMainnet,
    opnodesTestnet,
  } = chain;

  const {
    chainProtocolContext,
    chainType,
    chainTypes,
    endpoints,
    groups,
    hasTypeSelector,
    isTestnetOnlyChainSelected: isTestnetOnlyChain,
    selectType,
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

  const { isChecked, isIndeterminate, onChange } = useAllChainsSelection({
    chainId,
    endpoints,
  });

  const { classes } = useChainSelectorContentStyles();

  if (!isVisible || !hasTypeSelector) return null;

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <Typography variant="body1" component="p" className={classes.title}>
        {t('projects.networks-selector.title')}
      </Typography>

      <div className={classes.selectors}>
        <TypeSelector
          chainId={chainId}
          chainTypes={chainTypes}
          endpoints={endpoints}
          beaconsMainnet={beaconsMainnet}
          beaconsTestnet={beaconsTestnet}
          opnodesMainnet={opnodesMainnet}
          opnodesTestnet={opnodesTestnet}
          isChecked={isChecked}
          isIndeterminate={isIndeterminate}
          onChange={onChange}
        />
      </div>
    </ChainProtocolContext.Provider>
  );
};
