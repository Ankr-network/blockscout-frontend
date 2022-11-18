import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { DEFAULT_ROUNDING } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { useBaseAmountStyles } from './useBaseAmountStyles';

interface IBaseAmountProps {
  amount: BigNumber;
  token: Token;
  usdAmount: BigNumber;
}

export const BaseAmount = ({
  amount,
  usdAmount,
  token,
}: IBaseAmountProps): JSX.Element => {
  const classes = useBaseAmountStyles();

  return (
    <div className={classes.root}>
      <div className={classes.values}>
        {`${amount.decimalPlaces(DEFAULT_ROUNDING).toFormat()} ${token}`}

        <div className={classes.usdAmount}>
          {t('unit.usd-value', {
            value: usdAmount.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
          })}
        </div>
      </div>
    </div>
  );
};
