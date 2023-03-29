import { useCallback, useState } from 'react';

import { ITxHistoryItem } from '@ankr.com/staking-sdk';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Token } from 'modules/common/types/token';
import { getIsFullHistoryAvailable } from 'modules/dashboard/screens/Dashboard/components/HistoryDialog/utils/getIsFullHistoryAvailable';
import { HISTORY_STEP_WEEKS } from 'modules/dashboard/screens/Dashboard/const';
import { useLazyGetAvaxHistoryQuery } from 'modules/stake-avax/actions/getAvaxHistory';
import { useLazyGetBnbHistoryQuery } from 'modules/stake-bnb/actions/getBnbHistory';
import { useLazyGetEthHistoryQuery } from 'modules/stake-eth/actions/getEthHistory';
import { useLazyGetFtmHistoryQuery } from 'modules/stake-fantom/actions/getFtmHistory';
import { useLazyGetMaticOnEthHistoryNewQuery } from 'modules/stake-matic/eth/actions/getMaticOnEthHistoryNew';
import { useLazyGetXdcHistoryQuery } from 'modules/stake-xdc/actions/getXdcHistory';

const DEFAULT_STEP = 0;
export const FULL_HISTORY_STEP = Infinity;

interface IHistoryData {
  stakeEvents: ITxHistoryItem[];
  unstakeEvents: ITxHistoryItem[];
}

const DEFAULT_HISTORY_DATA: IHistoryData = {
  stakeEvents: [],
  unstakeEvents: [],
};

export interface IUseHistoryData extends IHistoryData {
  loading: boolean;
  weeksAmount: number;
  handleShowMore: () => void;
}

interface IUseHistoryProps {
  token: Token;
}

export const useHistory = ({ token }: IUseHistoryProps): IUseHistoryData => {
  const [step, setStep] = useState(DEFAULT_STEP);

  const [historyData, setHistoryData] =
    useState<IHistoryData>(DEFAULT_HISTORY_DATA);

  const [getAVAXHistory, { isFetching: avaxHistoryLoading }] =
    useLazyGetAvaxHistoryQuery();

  const [getBnbHistory, { isFetching: bnbHistoryLoading }] =
    useLazyGetBnbHistoryQuery();

  const [getEthHistory, { isFetching: ethHistoryLoading }] =
    useLazyGetEthHistoryQuery();

  const [getFtmHistory, { isFetching: ftmHistoryLoading }] =
    useLazyGetFtmHistoryQuery();

  const [getMaticOnEthHistory, { isFetching: maticOnEthHistoryLoading }] =
    useLazyGetMaticOnEthHistoryNewQuery();

  const [getXdcHistory, { isFetching: xdcHistoryLoading }] =
    useLazyGetXdcHistoryQuery();

  const resetState = () => {
    setStep(DEFAULT_STEP);
    setHistoryData(DEFAULT_HISTORY_DATA);
  };

  const handleShowMore = useCallback(
    (isInit = false): void => {
      const isInitValue = typeof isInit === 'boolean' ? isInit : false;
      const stepValue = isInitValue ? DEFAULT_STEP : step;

      const stakeEvents = isInitValue ? [] : [...historyData.stakeEvents];
      const unstakeEvents = isInitValue ? [] : [...historyData.unstakeEvents];

      if (isInitValue) {
        resetState();
      }

      let actionResult;

      switch (token) {
        case Token.aAVAXc:
        case Token.aAVAXb:
          actionResult = getAVAXHistory(
            getIsFullHistoryAvailable(token) ? FULL_HISTORY_STEP : stepValue,
          );
          break;

        case Token.aBNBb:
        case Token.aBNBc:
          actionResult = getBnbHistory(
            getIsFullHistoryAvailable(token) ? FULL_HISTORY_STEP : stepValue,
          );
          break;

        case Token.aETHb:
        case Token.aETHc:
          actionResult = getEthHistory(
            getIsFullHistoryAvailable(token) ? FULL_HISTORY_STEP : stepValue,
          );
          break;

        case Token.aFTMb:
        case Token.aFTMc:
          actionResult = getFtmHistory(
            getIsFullHistoryAvailable(token) ? FULL_HISTORY_STEP : stepValue,
          );
          break;

        case Token.aMATICb:
        case Token.aMATICc:
          actionResult = getMaticOnEthHistory(
            getIsFullHistoryAvailable(token) ? FULL_HISTORY_STEP : stepValue,
          );
          break;

        case Token.ankrXDC:
          actionResult = getXdcHistory(
            getIsFullHistoryAvailable(token) ? FULL_HISTORY_STEP : stepValue,
          );
          break;

        default:
          break;
      }

      actionResult?.unwrap().then(data => {
        setHistoryData({
          stakeEvents: [...stakeEvents, ...(data?.stakeHistory ?? [])],
          unstakeEvents: [...unstakeEvents, ...(data?.unstakeHistory ?? [])],
        });
      });

      setStep(prevStep => prevStep + 1);
    },
    [
      getAVAXHistory,
      getBnbHistory,
      getEthHistory,
      getFtmHistory,
      getMaticOnEthHistory,
      getXdcHistory,
      historyData.stakeEvents,
      historyData.unstakeEvents,
      step,
      token,
    ],
  );

  useProviderEffect(() => {
    handleShowMore(true);

    return () => {
      resetState();
    };
  }, [token]);

  return {
    stakeEvents: historyData.stakeEvents,
    unstakeEvents: historyData.unstakeEvents,
    loading:
      avaxHistoryLoading ||
      bnbHistoryLoading ||
      ethHistoryLoading ||
      ftmHistoryLoading ||
      xdcHistoryLoading ||
      maticOnEthHistoryLoading,
    weeksAmount: step * HISTORY_STEP_WEEKS,
    handleShowMore,
  };
};
