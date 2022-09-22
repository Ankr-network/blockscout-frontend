import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { useState } from 'react';

import { ITxEventsHistoryGroupItem } from '@ankr.com/staking-sdk';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Token } from 'modules/common/types/token';
import { getChainIdByToken } from 'modules/common/utils/getChainIdByToken';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { getHistory as getFTMHistory } from 'modules/stake-fantom/actions/getHistory';

import { IHistoryDialogRow, IBaseHistoryData, IHistoryData } from '../types';

interface IUseHistoryData extends IHistoryData {
  loading: boolean;
  weeksAmount: number;
  handleShowMore: () => void;
}

interface IUseHistoryProps {
  token: Token;
  open: boolean;
}

const DEFAULT_STEP = 0;
const DEFAULT_HISTORY_DATA = {
  stakeEvents: [],
  unstakeEvents: [],
};

const mapTxns = (
  data: ITxEventsHistoryGroupItem,
  token: Token,
): IHistoryDialogRow => {
  return {
    date: data.txDate,
    link: getTxLinkByNetwork(data.txHash, getChainIdByToken(token)),
    hash: data.txHash,
    amount: data.txAmount,
  };
};

export const useHistory = ({
  token,
  open,
}: IUseHistoryProps): IUseHistoryData => {
  const [step, setStep] = useState(DEFAULT_STEP);
  const [historyData, setHistoryData] =
    useState<IBaseHistoryData>(DEFAULT_HISTORY_DATA);
  const dispatchRequest = useDispatchRequest();

  const { loading: ftmHistoryLoading } = useQuery({
    type: getFTMHistory,
  });
  const { loading: isFtmHistoryMutationLoading } = useMutation({
    type: getFTMHistory,
  });

  const resetState = () => {
    setStep(DEFAULT_STEP);
    setHistoryData(DEFAULT_HISTORY_DATA);
  };

  const handleShowMore = (isInit = false): void => {
    const isInitValue = typeof isInit === 'boolean' ? isInit : false;
    const stepValue = isInitValue ? 0 : step;

    const stakeEvents = isInitValue ? [] : [...historyData.stakeEvents];
    const unstakeEvents = isInitValue ? [] : [...historyData.unstakeEvents];

    if (isInitValue) {
      resetState();
    }

    switch (token) {
      case Token.aFTMb:
        dispatchRequest(
          getFTMHistory({
            step: stepValue,
          }),
        ).then(({ data }) => {
          setHistoryData({
            stakeEvents: [...stakeEvents, ...(data?.aFTMb.stakeEvents ?? [])],
            unstakeEvents: [
              ...unstakeEvents,
              ...(data?.aFTMb.unstakeEvents ?? []),
            ],
          });
        });
        break;
      case Token.aFTMc:
        dispatchRequest(
          getFTMHistory({
            step: stepValue,
          }),
        ).then(({ data }) => {
          setHistoryData({
            stakeEvents: [...stakeEvents, ...(data?.aFTMc.stakeEvents ?? [])],
            unstakeEvents: [
              ...unstakeEvents,
              ...(data?.aFTMc.unstakeEvents ?? []),
            ],
          });
        });
        break;

      default:
        break;
    }

    setStep(prevStep => prevStep + 1);
  };

  useProviderEffect(() => {
    if (open) {
      handleShowMore(true);
    }

    return () => {
      resetState();
    };
  }, [token, open]);

  return {
    stakeEvents: historyData.stakeEvents.map(event => mapTxns(event, token)),
    unstakeEvents: historyData.unstakeEvents.map(event =>
      mapTxns(event, token),
    ),
    loading: ftmHistoryLoading || isFtmHistoryMutationLoading,
    weeksAmount: step * 2,
    handleShowMore,
  };
};
