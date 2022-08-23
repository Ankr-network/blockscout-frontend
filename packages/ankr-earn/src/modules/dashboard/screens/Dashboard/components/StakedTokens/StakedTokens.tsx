import { Box, BoxProps, Typography } from '@material-ui/core';

import { t } from 'common';

import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { NoAssets } from 'modules/dashboard/components/NoAssets';

import { BridgedAETHCBSC } from '../BridgedAETHCBSC';
import { BridgedEthBond } from '../BridgedEthBond';
import { BridgedMaticBond } from '../BridgedMaticBond';
import { BridgedMaticBondBSC } from '../BridgedMaticBondBSC';
import { BridgedMaticCertBSC } from '../BridgedMaticCertBSC';
import { BridgedMaticCertPolygon } from '../BridgedMaticCertPolygon';
import { StakedAAVAXB } from '../StakedAAVAXB';
import { StakedAAVAXC } from '../StakedAAVAXC';
import { StakedABNBB } from '../StakedABNBB';
import { StakedABNBC } from '../StakedABNBC';
import { StakedADOTB } from '../StakedADOTB';
import { StakedAETHB } from '../StakedAETHB';
import { StakedAETHBSC } from '../StakedAETHBSC';
import { StakedAETHC } from '../StakedAETHC';
import { StakedAFTMB } from '../StakedAFTMB';
import { StakedAFTMC } from '../StakedAFTMC';
import { StakedAKSMB } from '../StakedAKSMB';
import { StakedAMATICB } from '../StakedAMATICB';
import { StakedAMATICC } from '../StakedAMATICC';
import { StakedANKR } from '../StakedANKR';
import { StakedAWNDB } from '../StakedAWNDB';
import { StakedMaticCertPolygon } from '../StakedMaticCertPolygon';
import { StakedMGNO } from '../StakedMGNO';
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
    isDelegateAssetsShowed,
    isAETHBShowed,
    isAETHCShowed,
    isAETHCBridgedShowed,
    isAAVAXBShowed,
    isAAVAXCShowed,
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
    isAETHBSCShowed,
    isADOTBShowed,
    isAKSMBShowed,
    isAWNDBShowed,
    isDOTShowed,
    isKSMShowed,
    isWNDShowed,
    isUnclaimedEthShowed,
    isANKRShowed,
    isMGNOShowed,
    isStakedMaticCertPolygonShowed,
  } = useStakedTokens();

  return (
    <Box {...props}>
      {isAssetsShowed ? (
        <>
          {isDelegateAssetsShowed && (
            <Box mb={7}>
              <Typography className={classes.title} variant="h3">
                {t('dashboard.delegateAssets')}
              </Typography>

              <AssetsList>
                {isANKRShowed && <StakedANKR />}

                {isMGNOShowed && <StakedMGNO />}
              </AssetsList>
            </Box>
          )}

          <Typography className={classes.title} variant="h3">
            {t('dashboard.liquidAssets')}
          </Typography>

          <AssetsList>
            {isUnclaimedEthShowed && <UnclaimedETH />}

            {isDOTShowed && <UnclaimedDOT />}

            {isKSMShowed && <UnclaimedKSM />}

            {isWNDShowed && <UnclaimedWND />}

            {isMATICShowed && <StakedAMATICB />}

            {isAMATICCShowed && <StakedAMATICC />}

            {isStakedMaticCertPolygonShowed && <StakedMaticCertPolygon />}

            {isAETHBShowed && <StakedAETHB />}

            {isAETHCShowed && <StakedAETHC />}

            {isAETHBSCShowed && <StakedAETHBSC />}

            {isABNBBShowed && <StakedABNBB />}

            {isABNBCShowed && <StakedABNBC />}

            {isAFTMBShowed && <StakedAFTMB />}

            {isAFTMCShowed && <StakedAFTMC />}

            {isAAVAXBShowed && <StakedAAVAXB />}

            {isAAVAXCShowed && <StakedAAVAXC />}

            {isADOTBShowed && <StakedADOTB />}

            {isAKSMBShowed && <StakedAKSMB />}

            {isAWNDBShowed && <StakedAWNDB />}

            {isAMATICBPolygonShowed && <BridgedMaticBond />}

            {isAMATICBBSCShowed && <BridgedMaticBondBSC />}

            {isAMATICCBSCShowed && <BridgedMaticCertBSC />}

            {isAMATICCPolygonShowed && <BridgedMaticCertPolygon />}

            {isAETHBBridgedShowed && <BridgedEthBond />}

            {isAETHCBridgedShowed && <BridgedAETHCBSC />}
          </AssetsList>
        </>
      ) : (
        <NoAssets />
      )}
    </Box>
  );
};
