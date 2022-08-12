import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useBaseMGNOAmountStyles } from './useBaseMGNOAmountStyles';

interface IBaseMGNOAmountProps {
  mgnoAmount: BigNumber;
  usdAmount: BigNumber;
  buttonSlot?: JSX.Element;
}

export const BaseMGNOAmount = ({
  mgnoAmount,
  usdAmount,
  buttonSlot,
}: IBaseMGNOAmountProps): JSX.Element => {
  const classes = useBaseMGNOAmountStyles();

  return (
    <div className={classes.root}>
      <div className={classes.infoWrapper}>
        {t('unit.mgno-value', { value: mgnoAmount.toFormat() })}

        <div className={classes.usdAmount}>
          {t('unit.usd-value', { value: usdAmount.integerValue().toFormat() })}
        </div>
      </div>

      {buttonSlot}
    </div>
  );
};
