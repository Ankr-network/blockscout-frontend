import { featuresConfig } from 'modules/common/const';

import { useStakedAETHBData } from './useStakedAETHBData';
import { useStakedAETHCData } from './useStakedAETHCData';
import { useStakedAFTMBData } from './useStakedAFTMBData';
import { useStakedAVAXData } from './useStakedAVAXData';
import { useStakedAVAXTxHistory } from './useStakedAVAXTxHistory';
import { useStakedBNBData } from './useStakedBNBData';
import { useStakedBNBTxHistory } from './useStakedBNBTxHistory';
import { useStakedFTMTxHistory } from './useStakedFTMTxHistory';
import { useStakedMaticData } from './useStakedMaticData';
import { useStakedMaticTxHistory } from './useStakedMaticTxHistory';

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
  const stakedMaticTxHistory = useStakedMaticTxHistory();

  const stakedAVAXData = useStakedAVAXData();
  const stakedAVAXTxHistory = useStakedAVAXTxHistory();

  const stakedBNBData = useStakedBNBData();
  const stakedBNBTxHistory = useStakedBNBTxHistory();

  const stakedAETHBData = useStakedAETHBData();
  const stakedAETHCData = useStakedAETHCData();
  const stakedAFTMBData = useStakedAFTMBData();
  const stakedFTMTxHistory = useStakedFTMTxHistory();

  const isAETHBShowed = stakedAETHBData.isShowed;

  const isAETHCShowed = stakedAETHCData.isShowed;

  const isAVAXShowed =
    featuresConfig.isActiveAVAXStaking &&
    (stakedAVAXData.isShowed || stakedAVAXTxHistory.hasHistory);

  const isBNBShowed =
    featuresConfig.isActiveBNBStaking &&
    (stakedBNBData.isShowed || stakedBNBTxHistory.hasHistory);

  const isMATICShowed = amaticbData.isShowed || stakedMaticTxHistory.hasHistory;

  const isAFTMBShowed =
    featuresConfig.stakeFantom &&
    (stakedAFTMBData.isShowed || stakedFTMTxHistory.hasHistory);

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
