import { featuresConfig } from 'modules/common/const';

import { DOT_PROPS, KSM_PROPS, WND_PROPS } from '../../../const';
import { useClaimedPolkadotData } from '../../ClaimedTokens/hooks/Polkadot/useClaimedPolkadotData';

import { useStakedAVAXData } from './AVAX/useStakedAVAXData';
import { useStakedABNBBData } from './BNB/useStakedABNBBData';
import { useStakedABNBCData } from './BNB/useStakedABNBCData';
import { useStakedAETHBData } from './ETH/useStakedAETHBData';
import { useStakedAETHCData } from './ETH/useStakedAETHCData';
import { useStakedBridgeAETHBData } from './ETH/useStakedBridgeAETHBData';
import { useStakedAFTMBData } from './FTM/useStakedAFTMBData';
import { useStakedBridgeBSCMaticData } from './MATIC/useStakedBridgeBSCMatic';
import { useStakedBridgeMaticData } from './MATIC/useStakedBridgeMatic';
import { useStakedMaticData } from './MATIC/useStakedMaticData';
import { useStakedPolkadotData } from './Polkadot/useStakedPolkadotData';

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
  isAETHBBridgedShowed: boolean;
  isAFTMBShowed: boolean;
  isADOTBShowed: boolean;
  isAKSMBShowed: boolean;
  isAWNDBShowed: boolean;
  isDOTShowed: boolean;
  isKSMShowed: boolean;
  isWNDShowed: boolean;
}

export const useStakedTokens = (): IUseStakedTokensData => {
  const amaticbData = useStakedMaticData();
  const amaticbPolygonData = useStakedBridgeMaticData();
  const amaticbBSCData = useStakedBridgeBSCMaticData();
  const aethbBridgedData = useStakedBridgeAETHBData();
  const stakedAVAXData = useStakedAVAXData();
  const stakedBNBData = useStakedABNBBData();
  const stakedABNBCData = useStakedABNBCData();

  const stakedAETHBData = useStakedAETHBData();
  const stakedAETHCData = useStakedAETHCData();
  const stakedAFTMBData = useStakedAFTMBData();

  const claimedDOTData = useClaimedPolkadotData(DOT_PROPS);
  const stakedADOTBData = useStakedPolkadotData(DOT_PROPS);

  const claimedKSMData = useClaimedPolkadotData(KSM_PROPS);
  const stakedAKSMBData = useStakedPolkadotData(KSM_PROPS);

  const claimedWNDData = useClaimedPolkadotData(WND_PROPS);
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

  const isAETHBBridgedShowed = aethbBridgedData.isShowed;

  const isAFTMBShowed = stakedAFTMBData.isShowed;

  const isADOTBShowed = stakedADOTBData.isShowed;
  const isDOTShowed = claimedDOTData.isShowed;

  const isAKSMBShowed = stakedAKSMBData.isShowed;
  const isKSMShowed = claimedKSMData.isShowed;

  const isAWNDBShowed = stakedAWNDBData.isShowed;
  const isWNDShowed = claimedWNDData.isShowed;

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
    isADOTBShowed ||
    isDOTShowed ||
    isAKSMBShowed ||
    isKSMShowed ||
    isAWNDBShowed ||
    isWNDShowed;

  return {
    isAssetsShowed: atLeastOneShowed,
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
  };
};
