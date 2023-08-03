import { ChainProtocolContext } from 'domains/chains/screens/ChainItem/constants/ChainProtocolContext';
import { ChainID } from 'domains/chains/types';
import { useChainSelectorContentStyles } from 'modules/common/components/ChainSelectorContent/useChainSelectorContentStyles';

import { TypeSelector } from './TypeSelector';
import { useChainsSelector } from './ChainStep/hooks/useChainsSelector';
import { useChainSelectVisibility } from './TypeSelector/hooks/useChainSelectVisibility';

export interface ChainSelectListProps {
  chainId: ChainID;
  onOpenDialog: () => void;
}

export const ChainSelectList = ({
  chainId,
  onOpenDialog,
}: ChainSelectListProps) => {
  const {
    chainProtocolContext,
    chainTypes,
    selectType,
    groups,
    isTestnetOnlyChainSelected: isTestnetOnlyChain,
    chainType,
    endpoints,
  } = useChainsSelector(chainId, onOpenDialog);

  const isVisible = useChainSelectVisibility({
    chainTypes,
    chainType,
    groups,
    isTestnetOnlyChain,
    selectType,
  });

  const { classes } = useChainSelectorContentStyles();

  if (!isVisible) return null;

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <div className={classes.selectors}>
        {!isTestnetOnlyChain && (
          <TypeSelector chainTypes={chainTypes} endpoints={endpoints} />
        )}
      </div>
    </ChainProtocolContext.Provider>
  );
};
