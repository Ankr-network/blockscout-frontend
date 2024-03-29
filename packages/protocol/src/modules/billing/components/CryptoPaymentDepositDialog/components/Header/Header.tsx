import { Typography } from '@mui/material';

import { AnrkNetworkIcon } from 'modules/common/components/AnkrNetworkIcon';
import { ECurrency } from 'modules/billing/types';
import { renderCryptoAmount } from 'modules/billing/utils/renderCryptoAmount';
import { renderUSDAmount } from 'modules/billing/utils/renderUSDAmount';

import { useHeaderStyles } from './useHeaderStyles';

export interface IHeaderProps {
  amount: number;
  amountUsd: number;
  currency: ECurrency;
}

export const Header = ({ amount, amountUsd, currency }: IHeaderProps) => {
  const { classes } = useHeaderStyles();

  return (
    <div className={classes.root}>
      <AnrkNetworkIcon className={classes.icon} />
      <Typography className={classes.amount} variant="h5">
        {renderCryptoAmount({ amount, currency })}
      </Typography>
      <Typography className={classes.amountUsd} variant="subtitle2">
        {renderUSDAmount({ amount: amountUsd, isApproximate: true })}
      </Typography>
    </div>
  );
};
