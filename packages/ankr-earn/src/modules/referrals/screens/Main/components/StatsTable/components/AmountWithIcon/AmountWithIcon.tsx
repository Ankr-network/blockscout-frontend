import BigNumber from 'bignumber.js';

import { t } from 'common';

import { DEFAULT_ROUNDING } from 'modules/common/const';
import { iconByTokenMap, TIconMap } from 'modules/common/icons';
import { Token } from 'modules/common/types/token';
import { getDecimalPlaces } from 'modules/common/utils/numbers/getDecimalPlaces';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { useAmountWithIconStyles } from './useAmountWithIconStyles';

interface IAmountWithIconProps {
  token: Token;
  amount: BigNumber;
  refPercent: BigNumber;
}

export const AmountWithIcon = ({
  amount,
  token,
  refPercent,
}: IAmountWithIconProps): JSX.Element => {
  const classes = useAmountWithIconStyles();

  const Icon = iconByTokenMap[token as keyof TIconMap] ?? 'span';

  return (
    <div className={classes.root}>
      <div className={classes.infoWrapper}>
        <Icon className={classes.icon} />

        <div className={classes.values}>
          <div className={classes.bigValue}>
            {amount.decimalPlaces(getDecimalPlaces(amount)).toFormat()}
          </div>

          <div className={classes.usdAmount}>
            {t('unit.ref-percent', {
              value: refPercent.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
            })}

            <QuestionWithTooltip>tooltip</QuestionWithTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
