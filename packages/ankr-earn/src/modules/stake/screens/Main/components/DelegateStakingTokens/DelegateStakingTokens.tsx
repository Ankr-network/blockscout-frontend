import { Box, Typography } from '@material-ui/core';

import { t } from 'common';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { RoutesConfig as AnkrRoutes } from 'modules/stake-ankr/Routes';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';

import { FeatureItem } from '../FeatureItem';
import { Features } from '../Features';

import { useDelegateStakingTokensStyles } from './useDelegateStakingTokensStyles';

export const DelegateStakingTokens = (): JSX.Element => {
  const classes = useDelegateStakingTokensStyles();

  return (
    <Box mb={8}>
      <Typography className={classes.title} variant="h3">
        {t('stake.delegate-staking')}
      </Typography>

      <Features>
        <FeatureItem
          apy={0}
          iconSlot={<AnkrIcon />}
          mainHref={AnkrRoutes.stake.generatePath()}
          manageHref={AnkrRoutes.main.generatePath()}
          stakedTvl={ZERO}
          title={t('features.ankr')}
          token={Token.ANKR}
        />
      </Features>
    </Box>
  );
};
