import React, { StyleHTMLAttributes } from 'react';

import { getSign } from './utils/getSign';
import { useStyles } from './AmountStyles';
import { mainTheme } from 'ui';

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

  const classes = useStyles();

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
