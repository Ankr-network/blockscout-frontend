import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useBaseAnkrAmountStyles } from './useBaseAnkrAmountStyles';

interface IBaseAnkrAmountProps {
  ankrAmount: BigNumber;
  usdAmount: BigNumber;
  buttonSlot?: JSX.Element;
}

export const BaseAnkrAmount = ({
  ankrAmount,
  usdAmount,
  buttonSlot,
}: IBaseAnkrAmountProps): JSX.Element => {
  const classes = useBaseAnkrAmountStyles();

  return (
    <div className={classes.root}>
      <div className={classes.infoWrapper}>
        {t('unit.ankr-value', { value: ankrAmount.toFormat() })}

        <div className={classes.usdAmount}>
          {t('unit.usd-value', { value: usdAmount.integerValue().toFormat() })}
        </div>
      </div>

      {buttonSlot}
    </div>
  );
};
