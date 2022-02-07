import { IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { t } from 'modules/i18n/utils/intl';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { usePendingUnstakeAmountStyles } from './usePendingUnstakeAmountStyles';

interface IPendingUnstakeAmountProps {
  value: BigNumber;
}

export const PendingUnstakeAmount = ({ value }: IPendingUnstakeAmountProps) => {
  const classes = usePendingUnstakeAmountStyles();

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <div className={classes.top}>
        <Typography variant="h5" className={classes.title}>
          {t('pending-unstake-amount.title')}{' '}
          <Tooltip title={t('pending-unstake-amount.tip.in-progress')}>
            <IconButton>
              <QuestionIcon size="xs" />
            </IconButton>
          </Tooltip>
        </Typography>
      </div>

      <div className={classes.bottom}>
        <div className={classes.amount}>
          {/* TODO Please to add logic here (BNB) */}
        </div>
      </div>
    </Paper>
  );
};
