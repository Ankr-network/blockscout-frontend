import React from 'react';

import { ChartCurrency, ChartTimeframe } from '../../types';
import { CurrencySwitcher } from '../CurrencySwitcher';
import { TimeframeSelector } from '../TimeframeSelector';
import { root } from '../../const';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './HeaderStyles';

export interface HeaderProps {
  currency: ChartCurrency;
  setTimeframe: (timeframe: ChartTimeframe) => void;
  switchCurrency: () => void;
  timeframe: ChartTimeframe;
}

export const Header = ({
  currency,
  setTimeframe,
  switchCurrency,
  timeframe,
}: HeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.left}>
        <span className={classes.title}>{t(`${root}.title`)}</span>
        <CurrencySwitcher currency={currency} onClick={switchCurrency} />
      </div>
      <TimeframeSelector timeframe={timeframe} onChange={setTimeframe} />
    </div>
  );
};
