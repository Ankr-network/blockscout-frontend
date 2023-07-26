import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

import { Timeframe } from 'domains/chains/types';

import { Stat } from './components/Stat';
import { useUsageSummaryStyles } from './PrivateUsageSummaryStyles';
import { useUsageSummary } from './PrivateUsageSummaryUtils';

export interface UsageSummaryProps {
  className?: string;
  loading: boolean;
  timeframe: Timeframe;
  totalCost?: number;
  totalRequests: BigNumber;
}

const root = 'chain-item.usage-data.usage-summary';

export const PrivateUsageSummary = ({
  className,
  loading,
  timeframe,
  totalCost,
  totalRequests,
}: UsageSummaryProps) => {
  const { total, average, cost } = useUsageSummary({
    timeframe,
    totalCost,
    totalRequests,
  });

  const { classes, cx } = useUsageSummaryStyles();

  return (
    <div className={cx(className, classes.usageSummary)}>
      <Stat loading={loading} title={t(`${root}.total`)} value={total} />
      <Stat loading={loading} title={t(`${root}.average`)} value={average} />
      <Stat loading={loading} title={t(`${root}.cost.title`)} value={cost} />
    </div>
  );
};
