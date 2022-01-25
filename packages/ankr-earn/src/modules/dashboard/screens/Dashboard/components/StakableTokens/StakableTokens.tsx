import { Box, BoxProps, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { StakableAsset } from 'modules/dashboard/components/StakableAsset';
import { t } from 'modules/i18n/utils/intl';
import { useMaticStakableAsset } from './useMaticStakableAsset';
import { useStakableTokensStyles } from './useStakableTokensStyles';

const SKELETON_COUNT = 2;

export const StakableTokens = (props: BoxProps) => {
  const maticAsset = useMaticStakableAsset();
  const classes = useStakableTokensStyles();

  const showAMAITCb = !maticAsset.balance.isZero();
  const isLoading = maticAsset.isLoading;
  const showStakableTokens = showAMAITCb || isLoading;

  return showStakableTokens ? (
    <Box {...props}>
      <Typography className={classes.title} component="h1" variant="h3">
        {t('dashboard.title')}
      </Typography>

      {isLoading ? (
        // todo: make actual skeleton
        <Grid container spacing={3} className={classes.stakableAssets}>
          {[...Array(SKELETON_COUNT)].map((_, i) => (
            <Grid item md={6} xs={12} lg="auto" key={i}>
              <Skeleton className={classes.skeleton} variant="rect" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3} className={classes.stakableAssets}>
          {showAMAITCb && (
            <Grid item md={6} xs={12} lg="auto">
              <StakableAsset
                icon={maticAsset.icon}
                balance={maticAsset.balance}
                networks={maticAsset.networks}
                token={maticAsset.token}
                href={maticAsset.href}
                apy={maticAsset.apy}
              />
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  ) : null;
};
