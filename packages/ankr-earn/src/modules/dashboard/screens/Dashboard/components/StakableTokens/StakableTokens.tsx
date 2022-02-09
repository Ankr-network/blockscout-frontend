import { Box, BoxProps, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { featuresConfig } from 'modules/common/const';
import { StakableAsset } from 'modules/dashboard/components/StakableAsset';
import { t } from 'modules/i18n/utils/intl';
import { useBNBStakableAsset } from './asset-hooks/useBNBStakableAsset';
import { useMaticStakableAsset } from './asset-hooks/useMaticStakableAsset';
import { useStakableTokensStyles } from './useStakableTokensStyles';

const SKELETON_COUNT = 2;

export const StakableTokens = (props: BoxProps) => {
  const classes = useStakableTokensStyles();

  const bnbAsset = useBNBStakableAsset();
  const maticAsset = useMaticStakableAsset();

  const isShowABNBB = !bnbAsset.balance.isZero();
  const isShowAMATICB = !maticAsset.balance.isZero();

  const isLoading = bnbAsset.isLoading || maticAsset.isLoading;
  const isShowStakableTokens = isShowABNBB || isShowAMATICB || isLoading;

  return isShowStakableTokens ? (
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
          {isShowAMATICB && (
            <Grid item md={6} xs={12} lg="auto">
              <StakableAsset
                icon={maticAsset.icon}
                balance={maticAsset.balance}
                networks={maticAsset.networks}
                token={maticAsset.token}
                href={maticAsset.href}
                apy={maticAsset.apy}
                isStakeLoading={maticAsset.isStakeLoading}
              />
            </Grid>
          )}

          {featuresConfig.isActiveBNBStaking && isShowABNBB && (
            <Grid item md={6} xs={12} lg="auto">
              <StakableAsset
                icon={bnbAsset.icon}
                balance={bnbAsset.balance}
                networks={bnbAsset.networks}
                token={bnbAsset.token}
                href={bnbAsset.href}
                apy={bnbAsset.apy}
                isStakeLoading={bnbAsset.isStakeLoading}
              />
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  ) : null;
};
