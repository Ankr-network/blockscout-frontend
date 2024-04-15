import { Typography } from '@mui/material';

import { getSign } from './utils/getSign';
import { useStyles } from './AmountStyles';

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

  const { classes } = useStyles(direction);

  return (
    <Typography className={classes.cell} variant="body3">
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
    </Typography>
  );
};
