import { Box, BoxProps, Typography } from '@material-ui/core';

import { featuresConfig } from 'modules/common/const';
import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { NoAssets } from 'modules/dashboard/components/NoAssets';
import { t } from 'modules/i18n/utils/intl';
import { ABNBBCard } from '../ABNBBCard';
import { AMATICBCard } from '../AMATICBCard';
import { StakedAETHB } from '../StakedAETHB';
import { StakedAETHC } from '../StakedAETHC';
import { StakedBNB } from '../StakedBNB';
import { StakedMatic } from '../StakedMatic';
import { useStakedTokensStyles } from './useStakedTokensStyles';
import { useMaticTxHistory } from '../AMATICBCard/useMaticTxHistory';
import { useAMATICBCard } from '../AMATICBCard/useAMATICBCard';

export const StakedTokens = (props: BoxProps) => {
  const classes = useStakedTokensStyles();
  const MATICTxHistory = useMaticTxHistory();
  const { isShowed } = useAMATICBCard(MATICTxHistory.hasHistory);

  return (
    <Box {...props}>
      <Typography className={classes.title} variant="h3">
        {t('dashboard.assets')}
      </Typography>

      {featuresConfig.eth2Swap && (
        <AssetsList noChildrenSlot={<NoAssets />}>
          <StakedMatic />
          <StakedAETHB />
          <StakedAETHC />

          {featuresConfig.isActiveBNBStaking && <StakedBNB />}
        </AssetsList>
      )}

      {!featuresConfig.eth2Swap && (
        <>
          {isShowed ? (
            <AssetsList>
              <AMATICBCard />
              {featuresConfig.isActiveBNBStaking && <ABNBBCard />}
            </AssetsList>
          ) : (
            <NoAssets />
          )}
        </>
      )}
    </Box>
  );
};
