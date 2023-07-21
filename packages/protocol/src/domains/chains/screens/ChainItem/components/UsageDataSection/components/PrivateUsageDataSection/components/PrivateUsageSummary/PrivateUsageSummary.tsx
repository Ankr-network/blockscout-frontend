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

const totalTitle = t(`${root}.total`);
const averageTitle = t(`${root}.average`);
const costTitle = t(`${root}.cost.title`);

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
      <Stat loading={loading} title={totalTitle} value={total} />
      <Stat loading={loading} title={averageTitle} value={average} />
      <Stat loading={loading} title={costTitle} value={cost} />
    </div>
  );
};
