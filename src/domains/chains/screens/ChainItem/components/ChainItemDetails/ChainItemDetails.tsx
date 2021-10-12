import React from 'react';

import { t } from 'modules/i18n/utils/intl';
import { DetailsBlock } from './DetailsBlock';
import { DetailsBlockChip } from './DetailsBlockChip';
import { useStyles } from './ChainItemDetailsStyles';

export const ChainItemDetails = () => {
  const classes = useStyles();

  return (
    <div>
      <DetailsBlock
        title={t('chain-item.details.average-requests')}
        subtitle={t('chain-item.details.24-hours')}
        value="9 321"
        className={classes.block}
      >
        <DetailsBlockChip label="20%" />
      </DetailsBlock>
      <DetailsBlock
        title={t('chain-item.details.bandwidth')}
        subtitle={t('chain-item.details.24-hours')}
        value="100GB"
        className={classes.block}
      />
      <DetailsBlock
        title={t('chain-item.details.cached-requests')}
        subtitle={t('chain-item.details.24-hours')}
        value="71 492 023"
        className={classes.block}
      >
        <DetailsBlockChip label="2%" type="negative" />
      </DetailsBlock>
      <DetailsBlock
        title={t('chain-item.details.average-requests')}
        subtitle={t('chain-item.details.all-time')}
        value="8 482"
        className={classes.block}
      >
        <DetailsBlockChip label="20%" />
      </DetailsBlock>
    </div>
  );
};
