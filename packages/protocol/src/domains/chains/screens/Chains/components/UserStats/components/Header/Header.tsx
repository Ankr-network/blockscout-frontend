import React from 'react';

import { Timeframe } from '../../types';
import { TimeframeSwitcher } from '../TimeframeSwitcher';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './HeaderStyles';

export interface HeaderProps {
  switchTimeframe: () => void;
  timeframe: Timeframe;
}

const title = t('chains.user-stats.title');

export const Header = ({ timeframe, switchTimeframe }: HeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.title}>{title}</div>
      <TimeframeSwitcher timeframe={timeframe} onSwitch={switchTimeframe} />
    </div>
  );
};
