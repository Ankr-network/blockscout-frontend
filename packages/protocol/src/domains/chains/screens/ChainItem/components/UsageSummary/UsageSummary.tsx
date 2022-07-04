import React from 'react';
import classNames from 'classnames';

import { ChainBlock } from 'domains/chains/components/ChainBlock';
import { UsageStatTitle } from '../UsageStatTitle';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './UsageSummaryStyles';
import { useUsageSummary } from './hooks/useUsageSummary';

export interface UsageSummaryProps {
  className?: string;
  chainId: string;
}

const totalTitle = t('chain-item.usage-summary.total');

export const UsageSummary = ({ chainId, className }: UsageSummaryProps) => {
  const classes = useStyles();

  const { loading, statsTimeframe, switchStatsTimeframe, totalRequests } =
    useUsageSummary(chainId);

  return (
    <div className={classNames(className, classes.usageSummary)}>
      <ChainBlock
        className={classes.stat}
        isLoading={loading}
        subtitle={
          <UsageStatTitle
            statsTimeframe={statsTimeframe}
            switchStatsTimeframe={switchStatsTimeframe}
            title={totalTitle}
          />
        }
        value={totalRequests.toFormat()}
      />
    </div>
  );
};
