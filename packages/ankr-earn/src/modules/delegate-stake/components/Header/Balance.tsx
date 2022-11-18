import { t } from '@ankr.com/common';
import { Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import React from 'react';

import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { NavLink } from 'uiKit/NavLink';

import { useHeaderStyles } from './useHeaderStyles';

interface IBalanceProps {
  link: string;
  isLoading: boolean;
  value?: BigNumber;
  icon: JSX.Element;
}

export const Balance = ({
  value = ZERO,
  isLoading,
  link,
  icon,
}: IBalanceProps): JSX.Element => {
  const classes = useHeaderStyles();

  return (
    <Paper className={classes.balanceRoot}>
      <span className={classes.label}>
        {t('delegated-stake.balance.label')}
      </span>

      <div className={classes.wrapper}>
        {React.cloneElement(icon, {
          className: classes.balanceIcon,
        })}

        {isLoading ? (
          <Skeleton width={50} />
        ) : (
          value.decimalPlaces(DEFAULT_ROUNDING).toFormat()
        )}

        <NavLink
          className={classes.btn}
          href={link}
          size="small"
          variant="contained"
        >
          {t('delegated-stake.balance.btn')}
        </NavLink>
      </div>
    </Paper>
  );
};
