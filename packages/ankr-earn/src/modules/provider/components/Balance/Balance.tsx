import { t } from '@ankr.com/common';
import { Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { DEFAULT_FIXED, ZERO } from 'modules/common/const';

import { useBalanceStyles } from './useBalanceStyles';

const DECIMAL_PACES = 0;

interface IBalanceProps {
  amount?: BigNumber;
  token?: string;
  usdAmount?: BigNumber;
}

export const Balance = ({
  amount = ZERO,
  token = 'ETH',
  usdAmount = ZERO,
}: IBalanceProps): JSX.Element => {
  const classes = useBalanceStyles();

  return (
    <>
      <Typography className={classes.tokenValue} variant="h4">
        {t('unit.token-value', {
          token,
          value: amount.decimalPlaces(DEFAULT_FIXED).toFormat(),
        })}
      </Typography>

      <Typography className={classes.usdValue}>
        {t('unit.usd-value', {
          value: usdAmount.decimalPlaces(DECIMAL_PACES).toFormat(),
        })}
      </Typography>
    </>
  );
};
