import { Typography } from '@mui/material';

import { getSign } from './utils/getSign';
import { useStyles } from './AmountStyles';
import { ECurrencySymbol } from '../../types';

export interface AmountProps {
  currencySymbol?: string;
  direction?: boolean;
  value: string;
}

export const Amount = ({ currencySymbol, direction, value }: AmountProps) => {
  const sign = getSign(direction);

  const isCryptoCurrency =
    currencySymbol === ECurrencySymbol.ankr ||
    currencySymbol === ECurrencySymbol.usdc ||
    currencySymbol === ECurrencySymbol.usdt;

  const { classes } = useStyles(direction);

  return (
    <Typography className={classes.cell} variant="body3">
      {sign}
      {isCryptoCurrency ? (
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
