import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ChartCurrency, ChartTimeframe } from '../../types';
import { CurrencySwitcher } from '../CurrencySwitcher';
import { TimeframeSelector } from '../TimeframeSelector';
import { root, SWITCH_CURRENCY_DISABLED } from '../../const';
import { useHeaderStyles } from './useHeaderStyles';

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
  const { classes } = useHeaderStyles();

  return (
    <div className={classes.header}>
      <div className={classes.left}>
        <Typography className={classes.title} variant="h6">
          {t(`${root}.title`)}
        </Typography>
        {!SWITCH_CURRENCY_DISABLED && (
          <CurrencySwitcher currency={currency} onClick={switchCurrency} />
        )}
      </div>
      <TimeframeSelector timeframe={timeframe} onChange={setTimeframe} />
    </div>
  );
};
