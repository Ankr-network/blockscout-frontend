import { t } from '@ankr.com/common';
import { Box, Typography } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';

import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as AnkrRoutes } from 'modules/stake-ankr/RoutesConfig';
import { getMaxApr } from 'modules/stake-mgno/actions/getMaxApr';
import { getTVL } from 'modules/stake-mgno/actions/getTVL';
import { RoutesConfig as MgnoRoutes } from 'modules/stake-mgno/Routes';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';
import { MGNOIcon } from 'uiKit/Icons/MGNOIcon';

import { useStakeMainScreen } from '../../hooks/useStakeMainScreen';
import { FeatureItem } from '../FeatureItem';
import { Features } from '../Features';

import { useDelegateStakingTokensStyles } from './useDelegateStakingTokensStyles';

export const DelegateStakingTokens = (): JSX.Element => {
  const classes = useDelegateStakingTokensStyles();
  const { onTrackEnterDelegatedStakingFlow, metrics, loading } =
    useStakeMainScreen();

  const { data: mgnoApr, loading: isMGNOApyLoading } = useQuery({
    type: getMaxApr,
  });
  const { data: mgnoTvl, loading: isMGNOTvlLoading } = useQuery({
    type: getTVL,
  });

  return (
    <Box mb={6.5}>
      <Typography className={classes.title} variant="h3">
        {t('stake.delegated-staking')}
      </Typography>

      <Features>
        <FeatureItem
          isDelegatedStaking
          isIntegerTvl
          apy={metrics && +metrics.ankr.apy}
          iconSlot={<AnkrIcon />}
          isApyLoading={loading}
          isTvlLoading={loading}
          mainHref={AnkrRoutes.stake.generatePath()}
          manageHref={AnkrRoutes.main.generatePath()}
          stakedTvl={metrics?.ankr.totalStaked}
          title={t('features.ankr')}
          token={Token.ANKR}
          onManageClick={onTrackEnterDelegatedStakingFlow(
            Token.ANKR,
            'delegated_staking_manage',
          )}
          onStakeClick={onTrackEnterDelegatedStakingFlow(
            Token.ANKR,
            'delegated_staking_stake',
          )}
        />

        {featuresConfig.mgnoStaking && (
          <FeatureItem
            isDelegatedStaking
            apy={mgnoApr?.toNumber() ?? 0}
            iconSlot={<MGNOIcon />}
            isApyLoading={isMGNOApyLoading}
            isTvlLoading={isMGNOTvlLoading}
            mainHref={MgnoRoutes.stake.generatePath()}
            manageHref={MgnoRoutes.main.generatePath()}
            stakedTvl={mgnoTvl ?? undefined}
            title={t('features.mgno')}
            token={Token.mGNO}
            onManageClick={onTrackEnterDelegatedStakingFlow(
              Token.mGNO,
              'delegated_staking_manage',
            )}
            onStakeClick={onTrackEnterDelegatedStakingFlow(
              Token.mGNO,
              'delegated_staking_stake',
            )}
          />
        )}
      </Features>
    </Box>
  );
};
