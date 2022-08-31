import { Box, BoxProps, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { uid } from 'react-uid';

import { t } from 'common';

import { IETHNetwork } from 'modules/auth/eth/hooks/useETHNetworks';
import { IPolkadotNetwork } from 'modules/auth/polkadot/hooks/usePolkadotNetworks';
import { featuresConfig, isMainnet } from 'modules/common/const';
import { StakableAsset } from 'modules/dashboard/components/StakableAsset';
import { StakableList } from 'modules/dashboard/components/StakableList';

import { useStakableAnkr } from './hooks/useStakableAnkr';
import { useStakableAvax } from './hooks/useStakableAvax';
import { useStakableBnb } from './hooks/useStakableBnb';
import { useStakableDOT } from './hooks/useStakableDOT';
import { useStakableEth } from './hooks/useStakableEth';
import { useStakableFtm } from './hooks/useStakableFtm';
import { useStakableKSM } from './hooks/useStakableKSM';
import { useStakableMaticInEth } from './hooks/useStakableMaticInEth';
import { useStakableMaticInPolygon } from './hooks/useStakableMaticInPolygon';
import { useStakableMGNO } from './hooks/useStakableMGNO';
import { useStakableWND } from './hooks/useStakableWND';
import { IUseStakableToken } from './types';
import { useStakableTokensStyles } from './useStakableTokensStyles';

type TStakableTokens = (
  | (() => IUseStakableToken<IETHNetwork>)
  | (() => IUseStakableToken<IPolkadotNetwork>)
)[];

const SKELETON_COUNT = 2;

const STAKABLE_TOKENS_LIST = [
  // EVM Compatible
  useStakableEth,
  useStakableMaticInEth,
  featuresConfig.maticPolygonStaking ? useStakableMaticInPolygon : null,
  useStakableBnb,
  useStakableFtm,
  useStakableAvax,
  useStakableAnkr,
  featuresConfig.mgnoStaking ? useStakableMGNO : null,
  // Polkadot Compatible
  featuresConfig.isActivePolkadotStaking && isMainnet ? useStakableDOT : null,
  featuresConfig.isActivePolkadotStaking && isMainnet ? useStakableKSM : null,
  featuresConfig.isActivePolkadotStaking && !isMainnet ? useStakableWND : null,
].filter(stakableToken => stakableToken !== null) as TStakableTokens;

export const StakableTokens = (props: BoxProps): JSX.Element | null => {
  const classes = useStakableTokensStyles();

  const stakableTokens = STAKABLE_TOKENS_LIST.map(stakableToken =>
    stakableToken(),
  );

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
                  isDelegatedStaking={asset.isDelegatedStaking}
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
