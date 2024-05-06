import { Typography } from '@mui/material';
import { EBlockchain } from 'multirpc-sdk';

import { ECurrency } from 'modules/billing/types';
import { renderCryptoAmount } from 'modules/billing/utils/renderCryptoAmount';
import { renderUSDAmount } from 'modules/billing/utils/renderUSDAmount';
import { CurrencyIcon } from 'modules/common/components/CurrencyIcon';

import { useHeaderStyles } from './useHeaderStyles';

export interface IHeaderProps {
  amount: number;
  amountUsd: number;
  currency: ECurrency;
  network: EBlockchain;
}

export const Header = ({
  amount,
  amountUsd,
  currency,
  network,
}: IHeaderProps) => {
  const { classes } = useHeaderStyles();

  return (
    <div className={classes.root}>
      <div className={classes.iconsRoot}>
        <CurrencyIcon
          currency={currency}
          network={network}
          currencyClassName={classes.icon}
        />
      </div>
      <Typography className={classes.amount} variant="h5">
        {renderCryptoAmount({ amount, currency })}
      </Typography>
      <Typography className={classes.amountUsd} variant="subtitle2">
        {renderUSDAmount({ amount: amountUsd, isApproximate: true })}
      </Typography>
    </div>
  );
};
