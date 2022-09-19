import { Box } from '@material-ui/core';

import { t } from 'common';

import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { EmptyState } from 'modules/dashboard/components/EmptyState';
import { StakedTokensTitle } from 'modules/dashboard/components/StakedTokensTitle';
import { Container } from 'uiKit/Container';

import { BridgedAETHCBSC } from './components/BridgedAETHCBSC';
import { BridgedEthBond } from './components/BridgedEthBond';
import { BridgedMaticBond } from './components/BridgedMaticBond';
import { BridgedMaticBondBSC } from './components/BridgedMaticBondBSC';
import { BridgedMaticCertBSC } from './components/BridgedMaticCertBSC';
import { BridgedMaticCertPolygon } from './components/BridgedMaticCertPolygon';
import { MyPortfolio } from './components/MyPortfolio';
import { StakedAAVAXB } from './components/StakedAAVAXB';
import { StakedAAVAXC } from './components/StakedAAVAXC';
import { StakedABNBB } from './components/StakedABNBB';
import { StakedABNBC } from './components/StakedABNBC';
import { StakedADOTB } from './components/StakedADOTB';
import { StakedAETHB } from './components/StakedAETHB';
import { StakedAETHBSC } from './components/StakedAETHBSC';
import { StakedAETHC } from './components/StakedAETHC';
import { StakedAFTMB } from './components/StakedAFTMB';
import { StakedAFTMC } from './components/StakedAFTMC';
import { StakedAKSMB } from './components/StakedAKSMB';
import { StakedAMATICB } from './components/StakedAMATICB';
import { StakedAMATICC } from './components/StakedAMATICC';
import { StakedANKR } from './components/StakedANKR';
import { StakedAWNDB } from './components/StakedAWNDB';
import { StakedMaticCertPolygon } from './components/StakedMaticCertPolygon';
import { StakedMGNO } from './components/StakedMGNO';
import { useStakedTokens } from './components/StakedTokens/hooks/useStakedTokens';
import { UnclaimedDOT } from './components/UnclaimedDOT';
import { UnclaimedETH } from './components/UnclaimedETH';
import { UnclaimedKSM } from './components/UnclaimedKSM';
import { UnclaimedWND } from './components/UnclaimedWND';
import { useDashboard } from './hooks/useDashboard';

export const Dashboard = (): JSX.Element => {
  const { isFirstLoad } = useDashboard();

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
    isLiquidAssetsShowed,
    isWNDShowed,
    isUnclaimedEthShowed,
    isANKRShowed,
    isMGNOShowed,
    isStakedMaticCertPolygonShowed,
  } = useStakedTokens();

  return (
    <Box component="section" py={{ xs: 6, md: 8 }}>
      <Container size="xl">
        {isAssetsShowed || isFirstLoad ? (
          <>
            <MyPortfolio />

            {isDelegateAssetsShowed && (
              <Box mb={7}>
                <StakedTokensTitle>
                  {t('dashboard.delegateAssets')}
                </StakedTokensTitle>

                <AssetsList>
                  {isANKRShowed && <StakedANKR />}

                  {isMGNOShowed && <StakedMGNO />}
                </AssetsList>
              </Box>
            )}

            {isLiquidAssetsShowed && (
              <>
                <StakedTokensTitle>
                  {t('dashboard.liquidAssets')}
                </StakedTokensTitle>

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
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </Container>
    </Box>
  );
};
