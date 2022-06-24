import { Paper } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { DECIMAL_PLACES, ZERO } from 'modules/common/const';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';
import { NavLink } from 'uiKit/NavLink';

import { useAnkrBalanceStyles } from './useAnkrBalanceStyles';

interface IAnkrBalanceProps {
  link: string;
  value?: BigNumber;
}

export const AnkrBalance = ({
  value = ZERO,
  link,
}: IAnkrBalanceProps): JSX.Element => {
  const classes = useAnkrBalanceStyles();

  return (
    <Paper className={classes.root}>
      <span className={classes.label}>{t('stake-ankr.balance.label')}</span>

      <AnkrIcon size={22} />

      {value.decimalPlaces(DECIMAL_PLACES).toFormat()}

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
