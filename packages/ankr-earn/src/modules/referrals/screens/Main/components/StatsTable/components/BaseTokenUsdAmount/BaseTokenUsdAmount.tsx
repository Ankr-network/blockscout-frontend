import BigNumber from 'bignumber.js';

import { t } from 'common';

import { getDecimalPlaces } from 'modules/common/utils/numbers/getDecimalPlaces';

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
          {`${amount.decimalPlaces(getDecimalPlaces(amount)).toFormat()}`}
        </div>

        <div className={classes.usdAmount}>
          {t('unit.usd-value', {
            value: usdAmount
              .decimalPlaces(getDecimalPlaces(usdAmount))
              .toFormat(),
          })}
        </div>
      </div>
    </div>
  );
};
