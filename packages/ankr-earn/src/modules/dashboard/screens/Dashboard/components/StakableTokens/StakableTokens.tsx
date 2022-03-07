import { Box, BoxProps, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { uid } from 'react-uid';

import { StakableAsset } from 'modules/dashboard/components/StakableAsset';
import { StakableList } from 'modules/dashboard/components/StakableList';
import { t } from 'modules/i18n/utils/intl';

import { useStakableAvax } from './hooks/useStakableAvax';
import { useStakableBnb } from './hooks/useStakableBnb';
import { useStakableFtm } from './hooks/useStakableFtm';
import { useStakableMatic } from './hooks/useStakableMatic';
import { useStakableTokensStyles } from './useStakableTokensStyles';

const SKELETON_COUNT = 2;

export const StakableTokens = (props: BoxProps): JSX.Element | null => {
  const classes = useStakableTokensStyles();

  const stakableTokens = [
    useStakableAvax(),
    useStakableBnb(),
    useStakableMatic(),
    useStakableFtm(),
  ];

  const { isLoading, isTokensShowed } = stakableTokens.reduce(
    (prev, current) => {
      const loading = prev.isLoading || current.isLoading;
      return {
        isLoading: loading,
        isTokensShowed: loading || prev.isTokensShowed || current.isShowed,
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
              key={uid(i)}
              className={classes.skeleton}
              variant="rect"
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
                  apy={asset.apy}
                  balance={asset.balance}
                  href={asset.href}
                  icon={asset.icon}
                  isStakeLoading={asset.isStakeLoading}
                  networks={asset.networks}
                  token={asset.token}
                />
              ),
          )}
        </StakableList>
      )}
    </Box>
  ) : null;
};
