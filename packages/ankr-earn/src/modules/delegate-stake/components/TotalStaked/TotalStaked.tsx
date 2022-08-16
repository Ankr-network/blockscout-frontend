import { Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { t } from 'common';

import { NavLink } from 'uiKit/NavLink';

import { PlusMinusBtn } from '../../../common/components/PlusMinusBtn';

import { TotalIfnoContent } from './TotalIfnoContent';
import { TotalInfoAmount } from './TotalInfoAmount';
import { useTotalStakedStyles } from './useTotalStakedStyles';

interface ITotalStakedProps {
  isTotalStakedLoading: boolean;
  totalStaked: BigNumber;
  totalStakedUsd: BigNumber;
  token: string;
  stakeLink: string;
}

export const TotalStaked = ({
  isTotalStakedLoading,
  totalStaked,
  totalStakedUsd,
  token,
  stakeLink,
}: ITotalStakedProps): JSX.Element => {
  const classes = useTotalStakedStyles();

  const isPlusButton = !totalStaked.isZero();

  const stakeBtnText = t('delegated-stake.total-info.stake', { token });

  return (
    <Grid item lg={6} xs={12}>
      <Paper className={classes.paper}>
        <TotalIfnoContent
          amountSlot={
            <TotalInfoAmount
              isLoading={isTotalStakedLoading}
              usdValue={totalStakedUsd}
              value={totalStaked}
            />
          }
          buttonSlot={
            isPlusButton ? (
              <PlusMinusBtn
                className={classNames(classes.btn, classes.btnRound)}
                href={stakeLink}
                icon="plus"
                tooltip={stakeBtnText}
                variant="contained"
              />
            ) : (
              <NavLink
                className={classNames(classes.btn, classes.btnRegular)}
                href={stakeLink}
                variant="contained"
              >
                {stakeBtnText}
              </NavLink>
            )
          }
          titleSlot={
            <Typography className={classes.title}>
              {t('delegated-stake.total-info.staked')}
            </Typography>
          }
        />
      </Paper>
    </Grid>
  );
};
