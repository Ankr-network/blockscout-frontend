import { featuresConfig } from 'modules/common/const';

import { DOT_PROPS, KSM_PROPS, WND_PROPS } from '../const';

import { useStakedANKRData } from './ANKR/useStakedANKRData';
import { useStakedAAVAXBData } from './AVAX/useStakedAAVAXBData';
import { useStakedAAVAXCData } from './AVAX/useStakedAAVAXCData';
import { useStakedABNBBData } from './BNB/useStakedABNBBData';
import { useStakedABNBCData } from './BNB/useStakedABNBCData';
import { useStakedAETHBData } from './ETH/useStakedAETHBData';
import { useStakedAETHBSCData } from './ETH/useStakedAETHBSCData';
import { useStakedAETHCData } from './ETH/useStakedAETHCData';
import { useStakedBridgeAETHBData } from './ETH/useStakedBridgeAETHBData';
import { useStakedBridgeAETHCData } from './ETH/useStakedBridgeAETHCData';
import { useUnclaimedEth } from './ETH/useUnclaimedEth';
import { useStakedAFTMBData } from './FTM/useStakedAFTMBData';
import { useStakedAFTMCData } from './FTM/useStakedAFTMCData';
import { useBridgedMaticBond } from './MATIC/useBridgedMaticBond';
import { useBridgedMaticBondBSC } from './MATIC/useBridgedMaticBondBSC';
import { useBridgedMaticCertBSC } from './MATIC/useBridgedMaticCertBSC';
import { useBridgedMaticCertPolygon } from './MATIC/useBridgedMaticCertPolygon';
import { useStakedAMATICBData } from './MATIC/useStakedAMATICBData';
import { useStakedAMATICCData } from './MATIC/useStakedAMATICCData';
import { useStakedMaticCertPolygon } from './MATIC/useStakedMaticCertPolygon';
import { useStakedMGNOData } from './MGNO/useStakedMGNOData';
import { useStakedPolkadotData } from './Polkadot/useStakedPolkadotData';
import { useUnclaimedPolkadotData } from './Polkadot/useUnclaimedPolkadotData';

interface IUseStakedTokensData {
  isAssetsShowed: boolean;
  isDelegateAssetsShowed: boolean;
  isAETHBShowed: boolean;
  isAETHCShowed: boolean;
  isAETHBSCShowed: boolean;
  isAAVAXBShowed: boolean;
  isAAVAXCShowed: boolean;
  isABNBBShowed: boolean;
  isABNBCShowed: boolean;
  isMATICShowed: boolean;
  isAMATICBPolygonShowed: boolean;
  isAMATICBBSCShowed: boolean;
  isAMATICCBSCShowed: boolean;
  isAMATICCPolygonShowed: boolean;
  isAMATICCShowed: boolean;
  isAETHBBridgedShowed: boolean;
  isAETHCBridgedShowed: boolean;
  isAFTMBShowed: boolean;
  isAFTMCShowed: boolean;
  isADOTBShowed: boolean;
  isAKSMBShowed: boolean;
  isAWNDBShowed: boolean;
  isDOTShowed: boolean;
  isKSMShowed: boolean;
  isWNDShowed: boolean;
  isUnclaimedEthShowed: boolean;
  isANKRShowed: boolean;
  isMGNOShowed: boolean;
  isStakedMaticCertPolygonShowed: boolean;
}

