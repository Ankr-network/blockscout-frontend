import { IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { t } from 'modules/i18n/utils/intl';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';

import { usePendingUnstakeAmountStyles } from './usePendingUnstakeAmountStyles';

export interface IPendingUnstakeAmountProps {
  value: BigNumber;
}

export const PendingUnstakeAmount = (): JSX.Element => {
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
          {/* TODO Please to add logic here (AVAX) */}
        </div>
      </div>
    </Paper>
  );
};
