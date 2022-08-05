import { Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import React from 'react';

import { t } from 'common';

import { DECIMAL_PLACES, ZERO } from 'modules/common/const';
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
      <span className={classes.label}>{t('delegate-stake.balance.label')}</span>

      <div className={classes.wrapper}>
        {React.cloneElement(icon, {
          className: classes.balanceIcon,
        })}

        {isLoading ? (
          <Skeleton width={50} />
        ) : (
          value.decimalPlaces(DECIMAL_PLACES).toFormat()
        )}

        <NavLink
          className={classes.btn}
          href={link}
          size="small"
          variant="contained"
        >
          {t('delegate-stake.balance.btn')}
        </NavLink>
      </div>
    </Paper>
  );
};
