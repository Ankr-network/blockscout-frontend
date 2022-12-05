import { t } from '@ankr.com/common';
import { Box, BoxProps } from '@material-ui/core';

import { featuresConfig } from 'modules/common/const';
import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { DashboardCardSkeleton } from 'modules/dashboard/components/DashboardCard';
import { StakedTokensTitle } from 'modules/dashboard/components/StakedTokensTitle';

import { useLiquidStakedTokens } from '../../hooks/liquid-tokens/useLiquidStakedTokens';
import { BridgedAETHCBSC } from '../BridgedAETHCBSC';
import { BridgedEthBond } from '../BridgedEthBond';
import { BridgedMaticBond } from '../BridgedMaticBond';
import { BridgedMaticBondBSC } from '../BridgedMaticBondBSC';
import { BridgedMaticCertBSC } from '../BridgedMaticCertBSC';
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
import { StakedASETHC } from '../StakedASETHC';
import { StakedASUIC } from '../StakedASUIC';
import { StakedAWNDB } from '../StakedAWNDB';
import { StakedAXDCC } from '../StakedAXDCC';
import { StakedMaticCertPolygon } from '../StakedMaticCertPolygon';
import { UnclaimedDOT } from '../UnclaimedDOT';
import { UnclaimedETH } from '../UnclaimedETH';
import { UnclaimedKSM } from '../UnclaimedKSM';
import { UnclaimedWND } from '../UnclaimedWND';

interface ILiquidStakedTokensProps extends BoxProps {}

export const LiquidStakedTokens = (
  boxProps: ILiquidStakedTokensProps,
): JSX.Element => {
  const {
    isUnclaimedDotBondShowed,
    isUnclaimedKsmBondShowed,
    isUnclaimedWndBondShowed,
    isUnclaimedEthBondShowed,
    isStakedEthBondShowed,
    isStakedEthCertShowed,
    isStakedMaticBondEthereumShowed,
    isStakedMaticCertEthereumShowed,
    isStakedMaticCertPolygonShowed,
    isStakedBnbBondShowed,
    isStakedBnbCertShowed,
    isStakedOldAEthShowed,
    isStakedFtmCertShowed,
    isStakedFtmBondShowed,
    isStakedAvaxBondShowed,
    isStakedAvaxCertShowed,
    isStakedDotBondShowed,
    isStakedWndBondShowed,
    isStakedKsmBondShowed,
    isStakedSSVOnETHCertShowed,
    isStakedSuiCertShowed,
    isStakedXDCCertShowed,
    isBridgedEthCertBscShowed,
    isBridgedEthBondBscShowed,
    isBridgedMaticBondPolygonShowed,
    isBridgedMaticBondBscShowed,
    isBridgedMaticCertBscShowed,
    isStakedTokensLoading: isAtLeaseOneLoading,
  } = useLiquidStakedTokens();

  return (
    <Box {...boxProps}>
      <StakedTokensTitle>{t('dashboard.liquidAssets')}</StakedTokensTitle>

      <AssetsList>
        {isUnclaimedEthBondShowed && <UnclaimedETH />}

        {isUnclaimedDotBondShowed && <UnclaimedDOT />}

        {isUnclaimedKsmBondShowed && <UnclaimedKSM />}

        {isUnclaimedWndBondShowed && <UnclaimedWND />}

        {isStakedMaticBondEthereumShowed && <StakedAMATICB />}

        {isStakedMaticCertEthereumShowed && <StakedAMATICC />}

        {isStakedMaticCertPolygonShowed && <StakedMaticCertPolygon />}

        {isStakedEthBondShowed && <StakedAETHB />}

        {isStakedEthCertShowed && <StakedAETHC />}

        {isStakedOldAEthShowed && <StakedAETHBSC />}

        {isStakedBnbBondShowed && <StakedABNBB />}

        {isStakedBnbCertShowed && <StakedABNBC />}

        {isStakedFtmBondShowed && <StakedAFTMB />}

        {isStakedFtmCertShowed && <StakedAFTMC />}

        {isStakedAvaxBondShowed && <StakedAAVAXB />}

        {isStakedAvaxCertShowed && <StakedAAVAXC />}

        {isStakedDotBondShowed && <StakedADOTB />}

        {isStakedKsmBondShowed && <StakedAKSMB />}

        {isStakedWndBondShowed && <StakedAWNDB />}

        {featuresConfig.isSUIStakingActive && isStakedSuiCertShowed && (
          <StakedASUIC />
        )}

        {isBridgedMaticBondPolygonShowed && <BridgedMaticBond />}

        {isBridgedMaticBondBscShowed && <BridgedMaticBondBSC />}

        {isBridgedMaticCertBscShowed && <BridgedMaticCertBSC />}

        {isBridgedEthBondBscShowed && <BridgedEthBond />}

        {isBridgedEthCertBscShowed && <BridgedAETHCBSC />}

        {featuresConfig.ssvStaking && isStakedSSVOnETHCertShowed && (
          <StakedASETHC />
        )}

        {featuresConfig.xdcStaking && isStakedXDCCertShowed && <StakedAXDCC />}

        {isAtLeaseOneLoading && <DashboardCardSkeleton />}
      </AssetsList>
    </Box>
  );
};
