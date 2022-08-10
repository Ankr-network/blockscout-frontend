import { Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { DEFAULT_ROUNDING } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { Amount } from 'modules/dashboard/components/Amount';
import {
  DashboardCard,
  DashboardCardSkeleton,
} from 'modules/dashboard/components/DashboardCard';
import { NetworkIconText } from 'modules/dashboard/components/NetworkIconText';
import { NavLink } from 'uiKit/NavLink';

import { useStakedANKRData } from '../StakedTokens/hooks/ANKR/useStakedANKRData';

import { useStakedANKRStyles } from './useStakedANKRStyles';

export const StakedANKR = (): JSX.Element => {
  const classes = useStakedANKRStyles();

  const { stakedAmount, stakedUsdEquivalent, network, manageLink, loading } =
    useStakedANKRData();

  const renderUsdAmount = (value: BigNumber) =>
    t('unit.usd-value', {
      value: value.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    });

  if (loading) {
    return <DashboardCardSkeleton />;
  }

  return (
    <DashboardCard
      amountSlot={
        <Grid container spacing={2}>
          {stakedAmount && (
            <Grid item xs>
              <Typography color="textSecondary" variant="subtitle1">
                {t('dashboard.card.staked')}
              </Typography>

              <Amount
                infoSlot={renderUsdAmount(stakedUsdEquivalent)}
                value={stakedAmount}
              />
            </Grid>
          )}
        </Grid>
      }
      buttonsSlot={
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <NavLink
              className={classes.manageButton}
              href={manageLink}
              variant="outlined"
            >
              {t('dashboard.card.manage')}
            </NavLink>
          </Grid>
        </Grid>
      }
      networkAndIconSlot={
        <NetworkIconText network={network} token={Token.ANKR} />
      }
    />
  );
};
