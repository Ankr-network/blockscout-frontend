import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { CostButton } from './components/CostButton';
import { Stat } from './components/Stat';
import { Timeframe } from 'domains/chains/types';
import { t } from '@ankr.com/common';
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

  const classes = useUsageSummaryStyles();

  return (
    <div className={classNames(className, classes.usageSummary)}>
      <Stat loading={loading} title={totalTitle} value={total} />
      <Stat loading={loading} title={averageTitle} value={average} />
      <Stat
        extra={<CostButton />}
        loading={loading}
        title={costTitle}
        value={cost}
      />
    </div>
  );
};
