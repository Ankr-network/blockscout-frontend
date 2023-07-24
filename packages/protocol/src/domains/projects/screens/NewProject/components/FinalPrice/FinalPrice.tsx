import { Cart } from '@ankr.com/ui';
import { Typography } from '@mui/material';

import { useFinalPriceStyles } from './useFinalPriceStyles';

interface FinalPriceProps {
  amount: string;
}

export const FinalPrice = ({ amount }: FinalPriceProps) => {
  const { classes } = useFinalPriceStyles();

  return (
    <div className={classes.root}>
      <Cart color="primary" />
      <div className={classes.description}>
        <Typography noWrap variant="subtitle2" className={classes.price}>
          {amount}
        </Typography>
      </div>
    </div>
  );
};
