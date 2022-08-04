import { Box, Typography } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';

import { t } from 'common';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { RoutesConfig as AnkrRoutes } from 'modules/stake-ankr/Routes';
import { RoutesConfig as MgnoRoutes } from 'modules/stake-mgno/Routes';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';
import { MGNOIcon } from 'uiKit/Icons/MGNOIcon';

import { FeatureItem } from '../FeatureItem';
import { Features } from '../Features';

import { useDelegateStakingTokensStyles } from './useDelegateStakingTokensStyles';

export const DelegateStakingTokens = (): JSX.Element => {
  const classes = useDelegateStakingTokensStyles();

  const { data: ankrAPY } = useQuery({
    type: getAPY,
  });

  return (
    <Box mb={8}>
      <Typography className={classes.title} variant="h3">
        {t('stake.delegate-staking')}
      </Typography>

      <Features>
        <FeatureItem
          apy={ankrAPY?.toNumber() ?? 0}
          iconSlot={<AnkrIcon />}
          mainHref={AnkrRoutes.stake.generatePath()}
          manageHref={AnkrRoutes.main.generatePath()}
          stakedTvl={ZERO}
          title={t('features.ankr')}
          token={Token.ANKR}
        />

        <FeatureItem
          apy={0}
          iconSlot={<MGNOIcon />}
          mainHref={MgnoRoutes.stake.generatePath()}
          manageHref={MgnoRoutes.main.generatePath()}
          stakedTvl={ZERO}
          title={t('features.mgno')}
          token={Token.mGNO}
        />
      </Features>
    </Box>
  );
};
