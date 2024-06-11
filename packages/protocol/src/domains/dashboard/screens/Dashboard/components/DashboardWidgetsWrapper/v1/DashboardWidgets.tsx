import { ChainID, Timeframe } from 'modules/chains/types';

import { ChainLayout } from '../../ChainLayout/v1';
import { AllChainsLayout } from '../../AllChainsLayout/v1';
import { useLastMonthStats } from '../../../hooks/useLastMonthStats';

interface IDashboardWidgetsProps {
  detailsChainId?: ChainID;
  selectedChainId?: ChainID;
  statsChainId?: ChainID;
  timeframe: Timeframe;
}

export const DashboardWidgets = ({
  detailsChainId,
  selectedChainId,
  statsChainId,
  timeframe,
}: IDashboardWidgetsProps) => {
  useLastMonthStats(Boolean(selectedChainId));

  const isChainSelected = statsChainId && detailsChainId;

  if (isChainSelected) {
    return (
      <ChainLayout
        statsChainId={statsChainId}
        detailsChainId={detailsChainId}
        timeframe={timeframe}
      />
    );
  }

  return <AllChainsLayout timeframe={timeframe} />;
};
