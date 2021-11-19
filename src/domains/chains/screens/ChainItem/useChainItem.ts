import { useCallback, useRef, useState } from 'react';
import { Timeframe } from '@ankr.com/multirpc/dist/types';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { t } from '../../../../modules/i18n/utils/intl';
import { ChainsRoutesConfig } from '../../Routes';
import { IChainItemDetails } from '../../actions/fetchChain';

export const useChainItem = (data: IChainItemDetails) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('24h');
  const { chain, details, nodes, nodesWeight } = data;
  const chainsDetails = details[timeframe];

  const { setBreadcrumbs } = useBreadcrumbs();
  const hasBreadcrumbsRef = useRef<boolean>(false);
  const handleSetBreadcrumbs = useCallback(
    (title: string) => {
      if (hasBreadcrumbsRef.current) return;

      hasBreadcrumbsRef.current = true;

      setBreadcrumbs([
        {
          title: t(ChainsRoutesConfig.chains.breadcrumbs),
          link: ChainsRoutesConfig.chains.path,
        },
        {
          title,
        },
      ]);
    },
    [setBreadcrumbs],
  );

  const handleTimeframeClick = useCallback((newTimeframe: Timeframe) => {
    setTimeframe(newTimeframe);
  }, []);

  const {
    totalCached,
    totalRequests,
    totalRequestsHistory,
    countries,
  } = chainsDetails;

  const totalRequestsCount = {
    '30d': details?.['30d'].totalRequests,
    '7d': details?.['7d'].totalRequests,
    '24h': details?.['24h'].totalRequests,
  };

  handleSetBreadcrumbs(chain.name);

  return {
    totalCached,
    totalRequests,
    timeframe,
    chain,
    totalRequestsCount,
    totalRequestsHistory,
    handleTimeframeClick,
    countries,
    nodes,
    nodesWeight,
  };
};
