import { featuresConfig } from 'modules/common/const';

import { useStakedAETHBData } from './useStakedAETHBData';
import { useStakedAETHCData } from './useStakedAETHCData';
import { useStakedAFTMBData } from './useStakedAFTMBData';
import { useStakedAVAXData } from './useStakedAVAXData';
import { useStakedBNBData } from './useStakedBNBData';
import { useStakedMaticData } from './useStakedMaticData';

interface IUseStakedTokensData {
  isAssetsShowed: boolean;
  isAETHBShowed: boolean;
  isAETHCShowed: boolean;
  isAVAXShowed: boolean;
  isBNBShowed: boolean;
  isMATICShowed: boolean;
  isAFTMBShowed: boolean;
}

export const useStakedTokens = (): IUseStakedTokensData => {
  const amaticbData = useStakedMaticData();
  const stakedAVAXData = useStakedAVAXData();
  const stakedBNBData = useStakedBNBData();

  const stakedAETHBData = useStakedAETHBData();
  const stakedAETHCData = useStakedAETHCData();
  const stakedAFTMBData = useStakedAFTMBData();

  const isAETHBShowed = stakedAETHBData.isShowed;

  const isAETHCShowed = stakedAETHCData.isShowed;

  const isAVAXShowed =
    featuresConfig.isActiveAVAXStaking && stakedAVAXData.isShowed;

  const isBNBShowed =
    featuresConfig.isActiveBNBStaking && stakedBNBData.isShowed;

  const isMATICShowed = amaticbData.isShowed;

  const isAFTMBShowed = featuresConfig.stakeFantom && stakedAFTMBData.isShowed;

  const atLeastOneShowed =
    isAETHBShowed ||
    isAETHCShowed ||
    isAVAXShowed ||
    isBNBShowed ||
    isMATICShowed ||
    isAFTMBShowed;

  return {
    isAssetsShowed: atLeastOneShowed,
    isAETHBShowed,
    isAETHCShowed,
    isAVAXShowed,
    isBNBShowed,
    isMATICShowed,
    isAFTMBShowed,
  };
};
