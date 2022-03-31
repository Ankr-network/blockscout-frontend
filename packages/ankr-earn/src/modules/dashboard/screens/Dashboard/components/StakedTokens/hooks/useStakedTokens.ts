import { featuresConfig } from 'modules/common/const';

import { useStakedAVAXData } from './AVAX/useStakedAVAXData';
import { useStakedABNBBData } from './BNB/useStakedABNBBData';
import { useStakedABNBCData } from './BNB/useStakedABNBCData';
import { useStakedAETHBData } from './ETH/useStakedAETHBData';
import { useStakedAETHCData } from './ETH/useStakedAETHCData';
import { useStakedAFTMBData } from './FTM/useStakedAFTMBData';
import { useStakedMaticData } from './MATIC/useStakedMaticData';
import { useStakedBridgeAETHBData } from './useStakedBridgeAETHBData';
import { useStakedBridgeMaticData } from './useStakedBridgeMatic';

interface IUseStakedTokensData {
  isAssetsShowed: boolean;
  isAETHBShowed: boolean;
  isAETHCShowed: boolean;
  isAVAXShowed: boolean;
  isABNBBShowed: boolean;
  isABNBCShowed: boolean;
  isMATICShowed: boolean;
  isAMATICBPolygonShowed: boolean;
  isAETHBBridgedShowed: boolean;
  isAFTMBShowed: boolean;
}

export const useStakedTokens = (): IUseStakedTokensData => {
  const amaticbData = useStakedMaticData();
  const amaticbPolygonData = useStakedBridgeMaticData();
  const aethbBridgedData = useStakedBridgeAETHBData();
  const stakedAVAXData = useStakedAVAXData();
  const stakedBNBData = useStakedABNBBData();
  const stakedABNBCData = useStakedABNBCData();

  const stakedAETHBData = useStakedAETHBData();
  const stakedAETHCData = useStakedAETHCData();
  const stakedAFTMBData = useStakedAFTMBData();

  const isAETHBShowed = stakedAETHBData.isShowed;

  const isAETHCShowed = stakedAETHCData.isShowed;

  const isAVAXShowed =
    featuresConfig.isActiveAVAXStaking && stakedAVAXData.isShowed;

  const isABNBBShowed = stakedBNBData.isShowed;

  const isABNBCShowed = featuresConfig.stakeAbnbc && stakedABNBCData.isShowed;

  const isMATICShowed = amaticbData.isShowed;

  const isAMATICBPolygonShowed = amaticbPolygonData.isShowed;

  const isAETHBBridgedShowed = aethbBridgedData.isShowed;

  const isAFTMBShowed = stakedAFTMBData.isShowed;

  const atLeastOneShowed =
    isAETHBShowed ||
    isAETHCShowed ||
    isAVAXShowed ||
    isABNBBShowed ||
    isABNBCShowed ||
    isMATICShowed ||
    isAMATICBPolygonShowed ||
    isAETHBBridgedShowed ||
    isAFTMBShowed;

  return {
    isAssetsShowed: atLeastOneShowed,
    isAETHBShowed,
    isAETHCShowed,
    isAVAXShowed,
    isABNBBShowed,
    isABNBCShowed,
    isMATICShowed,
    isAFTMBShowed,
    isAMATICBPolygonShowed,
    isAETHBBridgedShowed,
  };
};
