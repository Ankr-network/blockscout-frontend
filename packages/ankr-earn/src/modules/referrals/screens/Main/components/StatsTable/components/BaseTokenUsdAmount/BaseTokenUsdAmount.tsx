import BigNumber from 'bignumber.js';

import { t } from 'common';

import { DEFAULT_ROUNDING } from 'modules/common/const';

import { useBaseTokenUsdAmountStyles } from './useBaseTokenUsdAmountStyles';

interface IBaseTokenUsdAmountProps {
  amount: BigNumber;
  usdAmount: BigNumber;
}

export const BaseTokenUsdAmount = ({
  amount,
  usdAmount,
}: IBaseTokenUsdAmountProps): JSX.Element => {
  const classes = useBaseTokenUsdAmountStyles();

  return (
    <div className={classes.root}>
      <div className={classes.infoWrapper}>
        <div className={classes.bigValue}>
          {`${amount.decimalPlaces(DEFAULT_ROUNDING).toFormat()}`}
        </div>

        <div className={classes.usdAmount}>
          {t('unit.usd-value', {
            value: usdAmount.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
          })}
        </div>
      </div>
    </div>
  );
};
