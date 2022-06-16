import React from 'react';

import { ChainType, Period } from 'domains/chains/types';
import { PeriodSwitcher } from '../PeriodSwitcher';
import { Tabs } from '../Tabs';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './HeaderStyles';

export interface HeaderProps {
  period: Period;
  switchPeriod: () => void;
  setChainType: (type: ChainType) => void;
}

const title = t('chain-item.methods-rating.title');

export const Header = ({ period, setChainType, switchPeriod }: HeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.headerRoot}>
      <div className={classes.titleBox}>
        <div className={classes.title}>{title}</div>
        <PeriodSwitcher onSwitch={switchPeriod} period={period} />
      </div>
      <Tabs setChainType={setChainType} />
    </div>
  );
};
