import { Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { DEFAULT_ROUNDING } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { Amount } from 'modules/dashboard/components/Amount';
import { DashboardCard } from 'modules/dashboard/components/DashboardCard';
import { NetworkIconText } from 'modules/dashboard/components/NetworkIconText';
import { NavLink } from 'uiKit/NavLink';

import { useStakedMGNOData } from '../StakedTokens/hooks/MGNO/useStakedMGNOData';

import { useStakedMGNOStyles } from './useStakedMGNOStyles';

export const StakedMGNO = (): JSX.Element => {
  const classes = useStakedMGNOStyles();

  const {
    stakedAmount,
    stakedUsdEquivalent,
    rewardsAmount,
    rewardsUsdEquivalent,
    network,
    manageLink,
  } = useStakedMGNOData();

  const renderUsdAmount = (value: BigNumber) =>
    t('unit.usd-value', {
      value: value.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
    });

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

          {rewardsAmount && (
            <Grid item xs>
              <Typography color="textSecondary" variant="subtitle1">
                {t('dashboard.card.rewards')}
              </Typography>

              <Amount
                infoSlot={renderUsdAmount(rewardsUsdEquivalent)}
                value={rewardsAmount}
              />
            </Grid>
          )}
        </Grid>
      }
      buttonsSlot={
        <Grid
          container
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
        >
          <Grid item xs={12}>
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
        <NetworkIconText network={network} token={Token.mGNO} />
      }
    />
  );
};
