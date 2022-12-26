import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { Stat } from '../Stat';
import { Timeframe } from 'domains/chains/types';
import { t } from 'modules/i18n/utils/intl';
import { useUsageSummary } from './hooks/useUsageSummary';
import { useUsageSummaryStyles } from './UsageSummaryStyles';
import { ReactNode } from 'react';

export interface UsageSummaryProps {
  className?: string;
  loading: boolean;
  timeframe: Timeframe;
  totalRequests: BigNumber;
  children: ReactNode;
}

const root = 'chain-item.usage-data.usage-summary';

const totalTitle = t(`${root}.total`);
const averageTitle = t(`${root}.average`);

export const UsageSummary = ({
  className,
  loading,
  timeframe,
  totalRequests,
  children,
}: UsageSummaryProps) => {
  const [total, average] = useUsageSummary({
    timeframe,
    totalRequests,
  });

  const classes = useUsageSummaryStyles();

  return (
    <div className={classNames(className, classes.usageSummary)}>
      <Stat loading={loading} title={totalTitle} value={total} />
      <Stat loading={loading} title={averageTitle} value={average} />
      {children}
    </div>
  );
};
