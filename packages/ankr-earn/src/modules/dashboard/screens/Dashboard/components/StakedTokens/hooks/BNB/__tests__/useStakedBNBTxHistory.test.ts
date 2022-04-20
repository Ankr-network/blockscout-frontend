import { useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { ONE_ETH } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { EBinancePoolEventsMap } from 'modules/stake-bnb/api/BinanceSDK';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedBNBTxHistory } from '../useStakedBNBTxHistory';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('modules/auth/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedCard/useTxHistory', () => {
  const NOW = new Date();

  const defaultData = {
    loading: false,
    data: {
      completedABNBB: [
        {
          txAmount: ONE_ETH,
          txDate: NOW,
          txHash: 'txHash1',
          txType: EBinancePoolEventsMap.Staked,
        },
        {
          txAmount: ONE_ETH.multipliedBy(2),
          txDate: NOW,
          txHash: 'txHash2',
          txType: EBinancePoolEventsMap.UnstakePending,
        },
      ],
      pendingABNBB: [
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
    (useAuth as jest.Mock).mockReturnValue({ chainId: 1 });

    (useQuery as jest.Mock).mockReturnValue(defaultData);

    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return tx history data', () => {
    const date = t('format.date', { value: NOW });
    const time = t('format.time-short', { value: NOW });
    const { result } = renderHook(() => useStakedBNBTxHistory());

    expect(result.current.hasHistory).toBe(true);
    expect(result.current.pendingUnstakeHistoryABNBB).toStrictEqual([
      {
        id: 1,
        amount: ONE_ETH.multipliedBy(3),
        token: Token.aBNBb,
        timerSlot: `${date}, ${time}`,
      },
    ]);
    expect(result.current.transactionHistoryABNBB).toStrictEqual({
      token: Token.aBNBb,
      staked: [
        {
          amount: ONE_ETH,
          date: NOW,
          hash: 'txHash1',
          link: 'https://testnet.bscscan.com/tx/txHash1',
        },
      ],
      unstaked: [
        {
          amount: ONE_ETH.multipliedBy(2),
          date: NOW,
          hash: 'txHash2',
          link: 'https://testnet.bscscan.com/tx/txHash2',
        },
      ],
    });
  });

  test('should handle load history data', () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedBNBTxHistory());

    act(() => {
      result.current.handleLoadTxHistory();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('should return empty data', () => {
    (useAuth as jest.Mock).mockReturnValue({ chainId: undefined });
    (useQuery as jest.Mock).mockReturnValue({ data: null, loading: true });

    const { result } = renderHook(() => useStakedBNBTxHistory());

    expect(result.current.hasHistory).toBe(false);
    expect(result.current.isHistoryDataLoading).toBe(true);
    expect(result.current.pendingUnstakeHistoryABNBB).toStrictEqual([]);
    expect(result.current.transactionHistoryABNBB).toStrictEqual({
      token: Token.aBNBb,
      staked: [],
      unstaked: [],
    });
    expect(result.current.transactionHistoryABNBC).toStrictEqual({
      token: Token.aBNBc,
      staked: [],
      unstaked: [],
    });
  });
});
