import { DOT_PROPS, KSM_PROPS, WND_PROPS } from '../const';

import { useStakedANKRData } from './ANKR/useStakedANKRData';
import { useStakedAAVAXBData } from './AVAX/useStakedAAVAXBData';
import { useStakedAAVAXCData } from './AVAX/useStakedAAVAXCData';
import { useStakedABNBBData } from './BNB/useStakedABNBBData';
import { useStakedABNBCData } from './BNB/useStakedABNBCData';
import { useStakedAETHBData } from './ETH/useStakedAETHBData';
import { useStakedAETHCData } from './ETH/useStakedAETHCData';
import { useStakedBridgeAETHBData } from './ETH/useStakedBridgeAETHBData';
import { useUnclaimedEth } from './ETH/useUnclaimedEth';
import { useStakedAFTMBData } from './FTM/useStakedAFTMBData';
import { useStakedAFTMCData } from './FTM/useStakedAFTMCData';
import { useBridgedMaticBond } from './MATIC/useBridgedMaticBond';
import { useBridgedMaticBondBSC } from './MATIC/useBridgedMaticBondBSC';
import { useBridgedMaticCertBSC } from './MATIC/useBridgedMaticCertBSC';
import { useBridgedMaticCertPolygon } from './MATIC/useBridgedMaticCertPolygon';
import { useStakedAMATICBData } from './MATIC/useStakedAMATICBData';
import { useStakedAMATICCData } from './MATIC/useStakedAMATICCData';
import { useStakedPolkadotData } from './Polkadot/useStakedPolkadotData';
import { useUnclaimedPolkadotData } from './Polkadot/useUnclaimedPolkadotData';

interface IUseStakedTokensData {
  isAssetsShowed: boolean;
  isAETHBShowed: boolean;
  isAETHCShowed: boolean;
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
}

export const useStakedTokens = (): IUseStakedTokensData => {
  const amaticbData = useStakedAMATICBData();
  const amaticbPolygonData = useBridgedMaticBond();
  const amaticbBSCData = useBridgedMaticBondBSC();
  const amaticcBSCData = useBridgedMaticCertBSC();
  const amaticcPolygonData = useBridgedMaticCertPolygon();
  const stakedAMATICCData = useStakedAMATICCData();
  const aethbBridgedData = useStakedBridgeAETHBData();
  const stakedAAVAXBData = useStakedAAVAXBData();
  const stakedAAVAXCData = useStakedAAVAXCData();
  const stakedBNBData = useStakedABNBBData();
  const stakedABNBCData = useStakedABNBCData();
  const stakedAETHBData = useStakedAETHBData();
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

  const isAETHBShowed = stakedAETHBData.isShowed;

  const isAETHCShowed = stakedAETHCData.isShowed;

  const isAAVAXBShowed = stakedAAVAXBData.isShowed;

  const isAAVAXCShowed = stakedAAVAXCData.isShowed;

  const isABNBBShowed = stakedBNBData.isShowed;

  const isABNBCShowed = stakedABNBCData.isShowed;

  const isMATICShowed = amaticbData.isShowed;

  const isAMATICBPolygonShowed = amaticbPolygonData.isShowed;

  const isAMATICBBSCShowed = amaticbBSCData.isShowed;
  const isAMATICCShowed = stakedAMATICCData.isShowed;
  const isAMATICCBSCShowed = amaticcBSCData.isShowed;
  const isAMATICCPolygonShowed = amaticcPolygonData.isShowed;

  const isAETHBBridgedShowed = aethbBridgedData.isShowed;

  const isAFTMBShowed = stakedAFTMBData.isShowed;
  const isAFTMCShowed = stakedAFTMCData.isShowed;

  const isADOTBShowed = stakedADOTBData.isShowed;
  const isDOTShowed = claimedDOTData.isShowed;

  const isAKSMBShowed = stakedAKSMBData.isShowed;
  const isKSMShowed = claimedKSMData.isShowed;

  const isAWNDBShowed = stakedAWNDBData.isShowed;
  const isWNDShowed = claimedWNDData.isShowed;

  const isUnclaimedEthShowed = unclaimedEthData.isShowed;

  const isANKRShowed = stakedANKRData.isShowed;

  const atLeastOneShowed =
    isAETHBShowed ||
    isAETHCShowed ||
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
    isAFTMBShowed ||
    isAFTMCShowed ||
    isADOTBShowed ||
    isDOTShowed ||
    isAKSMBShowed ||
    isKSMShowed ||
    isAWNDBShowed ||
    isWNDShowed ||
    isUnclaimedEthShowed ||
    isANKRShowed;

  return {
    isAssetsShowed: atLeastOneShowed,
    isAETHBShowed,
    isAETHCShowed,
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
  };
};
