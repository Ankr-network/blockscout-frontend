import { Box, Grid, Paper, Typography } from '@material-ui/core';
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
  pendingValue?: number;
  tradeLink?: string;
  stakeLink?: string;
  unstakeLink?: string;
}

export const StakingAsset = ({
  network,
  token,
  amount,
  pendingValue = 0,
  tradeLink,
  stakeLink,
  unstakeLink,
}: IStakingAssetProps) => {
  const classes = useStyles();

  const displayLinks = stakeLink || unstakeLink || tradeLink;

  return (
    <Paper className={classes.root}>
      <Box mb={{ xs: 3, sm: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm>
            <NetworkIconText network={network} token={token} />
          </Grid>

          {!!pendingValue && (
            <Grid item xs="auto" className={classes.pendingCol}>
              <Pending value={pendingValue} token={token} />
            </Grid>
          )}
        </Grid>
      </Box>

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
                <NavLink
                  variant="outlined"
                  className={classes.tradeButton}
                  href={tradeLink}
                >
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
