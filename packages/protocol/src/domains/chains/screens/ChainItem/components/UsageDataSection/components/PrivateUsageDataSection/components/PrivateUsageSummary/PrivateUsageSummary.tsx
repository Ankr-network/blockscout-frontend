import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

import { Timeframe } from 'modules/chains/types';

import { Stat } from './components/Stat';
import { useUsageSummaryStyles } from './PrivateUsageSummaryStyles';
import { useUsageSummary } from './PrivateUsageSummaryUtils';

export interface UsageSummaryProps {
  className?: string;
  loading: boolean;
  timeframe: Timeframe;
  totalCost?: number;
  totalRequests: BigNumber;
  isCostHidden?: boolean;
}

const root = 'chain-item.usage-data.usage-summary';

export const PrivateUsageSummary = ({
  className,
  isCostHidden = false,
  loading,
  timeframe,
  totalCost,
  totalRequests,
}: UsageSummaryProps) => {
  const { average, cost, total } = useUsageSummary({
    timeframe,
    totalCost,
    totalRequests,
  });

  const { classes, cx } = useUsageSummaryStyles();

  return (
    <div className={cx(className, classes.usageSummary)}>
      <Stat loading={loading} title={t(`${root}.total`)} value={total} />
      <Stat loading={loading} title={t(`${root}.average`)} value={average} />
      {!isCostHidden && (
        <Stat loading={loading} title={t(`${root}.cost.title`)} value={cost} />
      )}
    </div>
  );
};
