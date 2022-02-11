import { Box, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { NavLink } from 'uiKit/NavLink';
import { NetworkIconText } from '../NetworkIconText';
import { LiquidCrowdloanAssetSkeleton } from './LiquidCrowdloanAssetSkeleton';
import { useLiquidCrowdloanAssetStyles as useStyles } from './useLiquidCrowdloanAssetStyles';

interface ILiquidCrowdloanAssetProps {
  token?: Token;
  network?: string;
  remaining?: BigNumber;
  claimable?: BigNumber;
  claimLink?: string;
  redeemDays?: number;
  isLoading?: boolean;
  isStakeLoading?: boolean;
  onHistoryBtnClick?: () => void;
}

export const LiquidCrowdloanAsset = ({
  network,
  token,
  claimable,
  remaining,
  claimLink,
  redeemDays,
  isLoading = false,
}: ILiquidCrowdloanAssetProps) => {
  const classes = useStyles();

  if (isLoading) {
    return <LiquidCrowdloanAssetSkeleton />;
  }

  return (
    <Paper className={classes.root}>
      <Box mb={{ xs: 3, sm: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm>
            <NetworkIconText network={network} token={token} />
          </Grid>

          {redeemDays && (
            <Grid item xs="auto">
              <div className={classes.redeemTimer}>
                {t('dashboard.redeem-timer', { days: redeemDays })}
              </div>
            </Grid>
          )}
        </Grid>
      </Box>

      <Grid container alignItems="flex-end" spacing={2}>
        <Grid item xs={12} sm className={classes.rewards}>
          <div className={classes.reward}>
            <Typography className={classes.rewardsLabel}>
              {t('dashboard.remaining-rewards')}
            </Typography>
            <Typography className={classes.rewardsValue}>
              {t('dashboard.reward', { value: remaining?.toFormat() })}
            </Typography>
          </div>
          <div className={classes.reward}>
            <Typography className={classes.rewardsLabel}>
              {t('dashboard.claimable-rewards')}
            </Typography>
            <Typography className={classes.rewardsValue}>
              {t('dashboard.reward', { value: claimable?.toFormat() })}
            </Typography>
          </div>
        </Grid>

        {claimLink && (
          <Grid item xs={12} sm="auto">
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <NavLink
                  variant="outlined"
                  className={classes.claimButton}
                  href={claimLink}
                >
                  {t('dashboard.claim')}
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
