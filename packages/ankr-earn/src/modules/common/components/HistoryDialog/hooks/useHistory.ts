import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { useMemo, useState } from 'react';

import { ITxEventsHistoryGroupItem } from '@ankr.com/staking-sdk';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { fetchHistory as fetchAVAXHistory } from 'modules/stake-avax/actions/fetchHistory';
import { fetchHistory as fetchBNBHistory } from 'modules/stake-bnb/actions/fetchHistory';
import { getHistory as getETHHistory } from 'modules/stake-eth/actions/getHistory';
import { getHistory as getFTMHistory } from 'modules/stake-fantom/actions/getHistory';
import { fetchHistory as fetchMATICETHHistory } from 'modules/stake-matic/eth/actions/fetchHistory';

import { IHistoryDialogRow, IBaseHistoryData, IHistoryData } from '../types';

export interface IUseHistoryData extends IHistoryData {
  loading: boolean;
  weeksAmount: number;
  handleShowMore: () => void;
}

interface IUseHistoryProps {
  token: Token;
  network: number;
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
  network: number,
): IHistoryDialogRow => {
  return {
    date: data.txDate,
    link: getTxLinkByNetwork(data.txHash, network),
    hash: data.txHash,
    amount: data.txAmount,
  };
};

export const useHistory = ({
  token,
  network,
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

  const { loading: avaxHistoryLoading } = useQuery({
    type: fetchAVAXHistory,
  });
  const { loading: isAvaxHistoryMutationLoading } = useMutation({
    type: fetchAVAXHistory,
  });

  const { loading: bnbHistoryLoading } = useQuery({
    type: fetchBNBHistory,
  });
  const { loading: isBnbHistoryMutationLoading } = useMutation({
    type: fetchBNBHistory,
  });

  const { loading: maticEthHistoryLoading } = useQuery({
    type: fetchMATICETHHistory,
  });
  const { loading: isMaticEthHistoryMutationLoading } = useMutation({
    type: fetchMATICETHHistory,
  });

  const { loading: ethHistoryLoading } = useQuery({
    type: getETHHistory,
  });
  const { loading: isEthHistoryMutationLoading } = useMutation({
    type: getETHHistory,
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
      case Token.aAVAXb:
        dispatchRequest(
          fetchAVAXHistory({
            step: stepValue,
          }),
        ).then(({ data }) => {
          setHistoryData({
            stakeEvents: [...stakeEvents, ...(data?.aAVAXb.stakeEvents ?? [])],
            unstakeEvents: [
              ...unstakeEvents,
              ...(data?.aAVAXb.unstakeEvents ?? []),
            ],
          });
        });
        break;
      case Token.aAVAXc:
        dispatchRequest(
          fetchAVAXHistory({
            step: stepValue,
          }),
        ).then(({ data }) => {
          setHistoryData({
            stakeEvents: [...stakeEvents, ...(data?.aAVAXc.stakeEvents ?? [])],
            unstakeEvents: [
              ...unstakeEvents,
              ...(data?.aAVAXc.unstakeEvents ?? []),
            ],
          });
        });
        break;
      case Token.aBNBb:
        dispatchRequest(
          fetchBNBHistory({
            step: stepValue,
          }),
        ).then(({ data }) => {
          setHistoryData({
            stakeEvents: [...stakeEvents, ...(data?.aBNBb.stakeEvents ?? [])],
            unstakeEvents: [
              ...unstakeEvents,
              ...(data?.aBNBb.unstakeEvents ?? []),
            ],
          });
        });
        break;
      case Token.aBNBc:
        dispatchRequest(
          fetchBNBHistory({
            step: stepValue,
          }),
        ).then(({ data }) => {
          setHistoryData({
            stakeEvents: [...stakeEvents, ...(data?.aBNBc.stakeEvents ?? [])],
            unstakeEvents: [
              ...unstakeEvents,
              ...(data?.aBNBc.unstakeEvents ?? []),
            ],
          });
        });
        break;
      case Token.aMATICb:
        dispatchRequest(
          fetchMATICETHHistory({
            step: stepValue,
          }),
        ).then(({ data }) => {
          setHistoryData({
            stakeEvents: [...stakeEvents, ...(data?.aMATICb.stakeEvents ?? [])],
            unstakeEvents: [
              ...unstakeEvents,
              ...(data?.aMATICb.unstakeEvents ?? []),
            ],
          });
        });
        break;
      case Token.aMATICc:
        dispatchRequest(
          fetchMATICETHHistory({
            step: stepValue,
          }),
        ).then(({ data }) => {
          setHistoryData({
            stakeEvents: [...stakeEvents, ...(data?.aMATICc.stakeEvents ?? [])],
            unstakeEvents: [
              ...unstakeEvents,
              ...(data?.aMATICc.unstakeEvents ?? []),
            ],
          });
        });
        break;
      case Token.aETHb:
        dispatchRequest(
          getETHHistory({
            step: stepValue,
          }),
        ).then(({ data }) => {
          setHistoryData({
            stakeEvents: [...stakeEvents, ...(data?.aETHb.stakeEvents ?? [])],
            unstakeEvents: [
              ...unstakeEvents,
              ...(data?.aETHb.unstakeEvents ?? []),
            ],
          });
        });
        break;
      case Token.aETHc:
        dispatchRequest(
          getETHHistory({
            step: stepValue,
          }),
        ).then(({ data }) => {
          setHistoryData({
            stakeEvents: [...stakeEvents, ...(data?.aETHc.stakeEvents ?? [])],
            unstakeEvents: [
              ...unstakeEvents,
              ...(data?.aETHc.unstakeEvents ?? []),
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

  const stakeEvents = useMemo(() => {
    return historyData.stakeEvents.map(event => mapTxns(event, token, network));
  }, [historyData.stakeEvents, network, token]);

  const unstakeEvents = useMemo(() => {
    return historyData.unstakeEvents.map(event =>
      mapTxns(event, token, network),
    );
  }, [historyData.unstakeEvents, network, token]);

  return {
    stakeEvents,
    unstakeEvents,
    loading:
      ftmHistoryLoading ||
      isFtmHistoryMutationLoading ||
      avaxHistoryLoading ||
      isAvaxHistoryMutationLoading ||
      bnbHistoryLoading ||
      isBnbHistoryMutationLoading ||
      maticEthHistoryLoading ||
      isMaticEthHistoryMutationLoading ||
      ethHistoryLoading ||
      isEthHistoryMutationLoading,
    weeksAmount: step * 2,
    handleShowMore,
  };
};
