import React from 'react';

import { StatsTimeframe } from 'domains/chains/types';
import { TimeframeSwitcher } from 'domains/chains/components/TimeframeSwitcher';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './HeaderStyles';

export interface HeaderProps {
  timeframe: StatsTimeframe;
  switchTimeframe: () => void;
}

const title = t('chain-item.methods-rating.title');

export const Header = ({ switchTimeframe, timeframe }: HeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.headerRoot}>
      <div className={classes.titleBox}>
        <div className={classes.title}>{title}</div>
        <TimeframeSwitcher onSwitch={switchTimeframe} timeframe={timeframe} />
      </div>
    </div>
  );
};
