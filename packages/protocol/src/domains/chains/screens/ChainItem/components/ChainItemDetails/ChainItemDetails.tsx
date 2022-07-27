import React from 'react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { DetailsBlock } from './DetailsBlock';
import { StatsTimeframe } from 'domains/chains/types';
import {
  formatNumber,
  getAvarageRequests,
  getCachedRequestPercent,
} from './ChainItemDetailsUtils';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './ChainItemDetailsStyles';

interface ChainItemDetailsProps {
  className?: string;
  isWalletConnected: boolean;
  loading: boolean;
  timeframe: StatsTimeframe;
  totalCached?: BigNumber;
  totalRequests?: BigNumber;
}

export const ChainItemDetails = ({
  className,
  isWalletConnected,
  loading,
  timeframe,
  totalCached,
  totalRequests,
}: ChainItemDetailsProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <DetailsBlock
        hasDot
        title={t('chain-item.details.total-requests')}
        value={formatNumber(totalRequests)}
        className={classes.block}
        loading={loading}
      />
      {!isWalletConnected && (
        <DetailsBlock
          title={t('chain-item.details.cached-requests')}
          value={getCachedRequestPercent(totalRequests, totalCached)}
          className={classes.block}
          loading={loading}
        />
      )}
      <DetailsBlock
        title={t('chain-item.details.average-requests')}
        value={getAvarageRequests(timeframe, totalRequests)}
        className={classes.block}
        loading={loading}
      />
    </div>
  );
};
