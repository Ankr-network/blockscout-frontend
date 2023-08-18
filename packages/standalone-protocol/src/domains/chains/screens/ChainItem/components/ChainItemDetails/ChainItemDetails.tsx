import React from 'react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { Timeframe } from 'multirpc-sdk';

import { t } from 'modules/i18n/utils/intl';
import { ChainId } from 'domains/chains/api/chain';

import { DetailsBlock } from './DetailsBlock';
import { useStyles } from './ChainItemDetailsStyles';
import {
  formatNumber,
  getAvarageRequests,
  getCachedRequestPercent,
} from './ChainItemDetailsUtils';

interface ChainItemDetailsProps {
  isComingSoon: boolean;
  totalRequests?: BigNumber;
  totalCached?: BigNumber;
  className?: string;
  timeframe: Timeframe;
  loading: boolean;
  chainId: ChainId;
}

export const ChainItemDetails = ({
  isComingSoon,
  totalRequests,
  totalCached,
  timeframe,
  className,
  loading,
  chainId,
}: ChainItemDetailsProps) => {
  const classes = useStyles();

  return (
    <div
      className={classNames(classes.root, className, chainId)}
      data-test-id="chain-details"
    >
      <DetailsBlock
        title={t('chain-item.details.total-requests')}
        value={isComingSoon ? '--' : formatNumber(totalRequests)}
        className={classes.block}
        loading={loading}
        description={t('chain-item.details.timeframe')}
      />
      <DetailsBlock
        title={t('chain-item.details.cached-requests')}
        value={
          isComingSoon
            ? '--'
            : getCachedRequestPercent(totalRequests, totalCached)
        }
        className={classes.block}
        loading={loading}
        description={t('chain-item.details.timeframe')}
      />
      <DetailsBlock
        title={t('chain-item.details.average-requests')}
        value={
          isComingSoon ? '--' : getAvarageRequests(timeframe, totalRequests)
        }
        className={classes.block}
        loading={loading}
        description={t('chain-item.details.timeframe')}
      />
    </div>
  );
};
