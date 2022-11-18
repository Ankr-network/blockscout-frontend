import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { DEFAULT_ROUNDING } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { useBaseTokenUsdAmountStyles } from './useBaseTokenUsdAmountStyles';

interface IBaseTokenUsdAmountProps {
  amount: BigNumber;
  usdAmount: BigNumber;
  token: Token;
  buttonSlot?: JSX.Element;
}

export const BaseTokenUsdAmount = ({
  amount,
  usdAmount,
  token,
  buttonSlot,
}: IBaseTokenUsdAmountProps): JSX.Element => {
  const classes = useBaseTokenUsdAmountStyles();

  return (
    <div className={classes.root}>
      <div className={classes.infoWrapper}>
        {`${amount.decimalPlaces(DEFAULT_ROUNDING).toFormat()} ${token}`}

        <div className={classes.usdAmount}>
          {t('unit.usd-value', {
            value: usdAmount.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
          })}
        </div>
      </div>

      {buttonSlot}
    </div>
  );
};
