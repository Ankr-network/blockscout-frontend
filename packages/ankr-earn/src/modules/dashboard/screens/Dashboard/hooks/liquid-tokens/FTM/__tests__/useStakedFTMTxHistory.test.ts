import { act, renderHook } from '@testing-library/react-hooks';

import {
  EBinancePoolEventsMap,
  EFantomPoolEvents,
} from '@ankr.com/staking-sdk';
import { t } from 'common';

import { ONE_ETH, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetFTMTotalHistoryDataQuery } from 'modules/stake-fantom/actions/getTotalHistoryData';

import { useStakedFTMTxHistory } from '../useStakedFTMTxHistory';

jest.mock('modules/stake-fantom/actions/getTotalHistoryData', () => ({
  useGetFTMTotalHistoryDataQuery: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/hooks/liquid-tokens/FTM/useStakedFTMTxHistory', () => {
  const NOW = new Date();

  const token = Token.aFTMb;

  const defaultData = {
    isFetching: false,
    data: {
      totalPending: ONE_ETH,
      stakeEventsAFTMB: [
        {
          txDate: NOW,
          txAmount: ONE_ETH,
          txHash: 'txHash1',
          txType: EFantomPoolEvents.StakeReceived,
        },
      ],
      stakeEventsAFTMC: [
        {
          txDate: NOW,
          txAmount: ONE_ETH,
          txHash: 'txHash1',
          txType: EFantomPoolEvents.StakeReceived,
        },
      ],
      pendingEventsAFTMB: [
        {
          txAmount: ONE_ETH.multipliedBy(3),
          txDate: NOW,
          txHash: 'txHash3',
          txType: EFantomPoolEvents.TokensBurned,
        },
      ],
      pendingEventsAFTMC: [
        {
          txAmount: ONE_ETH.multipliedBy(3),
          txDate: NOW,
          txHash: 'txHash3',
          txType: EFantomPoolEvents.TokensBurned,
        },
      ],
      withdrawnEventsAFTMB: [
        {
          txAmount: ONE_ETH.multipliedBy(3),
          txDate: NOW,
          txHash: 'txHash3',
          txType: EBinancePoolEventsMap.UnstakePending,
        },
      ],
      withdrawnEventsAFTMC: [
        {
          txAmount: ONE_ETH.multipliedBy(3),
          txDate: NOW,
          txHash: 'txHash3',
          txType: EBinancePoolEventsMap.UnstakePending,
        },
      ],
    },
    refetch: jest.fn(),
  };

  beforeEach(() => {
    (useGetFTMTotalHistoryDataQuery as jest.Mock).mockReturnValue(defaultData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return tx history data', () => {
    const date = t('format.date', { value: NOW });
    const time = t('format.time-short', { value: NOW });
    const { result } = renderHook(() => useStakedFTMTxHistory(token));

    expect(result.current.pendingUnstakeHistoryAFTMB);
    expect(result.current.pendingUnstakeHistoryAFTMB).toStrictEqual([
      {
        id: NOW.getTime(),
        amount: ONE_ETH.multipliedBy(3),
        token,
        timerSlot: `${date}, ${time}`,
      },
    ]);
    expect(result.current.stakedAFTMB).toStrictEqual([
      {
        amount: ONE_ETH,
        date: NOW,
        hash: 'txHash1',
        link: 'https://testnet.ftmscan.com/tx/txHash1',
      },
    ]);

    expect(result.current.unstakedAFTMB).toStrictEqual([
      {
        amount: ONE_ETH.multipliedBy(3),
        date: NOW,
        hash: 'txHash3',
        link: 'https://testnet.ftmscan.com/tx/txHash3',
      },
    ]);
  });

  test('should handle load history data', () => {
    const { refetch } = useGetFTMTotalHistoryDataQuery();

    const { result } = renderHook(() => useStakedFTMTxHistory(token));

    act(() => {
      result.current.handleLoadTxHistory();
    });

    expect(refetch).toBeCalledTimes(1);
  });

  test('should return empty data', () => {
    (useGetFTMTotalHistoryDataQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
    });

    const { result } = renderHook(() => useStakedFTMTxHistory(token));

    expect(result.current.hasHistory).toBe(true);
    expect(result.current.pendingUnstakeHistoryAFTMB).toStrictEqual([]);
    expect(result.current.stakedAFTMB).toStrictEqual([]);
    expect(result.current.unstakedAFTMB).toStrictEqual([]);
    expect(result.current.pendingValue).toStrictEqual(ZERO);
  });
});
