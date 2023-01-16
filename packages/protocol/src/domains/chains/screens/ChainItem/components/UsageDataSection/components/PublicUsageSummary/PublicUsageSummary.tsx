import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { Stat } from './components/Stat';
import { Timeframe } from 'domains/chains/types';
import { t } from '@ankr.com/common';
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

const totalTitle = t(`${root}.total`);
const averageTitle = t(`${root}.average`);
const cachedTitle = t(`${root}.cached.title`);

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

  const classes = useUsageSummaryStyles();

  return (
    <div className={classNames(className, classes.usageSummary)}>
      <Stat loading={loading} title={totalTitle} value={total} />
      <Stat loading={loading} title={averageTitle} value={average} />
      <Stat loading={loading} title={cachedTitle} value={cached} />
    </div>
  );
};
