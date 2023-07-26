import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

import { Timeframe } from 'domains/chains/types';

import { Stat } from './components/Stat';
import { useUsageSummaryStyles } from './PublicUsageSummaryStyles';
import { useUsageSummary } from './PublicUsageSummaryUtils';

export interface UsageSummaryProps {
  cachedRequests?: BigNumber;
  className?: string;
  loading: boolean;
  timeframe: Timeframe;
  totalRequests: BigNumber;
}

const root = 'chain-item.usage-data.usage-summary';

export const PublicUsageSummary = ({
  cachedRequests,
  className,
  loading,
  timeframe,
  totalRequests,
}: UsageSummaryProps) => {
  const { total, average, cached } = useUsageSummary({
    cachedRequests,
    timeframe,
    totalRequests,
  });

  const { classes, cx } = useUsageSummaryStyles();

  return (
    <div className={cx(className, classes.usageSummary)}>
      <Stat loading={loading} title={t(`${root}.total`)} value={total} />
      <Stat loading={loading} title={t(`${root}.average`)} value={average} />
      <Stat
        loading={loading}
        title={t(`${root}.cached.title`)}
        value={cached}
      />
    </div>
  );
};
