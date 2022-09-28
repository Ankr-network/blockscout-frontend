import { Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { t, tHTML } from 'common';

import { iconByTokenMap, TIconMap } from 'modules/common/icons';
import { Token } from 'modules/common/types/token';
import { getDecimalPlaces } from 'modules/common/utils/numbers/getDecimalPlaces';
import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { useAmountWithIconStyles } from './useAmountWithIconStyles';

interface IAmountWithIconProps {
  token: Token;
  amount: BigNumber;
  refPercent: BigNumber;
  apy: number;
  ankrFees: number;
  refBonuses: number;
}

export const AmountWithIcon = ({
  amount,
  token,
  refPercent,
  apy,
  ankrFees,
  refBonuses,
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
              value: refPercent
                .decimalPlaces(getDecimalPlaces(refPercent))
                .toFormat(),
            })}

            <QuestionWithTooltip>
              <div className={classes.tooltipWrapper}>
                <div className={classes.row}>
                  <Typography className={classes.text} color="textSecondary">
                    {t('referrals.stats-table.staking-apy', {
                      token,
                    })}
                  </Typography>

                  <Typography className={classes.text}>
                    {tHTML('referrals.stats-table.staking-apy-value', {
                      value: apy,
                    })}
                  </Typography>
                </div>

                <div className={classes.row}>
                  <Typography className={classes.text} color="textSecondary">
                    {t('referrals.stats-table.ankr-fees')}
                  </Typography>

                  <Typography className={classes.text}>
                    {tHTML('referrals.stats-table.ankr-fees-value', {
                      value: ankrFees,
                    })}
                  </Typography>
                </div>

                <div className={classes.row}>
                  <Typography className={classes.text} color="textSecondary">
                    {t('referrals.stats-table.ref-bonuses')}
                  </Typography>

                  <Typography className={classes.text}>
                    {tHTML('referrals.stats-table.ref-bonuses-value', {
                      value: refBonuses,
                    })}
                  </Typography>
                </div>
              </div>
            </QuestionWithTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
