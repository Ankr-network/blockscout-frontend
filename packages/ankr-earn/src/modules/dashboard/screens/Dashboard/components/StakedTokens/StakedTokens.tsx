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
import { StakedAETHC } from '../StakedAETHC';
import { StakedAFTMB } from '../StakedAFTMB';
import { StakedAFTMC } from '../StakedAFTMC';
import { StakedAKSMB } from '../StakedAKSMB';
import { StakedAMATICB } from '../StakedAMATICB';
import { StakedAMATICC } from '../StakedAMATICC';
import { StakedANKR } from '../StakedANKR';
import { StakedAWNDB } from '../StakedAWNDB';
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
    isADOTBShowed,
    isAKSMBShowed,
    isAWNDBShowed,
    isDOTShowed,
    isKSMShowed,
    isWNDShowed,
    isUnclaimedEthShowed,
    isANKRShowed,
  } = useStakedTokens();

  return (
    <Box {...props}>
      {isAssetsShowed ? (
        <>
          <Typography className={classes.title} variant="h3">
            {t('dashboard.assets')}
          </Typography>

          <AssetsList>
            {isANKRShowed && <StakedANKR />}

            {isUnclaimedEthShowed && <UnclaimedETH />}

            {isDOTShowed && <UnclaimedDOT />}

            {isKSMShowed && <UnclaimedKSM />}

            {isWNDShowed && <UnclaimedWND />}

            {isMATICShowed && <StakedAMATICB />}

            {isAMATICBPolygonShowed && <BridgedMaticBond />}

            {isAMATICBBSCShowed && <BridgedMaticBondBSC />}

            {isAMATICCBSCShowed && <BridgedMaticCertBSC />}

            {isAMATICCPolygonShowed && <BridgedMaticCertPolygon />}

            {isAMATICCShowed && <StakedAMATICC />}

            {isAETHBBridgedShowed && <BridgedEthBond />}

            {isAETHCBridgedShowed && <BridgedAETHCBSC />}

            {isAETHBShowed && <StakedAETHB />}

            {isAETHCShowed && <StakedAETHC />}

            {isABNBBShowed && <StakedABNBB />}

            {isABNBCShowed && <StakedABNBC />}

            {isAFTMBShowed && <StakedAFTMB />}

            {isAFTMCShowed && <StakedAFTMC />}

            {isAAVAXBShowed && <StakedAAVAXB />}

            {isAAVAXCShowed && <StakedAAVAXC />}

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
