import React from 'react';

import { TimeframeSwitcher } from 'domains/chains/components/TimeframeSwitcher';
import { Timeframe } from 'domains/chains/types';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './HeaderStyles';

export interface HeaderProps {
  switchTimeframe: () => void;
  timeframe: Timeframe;
}

const title = t('chains.private-stats.title');

export const Header = ({ timeframe, switchTimeframe }: HeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.title}>{title}</div>
      <TimeframeSwitcher timeframe={timeframe} onSwitch={switchTimeframe} />
    </div>
  );
};
