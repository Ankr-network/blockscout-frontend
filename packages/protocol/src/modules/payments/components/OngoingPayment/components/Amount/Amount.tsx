import { EBlockchain } from 'multirpc-sdk';
import { Typography } from '@mui/material';

import { CurrencyIcon } from 'modules/common/components/CurrencyIcon';
import { ECurrency } from 'modules/payments/types';
import { renderCryptoAmount } from 'modules/payments/utils/renderCryptoAmount';
import { renderUSDAmount } from 'modules/payments/utils/renderUSDAmount';

import { useAmountStyles } from './useAmountStyles';

export interface IAmountProps {
  amount: number;
  amountUsd: number;
  currency: ECurrency;
  network: EBlockchain;
}

export const Amount = ({
  amount,
  amountUsd,
  currency,
  network,
}: IAmountProps) => {
  const { classes } = useAmountStyles();

  return (
    <Typography className={classes.root} variant="body3">
      <CurrencyIcon
        currency={currency}
        currencyClassName={classes.currencyIcon}
        network={network}
        networkClassName={classes.networkIcon}
        rootClassName={classes.currencyIcon}
      />
      {renderCryptoAmount({ amount, currency })}{' '}
      <Typography variant="body3" color="textSecondary">
        / {renderUSDAmount({ amount: amountUsd, isApproximate: true })}
      </Typography>
    </Typography>
  );
};
