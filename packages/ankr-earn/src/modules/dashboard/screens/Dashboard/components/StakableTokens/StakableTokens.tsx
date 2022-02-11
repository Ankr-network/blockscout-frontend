import { Box, BoxProps, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { StakableAsset } from 'modules/dashboard/components/StakableAsset';
import { StakableList } from 'modules/dashboard/components/StakableList';
import { t } from 'modules/i18n/utils/intl';
import { uid } from 'react-uid';
import { useStakableBnb } from './hooks/useStakableBnb';
import { useStakableFtm } from './hooks/useStakableFtm';
import { useStakableMatic } from './hooks/useStakableMatic';
import { useStakableTokensStyles } from './useStakableTokensStyles';

const SKELETON_COUNT = 2;

export const StakableTokens = (props: BoxProps) => {
  const classes = useStakableTokensStyles();

  const stakableTokens = [
    useStakableBnb(),
    useStakableMatic(),
    useStakableFtm(),
  ];

  const { isLoading, isTokensShowed } = stakableTokens.reduce(
    (prev, current) => {
      const isLoading = prev.isLoading || current.isLoading;
      return {
        isLoading,
        isTokensShowed: isLoading || prev.isTokensShowed || current.isShowed,
      };
    },
    {
      isLoading: false,
      isTokensShowed: false,
    },
  );

  return isTokensShowed ? (
    <Box {...props}>
      <Typography className={classes.title} component="h1" variant="h3">
        {t('dashboard.title')}
      </Typography>

      {isLoading ? (
        // todo: make actual skeleton
        <StakableList>
          {[...Array(SKELETON_COUNT)].map((_, i) => (
            <Skeleton
              className={classes.skeleton}
              variant="rect"
              key={uid(i)}
            />
          ))}
        </StakableList>
      ) : (
        <StakableList>
          {stakableTokens.map(
            asset =>
              asset.isShowed && (
                <StakableAsset
                  key={uid(asset.token)}
                  icon={asset.icon}
                  balance={asset.balance}
                  networks={asset.networks}
                  token={asset.token}
                  href={asset.href}
                  apy={asset.apy}
                  isStakeLoading={asset.isStakeLoading}
                />
              ),
          )}
        </StakableList>
      )}
    </Box>
  ) : null;
};
