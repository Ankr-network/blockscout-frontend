import { useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { t } from 'common';

import { ONE_ETH, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { EBinancePoolEventsMap } from 'modules/stake-bnb/api/BinanceSDK';
import { IGetHistory } from 'modules/stake-fantom/actions/getHistory';
import { EFantomPoolEvents } from 'modules/stake-fantom/api/sdk';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedFTMTxHistory } from '../useStakedFTMTxHistory';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/useStakedFTMTxHistory.ts', () => {
  const NOW = new Date();

  const defaultData: {
    loading: boolean;
    data: IGetHistory;
  } = {
    loading: false,
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
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultData);

    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return tx history data', () => {
    const date = t('format.date', { value: NOW });
    const time = t('format.time-short', { value: NOW });
    const { result } = renderHook(() => useStakedFTMTxHistory());

    expect(result.current.pendingUnstakeHistoryAFTMB);
    expect(result.current.pendingUnstakeHistoryAFTMB).toStrictEqual([
      {
        id: NOW.getTime(),
        amount: ONE_ETH.multipliedBy(3),
        token: Token.aFTMb,
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
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedFTMTxHistory());

    act(() => {
      result.current.handleLoadTxHistory();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('should return empty data', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, loading: true });

    const { result } = renderHook(() => useStakedFTMTxHistory());

    expect(result.current.hasHistory).toBe(true);
    expect(result.current.pendingUnstakeHistoryAFTMB).toStrictEqual([]);
    expect(result.current.stakedAFTMB).toStrictEqual([]);
    expect(result.current.unstakedAFTMB).toStrictEqual([]);
    expect(result.current.pendingValue).toStrictEqual(ZERO);
  });
});
