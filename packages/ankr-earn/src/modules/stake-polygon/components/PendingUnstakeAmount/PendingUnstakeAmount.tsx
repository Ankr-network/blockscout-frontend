import { IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { DEFAULT_FIXED } from 'modules/common/const';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { usePendingUnstakeAmountStyles } from './usePendingUnstakeAmountStyles';
import { QuestionIcon } from 'uiKit/StakefiUiKit/Icons/QuestionIcon';

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
          {tHTML(`unit.separated-polygon-value`, {
            value: value.decimalPlaces(DEFAULT_FIXED).toNumber(),
          })}
        </div>
      </div>
    </Paper>
  );
};
