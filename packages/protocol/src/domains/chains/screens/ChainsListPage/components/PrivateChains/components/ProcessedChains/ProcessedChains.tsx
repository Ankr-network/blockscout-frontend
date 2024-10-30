import { Chain, Timeframe } from '@ankr.com/chains-list';
import { memo } from 'react';

import { EChainView } from '../../../ChainViewSelector';
import { PrivateChainCard } from '../PrivateChainCard';

export interface IProcessedChainsProps {
  onPromoDialogOpen: () => void;
  timeframe: Timeframe;
  view?: EChainView;
  processedChains: Chain[];
}

export const ProcessedChains = memo(
  ({
    onPromoDialogOpen,
    processedChains,
    timeframe,
    view,
  }: IProcessedChainsProps) => {
    return (
      <>
        {processedChains.map(chain => (
          <PrivateChainCard
            chain={chain}
            key={chain.id}
            onOpenUpgradeModal={onPromoDialogOpen}
            timeframe={timeframe}
            view={view}
          />
        ))}
      </>
    );
  },
);

ProcessedChains.displayName = 'ProcessedChains';
