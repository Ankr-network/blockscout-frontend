import { Chip, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { Token } from 'modules/common/types/token';
import { getDecimalPlaces } from 'modules/common/utils/numbers/getDecimalPlaces';
import { Tooltip } from 'uiKit/Tooltip';

import { useBaseTokenUsdAmountStyles } from './useBaseTokenUsdAmountStyles';

interface IBaseTokenUsdAmountProps {
  amount: BigNumber;
  usdAmount: BigNumber;
  token: Token;
  unlockDays?: number;
}

export const BaseTokenUsdAmount = ({
  amount,
  usdAmount,
  token,
  unlockDays,
}: IBaseTokenUsdAmountProps): JSX.Element => {
  const classes = useBaseTokenUsdAmountStyles();

  return (
    <div className={classes.root}>
      <div className={classes.infoWrapper}>
        <div className={classes.bigValueWrapper}>
          <Typography className={classes.bigValue}>
            {t('unit.token-value', {
              value: amount.decimalPlaces(getDecimalPlaces(amount)).toFormat(),
              token,
            })}
          </Typography>

          {unlockDays && (
            <Tooltip title={t('referrals.stats-table.next-unlock')}>
              <Chip
                className={classes.chip}
                label={t('referrals.stats-table.next-unlock-days', {
                  value: unlockDays,
                })}
                variant="outlined"
              />
            </Tooltip>
          )}
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
