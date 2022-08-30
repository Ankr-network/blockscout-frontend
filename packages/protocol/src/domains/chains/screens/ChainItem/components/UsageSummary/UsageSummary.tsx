import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { CostButton } from './components/CostButton';
import { Stat } from './components/Stat';
import { Timeframe } from 'domains/chains/types';
import { t } from 'modules/i18n/utils/intl';
import { useUsageSummary } from './hooks/useUsageSummary';
import { useUsageSummaryStyles } from './UsageSummaryStyles';

export interface UsageSummaryProps {
  cachedRequests: BigNumber;
  className?: string;
  isWalletConnected: boolean;
  loading: boolean;
  timeframe: Timeframe;
  totalCost?: number;
  totalRequests: BigNumber;
}

const root = 'chain-item.usage-data.usage-summary';

const totalTitle = t(`${root}.total`);
const averageTitle = t(`${root}.average`);
const cachedTitle = t(`${root}.cached.title`);
const costTitle = t(`${root}.cost.title`);

export const UsageSummary = ({
  cachedRequests,
  className,
  isWalletConnected,
  loading,
  timeframe,
  totalCost,
  totalRequests,
}: UsageSummaryProps) => {
  const [total, average, cached, cost] = useUsageSummary({
    cachedRequests,
    timeframe,
    totalCost,
    totalRequests,
  });

  const classes = useUsageSummaryStyles();

  const cachedStat = (
    <Stat loading={loading} title={cachedTitle} value={cached} />
  );

  const costStat = (
    <Stat
      extra={<CostButton />}
      loading={loading}
      title={costTitle}
      value={cost}
    />
  );

  return (
    <div className={classNames(className, classes.usageSummary)}>
      <Stat loading={loading} title={totalTitle} value={total} />
      <Stat loading={loading} title={averageTitle} value={average} />
      {isWalletConnected ? costStat : cachedStat}
    </div>
  );
};
