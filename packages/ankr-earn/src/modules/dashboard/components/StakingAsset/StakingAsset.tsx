import { Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';
import { DEFAULT_FIXED } from 'modules/common/const';
import { EToken } from 'modules/dashboard/types';
import { t } from 'modules/i18n/utils/intl';
import { NavLink } from 'uiKit/NavLink';
import { NetworkIconText } from '../NetworkIconText';
import { Pending } from '../Pending';
import { useStakingAssetStyles as useStyles } from './useStakingAssetStyles';

interface IStakingAssetProps {
  token: EToken;
  network: string;
  amount: BigNumber;
  pending?: number;
  tradeLink?: string;
  stakeLink?: string;
  unstakeLink?: string;
}

export const StakingAsset = ({
  network,
  token,
  amount,
  pending = 0,
  tradeLink,
  stakeLink,
  unstakeLink,
}: IStakingAssetProps) => {
  const classes = useStyles();

  const displayLinks = stakeLink || unstakeLink || tradeLink;

  return (
    <Paper className={classes.root}>
      <Grid
        container
        justifyContent="space-between"
        className={classes.upperWrapper}
        spacing={2}
      >
        <Grid item xs>
          <NetworkIconText network={network} token={token} />
        </Grid>
        {!!pending && (
          <Grid item xs container className={classes.pendingWrapper}>
            <Pending value={123} token="aMATICb" />
          </Grid>
        )}
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        spacing={2}
        className={classes.bottomWrapper}
      >
        <Grid item>
          <Typography className={classes.amount}>
            {amount ? amount.decimalPlaces(DEFAULT_FIXED).toFormat() : '-'}
          </Typography>
        </Grid>
        {displayLinks && (
          <Grid
            item
            xs
            container
            alignItems="center"
            spacing={2}
            className={classes.links}
          >
            {stakeLink && (
              <Grid item>
                <PlusMinusBtn href={stakeLink} />
              </Grid>
            )}
            {unstakeLink && (
              <Grid item>
                <PlusMinusBtn href={unstakeLink} icon="minus" />
              </Grid>
            )}
            {tradeLink && (
              <Grid item>
                <NavLink className={classes.tradeButton} href={tradeLink}>
                  {t('dashboard.trade')}
                </NavLink>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
