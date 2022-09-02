import { Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { t } from 'common';

import { Token } from 'modules/common/types/token';
import { NavLink } from 'uiKit/NavLink';

import { PlusMinusBtn } from '../../../common/components/PlusMinusBtn';

import { TotalIfnoContent } from './TotalIfnoContent';
import { TotalInfoAmount } from './TotalInfoAmount';
import { useTotalStakedStyles } from './useTotalStakedStyles';

interface ITotalStakedProps {
  isTotalStakedLoading: boolean;
  totalStaked: BigNumber;
  totalStakedUsd: BigNumber;
  token: Token;
  isShowTokenName?: boolean;
  stakeLink: string;
}

export const TotalStaked = ({
  isTotalStakedLoading,
  totalStaked,
  totalStakedUsd,
  token,
  stakeLink,
  isShowTokenName = false,
}: ITotalStakedProps): JSX.Element => {
  const classes = useTotalStakedStyles();

  const isPlusButton = !totalStaked.isZero();

  const stakeBtnText = t('delegated-stake.total-info.stake', { token });

  return (
    <Paper className={classes.paper}>
      <TotalIfnoContent
        amountSlot={
          <TotalInfoAmount
            isLoading={isTotalStakedLoading}
            token={isShowTokenName ? token : undefined}
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
  );
};
