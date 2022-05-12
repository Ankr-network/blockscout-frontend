import { Box, BoxProps, Typography } from '@material-ui/core';

import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { NoAssets } from 'modules/dashboard/components/NoAssets';
import { t } from 'modules/i18n/utils/intl';

import { StakedABNBB } from '../StakedABNBB';
import { StakedABNBC } from '../StakedABNBC';
import { StakedADOTB } from '../StakedADOTB';
import { StakedAETHB } from '../StakedAETHB';
import { StakedAETHC } from '../StakedAETHC';
import { StakedAFTMB } from '../StakedAFTMB';
import { StakedAFTMC } from '../StakedAFTMC';
import { StakedAKSMB } from '../StakedAKSMB';
import { StakedAMATICB } from '../StakedAMATICB';
import { StakedAMATICC } from '../StakedAMATICC';
import { StakedAVAX } from '../StakedAVAX';
import { StakedAWNDB } from '../StakedAWNDB';
import { StakedBridgeAETHB } from '../StakedBridgeAETHB';
import { StakedBridgeAMATICBBSC } from '../StakedBridgeAMATICBBSC';
import { StakedBridgeAMATICCBSC } from '../StakedBridgeAMATICCBSC';
import { StakedBridgeAMATICCPolygon } from '../StakedBridgeAMATICCPolygon';
import { StakedBridgeMatic } from '../StakedBridgeMatic';
import { UnclaimedDOT } from '../UnclaimedDOT';
import { UnclaimedETH } from '../UnclaimedETH';
import { UnclaimedKSM } from '../UnclaimedKSM';
import { UnclaimedWND } from '../UnclaimedWND';

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
    isAFTMCShowed,
    isAMATICBBSCShowed,
    isAMATICCBSCShowed,
    isAMATICCPolygonShowed,
    isAMATICBPolygonShowed,
    isAMATICCShowed,
    isAETHBBridgedShowed,
    isADOTBShowed,
    isAKSMBShowed,
    isAWNDBShowed,
    isDOTShowed,
    isKSMShowed,
    isWNDShowed,
    isUnclaimedEthShowed,
  } = useStakedTokens();

  return (
    <Box {...props}>
      {isAssetsShowed ? (
        <>
          <Typography className={classes.title} variant="h3">
            {t('dashboard.assets')}
          </Typography>

          <AssetsList>
            {isUnclaimedEthShowed && <UnclaimedETH />}

            {isDOTShowed && <UnclaimedDOT />}

            {isKSMShowed && <UnclaimedKSM />}

            {isWNDShowed && <UnclaimedWND />}

            {isMATICShowed && <StakedAMATICB />}

            {isAMATICBPolygonShowed && <StakedBridgeMatic />}

            {isAMATICBBSCShowed && <StakedBridgeAMATICBBSC />}

            {isAMATICCBSCShowed && <StakedBridgeAMATICCBSC />}

            {isAMATICCPolygonShowed && <StakedBridgeAMATICCPolygon />}

            {isAMATICCShowed && <StakedAMATICC />}

            {isAETHBBridgedShowed && <StakedBridgeAETHB />}

            {isAETHBShowed && <StakedAETHB />}

            {isAETHCShowed && <StakedAETHC />}

            {isABNBBShowed && <StakedABNBB />}

            {isABNBCShowed && <StakedABNBC />}

            {isAFTMBShowed && <StakedAFTMB />}

            {isAFTMCShowed && <StakedAFTMC />}

            {isAVAXShowed && <StakedAVAX />}

            {isADOTBShowed && <StakedADOTB />}

            {isAKSMBShowed && <StakedAKSMB />}

            {isAWNDBShowed && <StakedAWNDB />}
          </AssetsList>
        </>
      ) : (
        <NoAssets />
      )}
    </Box>
  );
};
