import { featuresConfig } from 'modules/common/const';

import { useStakedAETHBData } from './useStakedAETHBData';
import { useStakedAETHCData } from './useStakedAETHCData';
import { useStakedAFTMBData } from './useStakedAFTMBData';
import { useStakedAVAXData } from './useStakedAVAXData';
import { useStakedBNBData } from './useStakedBNBData';
import { useStakedBridgeMaticData } from './useStakedBridgeMatic';
import { useStakedMaticData } from './useStakedMaticData';

interface IUseStakedTokensData {
  isAssetsShowed: boolean;
  isAETHBShowed: boolean;
  isAETHCShowed: boolean;
  isAVAXShowed: boolean;
  isBNBShowed: boolean;
  isMATICShowed: boolean;
  isAMATICBPolygonShowed: boolean;
  isAFTMBShowed: boolean;
}

export const useStakedTokens = (): IUseStakedTokensData => {
  const amaticbData = useStakedMaticData();
  const amaticbPolygonData = useStakedBridgeMaticData();
  const stakedAVAXData = useStakedAVAXData();
  const stakedBNBData = useStakedBNBData();

  const stakedAETHBData = useStakedAETHBData();
  const stakedAETHCData = useStakedAETHCData();
  const stakedAFTMBData = useStakedAFTMBData();

  const isAETHBShowed = stakedAETHBData.isShowed;

  const isAETHCShowed = stakedAETHCData.isShowed;

  const isAVAXShowed =
    featuresConfig.isActiveAVAXStaking && stakedAVAXData.isShowed;

  const isBNBShowed = stakedBNBData.isShowed;

  const isMATICShowed = amaticbData.isShowed;
 
  const isAMATICBPolygonShowed = amaticbPolygonData.isShowed;
 
  const isAFTMBShowed = stakedAFTMBData.isShowed; 

  const atLeastOneShowed =
    isAETHBShowed ||
    isAETHCShowed ||
    isAVAXShowed ||
    isBNBShowed ||
    isMATICShowed ||
    isAMATICBPolygonShowed ||
    isAFTMBShowed;

  return {
    isAssetsShowed: atLeastOneShowed,
    isAETHBShowed,
    isAETHCShowed,
    isAVAXShowed,
    isBNBShowed,
    isMATICShowed,
    isAFTMBShowed,
    isAMATICBPolygonShowed,
  };
};
