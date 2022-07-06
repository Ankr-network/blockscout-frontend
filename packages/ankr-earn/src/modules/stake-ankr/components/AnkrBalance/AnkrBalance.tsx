import { Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';
import { NavLink } from 'uiKit/NavLink';

import { useAnkrBalanceStyles } from './useAnkrBalanceStyles';

interface IAnkrBalanceProps {
  link: string;
  isLoading: boolean;
  value?: BigNumber;
}

export const AnkrBalance = ({
  value = ZERO,
  isLoading,
  link,
}: IAnkrBalanceProps): JSX.Element => {
  const classes = useAnkrBalanceStyles();

  return (
    <Paper className={classes.root}>
      <span className={classes.label}>{t('stake-ankr.balance.label')}</span>

      <AnkrIcon size={22} />

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
        {t('stake-ankr.balance.btn')}
      </NavLink>
    </Paper>
  );
};
