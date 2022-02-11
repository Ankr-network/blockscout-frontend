import { featuresConfig } from 'modules/common/const';
import { useStakedAETHBData } from './useStakedAETHBData';
import { useStakedAETHCData } from './useStakedAETHCData';
import { useStakedAFTMBData } from './useStakedAFTMBData';
import { useStakedBNBData } from './useStakedBNBData';
import { useStakedBNBTxHistory } from './useStakedBNBTxHistory';
import { useStakedMaticData } from './useStakedMaticData';
import { useStakedMaticTxHistory } from './useStakedMaticTxHistory';

export const useStakedTokens = () => {
  const amaticbData = useStakedMaticData();
  const stakedMaticTxHistory = useStakedMaticTxHistory();

  const stakedBNBData = useStakedBNBData();
  const stakedBNBTxHistory = useStakedBNBTxHistory();

  const stakedAETHBData = useStakedAETHBData();
  const stakedAETHCData = useStakedAETHCData();
  const stakedAFTMBData = useStakedAFTMBData();

  const isAETHBShowed = featuresConfig.eth2Swap && stakedAETHBData.isShowed;

  const isAETHCShowed = featuresConfig.eth2Swap && stakedAETHCData.isShowed;

  const isBNBShowed =
    featuresConfig.isActiveBNBStaking &&
    (stakedBNBData.isShowed || stakedBNBTxHistory.hasHistory);

  const isMATICShowed = amaticbData.isShowed || stakedMaticTxHistory.hasHistory;

  const isAFTMBShowed = featuresConfig.stakeFantom && stakedAFTMBData.isShowed;

  const atLeastOneShowed =
    isAETHBShowed ||
    isAETHCShowed ||
    isBNBShowed ||
    isMATICShowed ||
    isAFTMBShowed;

  return {
    isAssetsShowed: atLeastOneShowed,
    isAETHBShowed,
    isAETHCShowed,
    isBNBShowed,
    isMATICShowed,
    isAFTMBShowed,
  };
};
