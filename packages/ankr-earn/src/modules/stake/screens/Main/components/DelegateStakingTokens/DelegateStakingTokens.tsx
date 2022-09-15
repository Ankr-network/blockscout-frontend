import { Box, Typography } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';

import { t } from 'common';

import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getMaxApy } from 'modules/stake-ankr/actions/getMaxApy';
import { getTotalTvl } from 'modules/stake-ankr/actions/getTotalTvl';
import { RoutesConfig as AnkrRoutes } from 'modules/stake-ankr/Routes';
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
  const { onTrackEnterDelegatedStakingFlow } = useStakeMainScreen();

  const { data: ankrApr, loading: isANKRAprLoading } = useQuery({
    type: getMaxApy,
  });
  const { data: ankrTvl, loading: isANKRTvlLoading } = useQuery({
    type: getTotalTvl,
  });
  const { data: mgnoApr, loading: isMGNOApyLoading } = useQuery({
    type: getMaxApr,
  });
  const { data: mgnoTvl, loading: isMGNOTvlLoading } = useQuery({
    type: getTVL,
  });

  return (
    <Box mb={8}>
      <Typography className={classes.title} variant="h3">
        {t('stake.delegated-staking')}
      </Typography>

      <Features>
        <FeatureItem
          isDelegatedStaking
          isIntegerTvl
          apy={ankrApr?.toNumber() ?? 0}
          iconSlot={<AnkrIcon />}
          isApyLoading={isANKRAprLoading}
          isTvlLoading={isANKRTvlLoading}
          mainHref={AnkrRoutes.stake.generatePath()}
          manageHref={AnkrRoutes.main.generatePath()}
          stakedTvl={ankrTvl ?? undefined}
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
