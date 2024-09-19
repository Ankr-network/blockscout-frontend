import { t } from '@ankr.com/common';
import { Timeframe } from '@ankr.com/chains-list';

import { TimeframeSwitcher } from 'domains/chains/components/TimeframeSwitcher';

import { useStyles } from './HeaderStyles';

export interface HeaderProps {
  switchTimeframe: () => void;
  timeframe: Timeframe;
}

export const Header = ({ switchTimeframe, timeframe }: HeaderProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.title}>{t('chains.private-stats.title')}</div>
      <TimeframeSwitcher
        timeframe={timeframe}
        onSwitch={switchTimeframe}
        className={classes.switcher}
      />
    </div>
  );
};
