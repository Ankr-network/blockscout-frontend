import { Box, Typography } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';

import { t } from 'common';

import { featuresConfig, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getMaxApy } from 'modules/stake-ankr/actions/getMaxApy';
import { getTotalTvl } from 'modules/stake-ankr/actions/getTotalTvl';
import { RoutesConfig as AnkrRoutes } from 'modules/stake-ankr/Routes';
import { RoutesConfig as MgnoRoutes } from 'modules/stake-mgno/Routes';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';
import { MGNOIcon } from 'uiKit/Icons/MGNOIcon';

import { useStakeMainScreen } from '../../hooks/useStakeMainScreen';
import { FeatureItem } from '../FeatureItem';
import { Features } from '../Features';

import { useDelegateStakingTokensStyles } from './useDelegateStakingTokensStyles';

export const DelegateStakingTokens = (): JSX.Element => {
  const classes = useDelegateStakingTokensStyles();
  const { onTrackEnterDelegatedStakingFlow } = useStakeMainScreen();

  const { data: maxAnkrApy, loading: apyLoading } = useQuery({
    type: getMaxApy,
  });
  const { data: totalTvl, loading: tvlLoading } = useQuery({
    type: getTotalTvl,
  });

  const ankrApy = maxAnkrApy?.toNumber() ?? 0;

  return (
    <Box mb={8}>
      <Typography className={classes.title} variant="h3">
        {t('stake.delegated-staking')}
      </Typography>

      <Features>
        <FeatureItem
          isDelegatedStaking
          isIntegerTvl
          apy={ankrApy}
          iconSlot={<AnkrIcon />}
          isApyLoading={apyLoading}
          isTvlLoading={tvlLoading}
          mainHref={AnkrRoutes.stake.generatePath()}
          manageHref={AnkrRoutes.main.generatePath()}
          stakedTvl={totalTvl ?? undefined}
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
            apy={0}
            iconSlot={<MGNOIcon />}
            mainHref={MgnoRoutes.stake.generatePath()}
            manageHref={MgnoRoutes.main.generatePath()}
            stakedTvl={ZERO}
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
