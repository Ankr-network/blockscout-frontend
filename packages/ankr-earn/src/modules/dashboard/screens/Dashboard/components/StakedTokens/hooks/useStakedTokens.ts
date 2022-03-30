import { featuresConfig } from 'modules/common/const';

import { useStakedABNBBData } from './useStakedABNBBData';
import { useStakedABNBCData } from './useStakedABNBCData';
import { useStakedAETHBData } from './useStakedAETHBData';
import { useStakedAETHCData } from './useStakedAETHCData';
import { useStakedAFTMBData } from './useStakedAFTMBData';
import { useStakedAVAXData } from './useStakedAVAXData';
import { useStakedBridgeMaticData } from './useStakedBridgeMatic';
import { useStakedMaticData } from './useStakedMaticData';

interface IUseStakedTokensData {
  isAssetsShowed: boolean;
  isAETHBShowed: boolean;
  isAETHCShowed: boolean;
  isAVAXShowed: boolean;
  isABNBBShowed: boolean;
  isABNBCShowed: boolean;
  isMATICShowed: boolean;
  isAMATICBPolygonShowed: boolean;
  isAFTMBShowed: boolean;
}

export const useStakedTokens = (): IUseStakedTokensData => {
  const amaticbData = useStakedMaticData();
  const amaticbPolygonData = useStakedBridgeMaticData();
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

  const isAFTMBShowed = stakedAFTMBData.isShowed;

  const atLeastOneShowed =
    isAETHBShowed ||
    isAETHCShowed ||
    isAVAXShowed ||
    isABNBBShowed ||
    isABNBCShowed ||
    isMATICShowed ||
    isAMATICBPolygonShowed ||
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
  };
};
