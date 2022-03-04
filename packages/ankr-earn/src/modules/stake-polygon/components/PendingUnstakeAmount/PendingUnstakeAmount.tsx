import { IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { DEFAULT_FIXED } from 'modules/common/const';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';

import { usePendingUnstakeAmountStyles } from './usePendingUnstakeAmountStyles';

interface IPendingUnstakeAmountProps {
  value: BigNumber;
}

export const PendingUnstakeAmount = ({
  value,
}: IPendingUnstakeAmountProps): JSX.Element => {
  const classes = usePendingUnstakeAmountStyles();

  return (
    <Paper className={classes.root} square={false} variant="outlined">
      <div className={classes.top}>
        <Typography className={classes.title} variant="h5">
          {t('pending-unstake-amount.title')}

          <Tooltip title={t('pending-unstake-amount.tip.in-progress')}>
            <IconButton className={classes.icon}>
              <QuestionIcon size="xs" />
            </IconButton>
          </Tooltip>
        </Typography>
      </div>

      <div className={classes.bottom}>
        <div className={classes.amount}>
          {tHTML(`unit.separated-polygon-value`, {
            value: value.decimalPlaces(DEFAULT_FIXED).toNumber(),
          })}
        </div>
      </div>
    </Paper>
  );
};
