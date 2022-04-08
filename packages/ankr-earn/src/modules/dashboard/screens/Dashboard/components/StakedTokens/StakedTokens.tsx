import { Box, BoxProps, Typography } from '@material-ui/core';

import { featuresConfig } from 'modules/common/const';
import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { NoAssets } from 'modules/dashboard/components/NoAssets';
import { t } from 'modules/i18n/utils/intl';

import { ClaimedDOT } from '../ClaimedDOT';
import { ClaimedKSM } from '../ClaimedKSM';
import { ClaimedWND } from '../ClaimedWND';
import { StakedABNBB } from '../StakedABNBB';
import { StakedABNBC } from '../StakedABNBC';
import { StakedADOTB } from '../StakedADOTB';
import { StakedAETHB } from '../StakedAETHB';
import { StakedAETHC } from '../StakedAETHC';
import { StakedAFTMB } from '../StakedAFTMB';
import { StakedAKSMB } from '../StakedAKSMB';
import { StakedAVAX } from '../StakedAVAX';
import { StakedAWNDB } from '../StakedAWNDB';
import { StakedBridgeAETHB } from '../StakedBridgeAETHB/StakedBridgeAETHB';
import { StakedBridgeAMATICBBSC } from '../StakedBridgeAMATICBBSC/StakedBridgeAMATICBBSC';
import { StakedBridgeMatic } from '../StakedBridgeMatic/StakedBridgeToken';
import { StakedMatic } from '../StakedMatic';

import { useStakedTokens } from './hooks/useStakedTokens';
import { useStakedTokensStyles } from './useStakedTokensStyles';

export const StakedTokens = (props: BoxProps): JSX.Element => {
  const classes = useStakedTokensStyles();

  const {
    isAssetsShowed,
    isAETHBShowed,
    isAETHCShowed,
    isAVAXShowed,
    isABNBBShowed,
    isABNBCShowed,
    isMATICShowed,
    isAFTMBShowed,
    isAMATICBBSCShowed,
    isAMATICBPolygonShowed,
    isAETHBBridgedShowed,
    isADOTBShowed,
    isAKSMBShowed,
    isAWNDBShowed,
    isDOTShowed,
    isKSMShowed,
    isWNDShowed,
  } = useStakedTokens();

  return (
    <Box {...props}>
      {isAssetsShowed ? (
        <>
          <Typography className={classes.title} variant="h3">
            {t('dashboard.assets')}
          </Typography>

          <AssetsList>
            {featuresConfig.isActivePolkadotStaking && isDOTShowed && (
              <ClaimedDOT />
            )}

            {featuresConfig.isActivePolkadotStaking && isKSMShowed && (
              <ClaimedKSM />
            )}

            {featuresConfig.isActivePolkadotStaking && isWNDShowed && (
              <ClaimedWND />
            )}

            {isMATICShowed && <StakedMatic />}

            {isAMATICBPolygonShowed && <StakedBridgeMatic />}

            {isAMATICBBSCShowed && <StakedBridgeAMATICBBSC />}

            {isAETHBBridgedShowed && <StakedBridgeAETHB />}

            {isAETHBShowed && <StakedAETHB />}

            {isAETHCShowed && <StakedAETHC />}

            {isABNBBShowed && <StakedABNBB />}

            {isABNBCShowed && <StakedABNBC />}

            {isAFTMBShowed && <StakedAFTMB />}

            {isAVAXShowed && <StakedAVAX />}

            {featuresConfig.isActivePolkadotStaking && isADOTBShowed && (
              <StakedADOTB />
            )}

            {featuresConfig.isActivePolkadotStaking && isAKSMBShowed && (
              <StakedAKSMB />
            )}

            {featuresConfig.isActivePolkadotStaking && isAWNDBShowed && (
              <StakedAWNDB />
            )}
          </AssetsList>
        </>
      ) : (
        <NoAssets />
      )}
    </Box>
  );
};
