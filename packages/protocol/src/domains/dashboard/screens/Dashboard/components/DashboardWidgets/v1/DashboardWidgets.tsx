import { ChainID, Timeframe } from 'modules/chains/types';

import { ChainLayout } from '../../ChainLayout/v1';
import { AllChainsLayout } from '../../AllChainsLayout/v1';
import { useLastMonthStats } from '../../../v1/hooks/useLastMonthStats';

interface IDashboardWidgetsProps {
  timeframe: Timeframe;
  statsChainId?: ChainID;
  detailsChainId?: ChainID;
  selectedChainId?: ChainID;
}

export const DashboardWidgets = ({
  timeframe,
  statsChainId,
  detailsChainId,
  selectedChainId,
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
