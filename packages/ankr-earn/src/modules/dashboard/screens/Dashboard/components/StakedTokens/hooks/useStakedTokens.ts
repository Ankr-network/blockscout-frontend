import { featuresConfig } from 'modules/common/const';

import { DOT_PROPS, KSM_PROPS, WND_PROPS } from '../const';

import { useStakedAVAXData } from './AVAX/useStakedAVAXData';
import { useStakedABNBBData } from './BNB/useStakedABNBBData';
import { useStakedABNBCData } from './BNB/useStakedABNBCData';
import { useStakedAETHBData } from './ETH/useStakedAETHBData';
import { useStakedAETHCData } from './ETH/useStakedAETHCData';
import { useStakedBridgeAETHBData } from './ETH/useStakedBridgeAETHBData';
import { useUnclaimedEth } from './ETH/useUnclaimedEth';
import { useStakedAFTMBData } from './FTM/useStakedAFTMBData';
import { useStakedAFTMCData } from './FTM/useStakedAFTMCData';
import { useStakedAMATICBData } from './MATIC/useStakedAMATICBData';
import { useStakedAMATICCData } from './MATIC/useStakedAMATICCData';
import { useStakedBridgeBSCMaticData } from './MATIC/useStakedBridgeBSCMatic';
import { useStakedBridgeMaticData } from './MATIC/useStakedBridgeMatic';
import { useStakedPolkadotData } from './Polkadot/useStakedPolkadotData';
import { useUnclaimedPolkadotData } from './Polkadot/useUnclaimedPolkadotData';

interface IUseStakedTokensData {
  isAssetsShowed: boolean;
  isAETHBShowed: boolean;
  isAETHCShowed: boolean;
  isAVAXShowed: boolean;
  isABNBBShowed: boolean;
  isABNBCShowed: boolean;
  isMATICShowed: boolean;
  isAMATICBPolygonShowed: boolean;
  isAMATICBBSCShowed: boolean;
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
}

export const useStakedTokens = (): IUseStakedTokensData => {
  const amaticbData = useStakedAMATICBData();
  const amaticbPolygonData = useStakedBridgeMaticData();
  const amaticbBSCData = useStakedBridgeBSCMaticData();
  const stakedAMATICCData = useStakedAMATICCData();
  const aethbBridgedData = useStakedBridgeAETHBData();
  const stakedAVAXData = useStakedAVAXData();
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

  const isAETHBShowed = stakedAETHBData.isShowed;

  const isAETHCShowed = stakedAETHCData.isShowed;

  const isAVAXShowed =
    featuresConfig.isActiveAVAXStaking && stakedAVAXData.isShowed;

  const isABNBBShowed = stakedBNBData.isShowed;

  const isABNBCShowed = featuresConfig.stakeAbnbc && stakedABNBCData.isShowed;

  const isMATICShowed = amaticbData.isShowed;

  const isAMATICBPolygonShowed = amaticbPolygonData.isShowed;

  const isAMATICBBSCShowed = amaticbBSCData.isShowed;
  const isAMATICCShowed = stakedAMATICCData.isShowed;

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

  const atLeastOneShowed =
    isAETHBShowed ||
    isAETHCShowed ||
    isAVAXShowed ||
    isABNBBShowed ||
    isABNBCShowed ||
    isMATICShowed ||
    isAMATICBPolygonShowed ||
    isAMATICBBSCShowed ||
    isAETHBBridgedShowed ||
    isAFTMBShowed ||
    isAFTMCShowed ||
    isADOTBShowed ||
    isDOTShowed ||
    isAKSMBShowed ||
    isKSMShowed ||
    isAWNDBShowed ||
    isWNDShowed ||
    isUnclaimedEthShowed;

  return {
    isAssetsShowed: atLeastOneShowed,
    isAETHBShowed,
    isAETHCShowed,
    isAVAXShowed,
    isABNBBShowed,
    isABNBCShowed,
    isMATICShowed,
    isAFTMBShowed,
    isAFTMCShowed,
    isAMATICBBSCShowed,
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
  };
};