export const useStakedTokens = (): IUseStakedTokensData => {
  const amaticbData = useStakedAMATICBData();
  const amaticbPolygonData = useBridgedMaticBond();
  const amaticbBSCData = useBridgedMaticBondBSC();
  const amaticcBSCData = useBridgedMaticCertBSC();
  const amaticcPolygonData = useBridgedMaticCertPolygon();
  const stakedAMATICCData = useStakedAMATICCData();
  const aethbBridgedData = useStakedBridgeAETHBData();
  const aethcBridgedData = useStakedBridgeAETHCData();
  const stakedAAVAXBData = useStakedAAVAXBData();
  const stakedAAVAXCData = useStakedAAVAXCData();
  const stakedBNBData = useStakedABNBBData();
  const stakedABNBCData = useStakedABNBCData();
  const stakedAETHBData = useStakedAETHBData();
  const stakedAETHBSCData = useStakedAETHBSCData();
  const stakedAETHCData = useStakedAETHCData();
  const stakedAFTMBData = useStakedAFTMBData();
  const stakedAFTMCData = useStakedAFTMCData();
  const unclaimedEthData = useUnclaimedEth();

  const claimedDOTData = useUnclaimedPolkadotData(DOT_PROPS);
  const stakedADOTBData = useStakedPolkadotData(DOT_PROPS);

  const claimedKSMData = useUnclaimedPolkadotData(KSM_PROPS);
  const stakedAKSMBData = useStakedPolkadotData(KSM_PROPS);

  const claimedWNDData = useUnclaimedPolkadotData(WND_PROPS);
  const stakedAWNDBData = useStakedPolkadotData(WND_PROPS);

  const stakedANKRData = useStakedANKRData();

  const stakedMGNOData = useStakedMGNOData();
  const stakedMaticCertPolygon = useStakedMaticCertPolygon();

  const isAETHBShowed = stakedAETHBData.isShowed;

  const isAETHCShowed = stakedAETHCData.isShowed;

  const isAETHBSCShowed = stakedAETHBSCData.isShowed;

  const isAAVAXBShowed = stakedAAVAXBData.isShowed;

  const isAAVAXCShowed = stakedAAVAXCData.isShowed;

  const isABNBBShowed = stakedBNBData.isShowed;

  const isABNBCShowed = stakedABNBCData.isShowed;

  const isMATICShowed = amaticbData.isShowed;

  const isAMATICBPolygonShowed = amaticbPolygonData.isShowed;

  const isAMATICBBSCShowed = amaticbBSCData.isShowed;
  const isAMATICCShowed = stakedAMATICCData.isShowed;
  const isAMATICCBSCShowed = amaticcBSCData.isShowed;
  const isAMATICCPolygonShowed =
    !featuresConfig.maticPolygonStaking && amaticcPolygonData.isShowed;

  const isAETHBBridgedShowed = aethbBridgedData.isShowed;
  const isAETHCBridgedShowed = aethcBridgedData.isShowed;

  const isAFTMBShowed = stakedAFTMBData.isShowed;
  const isAFTMCShowed = stakedAFTMCData.isShowed;

  const isADOTBShowed = stakedADOTBData.isShowed;
  const isDOTShowed = claimedDOTData.isShowed;

  const isAKSMBShowed = stakedAKSMBData.isShowed;
  const isKSMShowed = claimedKSMData.isShowed;

  const isAWNDBShowed = stakedAWNDBData.isShowed;
  const isWNDShowed = claimedWNDData.isShowed;

  const isUnclaimedEthShowed = unclaimedEthData.isShowed;

  const isANKRShowed = featuresConfig.ankrStaking && stakedANKRData.isShowed;

  const isMGNOShowed = featuresConfig.mgnoStaking && stakedMGNOData.isShowed;

  const isStakedMaticCertPolygonShowed =
    featuresConfig.maticPolygonStaking && stakedMaticCertPolygon.isShowed;

  const atLeastOneShowed =
    isAETHBShowed ||
    isAETHCShowed ||
    isAETHBSCShowed ||
    isAAVAXBShowed ||
    isAAVAXCShowed ||
    isABNBBShowed ||
    isABNBCShowed ||
    isMATICShowed ||
    isAMATICCShowed ||
    isAMATICBPolygonShowed ||
    isAMATICBBSCShowed ||
    isAMATICCBSCShowed ||
    isAMATICCPolygonShowed ||
    isAETHBBridgedShowed ||
    isAETHCBridgedShowed ||
    isAFTMBShowed ||
    isAFTMCShowed ||
    isADOTBShowed ||
    isDOTShowed ||
    isAKSMBShowed ||
    isKSMShowed ||
    isAWNDBShowed ||
    isWNDShowed ||
    isUnclaimedEthShowed ||
    isANKRShowed ||
    isMGNOShowed ||
    isStakedMaticCertPolygonShowed;

  const isDelegateAssetsShowed = isANKRShowed || isMGNOShowed;

  return {
    isAssetsShowed: atLeastOneShowed,
    isDelegateAssetsShowed,
    isAETHBShowed,
    isAETHCShowed,
    isAETHBSCShowed,
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
    isAETHCBridgedShowed,
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
  };
};
