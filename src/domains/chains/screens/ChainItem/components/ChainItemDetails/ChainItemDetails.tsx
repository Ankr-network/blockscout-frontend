import React from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { Timeframe } from '@ankr.com/multirpc';

import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { DetailsBlock } from './DetailsBlock';
import { useStyles } from './ChainItemDetailsStyles';
import {
  formatNumber,
  getAvarageRequests,
  getCachedRequestPercent,
  getSubtitle,
} from './ChainItemDetailsUtils';

interface ChainItemDetailsProps {
  totalRequests: BigNumber;
  totalCached: BigNumber;
  className?: string;
  timeframe: Timeframe;
}

export const ChainItemDetails = ({
  totalRequests,
  totalCached,
  timeframe,
  className,
}: ChainItemDetailsProps) => {
  const classes = useStyles();

  const subtitle = useLocaleMemo(() => t(getSubtitle(timeframe)), [timeframe]);

  return (
    <div className={cn(classes.root, className)}>
      <DetailsBlock
        title={t('chain-item.details.total-requests')}
        value={formatNumber(totalRequests)}
        className={classes.block}
        subtitle={subtitle}
      />
      <DetailsBlock
        title={t('chain-item.details.cached-requests')}
        value={getCachedRequestPercent(totalRequests, totalCached)}
        className={classes.block}
        subtitle={subtitle}
      />
      <DetailsBlock
        title={t('chain-item.details.average-requests')}
        value={getAvarageRequests(totalRequests, timeframe)}
        className={classes.block}
        subtitle={subtitle}
      />
    </div>
  );
};
