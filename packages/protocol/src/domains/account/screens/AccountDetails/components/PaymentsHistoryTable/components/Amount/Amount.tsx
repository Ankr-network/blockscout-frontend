import React, { StyleHTMLAttributes } from 'react';

import { getSign } from './utils/getSign';
import { useStyles } from './AmountStyles';
import { getMainTheme } from 'uiKit/Theme/mainTheme';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

export interface AmountProps {
  currencySymbol?: string;
  direction?: boolean;
  value: string;
}

export enum CurrencySymbol {
  ankr = 'ANKR',
  usd = '$',
}

export const Amount = ({ currencySymbol, direction, value }: AmountProps) => {
  const sign = getSign(direction);

  const { classes } = useStyles();

  const { themes } = useThemes();
  const mainTheme = getMainTheme(themes);

  // use styles doesn't update classes due the component is invoked from
  // a render function
  const style: StyleHTMLAttributes<'span'> = {
    color: direction ? mainTheme.palette.success.main : undefined,
  };

  return (
    <span className={classes.cell} style={style}>
      {sign}
      {currencySymbol === CurrencySymbol.ankr ? (
        <>
          {value} {currencySymbol}
        </>
      ) : (
        <>
          {currencySymbol}
          {value}
        </>
      )}
    </span>
  );
};
