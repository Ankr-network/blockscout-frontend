import BigNumber from 'bignumber.js';

import { t } from 'common';

import { DEFAULT_ROUNDING } from 'modules/common/const';
import { iconByTokenMap, TIconMap } from 'modules/common/icons';
import { Token } from 'modules/common/types/token';

import { useBaseAmountWithIconStyles } from './useBaseAmountWithIconStyles';

interface IBaseAmountWithIconProps {
  amount: BigNumber;
  token: Token;
  usdAmount: BigNumber;
}

export const BaseAmountWithIcon = ({
  amount,
  usdAmount,
  token,
}: IBaseAmountWithIconProps): JSX.Element => {
  const classes = useBaseAmountWithIconStyles();

  const Icon = iconByTokenMap[token as keyof TIconMap] ?? 'span';

  return (
    <div className={classes.root}>
      <div className={classes.infoWrapper}>
        <Icon className={classes.icon} />

        <div className={classes.values}>
          {`${amount.decimalPlaces(DEFAULT_ROUNDING).toFormat()} ${token}`}

          <div className={classes.usdAmount}>
            {t('unit.usd-value', {
              value: usdAmount.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
