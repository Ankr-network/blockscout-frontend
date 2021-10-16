import React from 'react';
import BigNumber from 'bignumber.js';

import { t } from 'modules/i18n/utils/intl';
import { DetailsBlock } from './DetailsBlock';
import { useStyles } from './ChainItemDetailsStyles';
import { formatNumber } from './ChainItemDetailsUtils';

interface ChainItemDetailsProps {
  dataCached: BigNumber;
  totalCached: BigNumber;
  totalServed: BigNumber;
  uniqueVisitors: BigNumber;
}

export const ChainItemDetails = ({
  dataCached,
  totalCached,
  totalServed,
  uniqueVisitors,
}: ChainItemDetailsProps) => {
  const classes = useStyles();

  return (
    <div>
      <DetailsBlock
        title={t('chain-item.api-details.data-cached')}
        value={formatNumber(dataCached)}
        className={classes.block}
      />
      <DetailsBlock
        title={t('chain-item.api-details.total-cached')}
        value={formatNumber(totalCached)}
        className={classes.block}
      />
      <DetailsBlock
        title={t('chain-item.api-details.total-served')}
        value={formatNumber(totalServed)}
        className={classes.block}
      />
      <DetailsBlock
        title={t('chain-item.api-details.unique-visitors')}
        value={formatNumber(uniqueVisitors)}
        className={classes.block}
      />
    </div>
  );
};
