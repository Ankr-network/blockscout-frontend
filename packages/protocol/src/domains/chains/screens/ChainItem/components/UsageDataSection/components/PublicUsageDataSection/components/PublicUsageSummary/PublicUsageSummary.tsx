import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

import { Timeframe } from 'modules/chains/types';

import { Stat } from './components/Stat';
import { useUsageSummaryStyles } from './useUsageSummaryStyles';
import { useUsageSummary } from './PublicUsageSummaryUtils';

export interface UsageSummaryProps {
  cachedRequests?: BigNumber;
  className?: string;
  loading: boolean;
  timeframe: Timeframe;
  totalRequests: BigNumber;
  isCachedRequestsHidden?: boolean;
}

const root = 'chain-item.usage-data.usage-summary';

export const PublicUsageSummary = ({
  cachedRequests,
  className,
  isCachedRequestsHidden,
  loading,
  timeframe,
  totalRequests,
}: UsageSummaryProps) => {
  const { average, cached, total } = useUsageSummary({
    cachedRequests,
    timeframe,
    totalRequests,
  });

  const { classes, cx } = useUsageSummaryStyles();

  return (
    <div className={cx(className, classes.usageSummary)}>
      <Stat loading={loading} title={t(`${root}.total`)} value={total} />
      <Stat loading={loading} title={t(`${root}.average`)} value={average} />
      {!isCachedRequestsHidden && (
        <Stat
          loading={loading}
          title={t(`${root}.cached.title`)}
          value={cached}
        />
      )}
    </div>
  );
};
