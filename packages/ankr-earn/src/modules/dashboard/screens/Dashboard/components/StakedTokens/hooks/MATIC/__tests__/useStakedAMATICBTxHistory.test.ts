import { useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { EPolygonPoolEventsMap } from '@ankr.com/staking-sdk';
import { t } from 'common';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { IHistoryDialogData } from 'modules/common/components/HistoryDialog';
import { ONE_ETH } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedMATICTxHistory } from '../useStakedMaticTxHistory';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('modules/stake-matic/eth/actions/fetchTotalHistory', () => ({
  fetchTotalHistory: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedCard/useTxHistory', () => {
  const NOW = new Date();

  const defaultData = {
    loading: false,
    data: {
      completedBond: [
        {
          txAmount: ONE_ETH,
          txDate: NOW,
          txHash: 'txHash1',
          txType: EPolygonPoolEventsMap.Staking,
        },
        {
          txAmount: ONE_ETH.multipliedBy(2),
          txDate: NOW,
          txHash: 'txHash2',
          txType: EPolygonPoolEventsMap.Unstaking,
        },
      ],
      completedCertificate: [
        {
          txAmount: ONE_ETH,
          txDate: NOW,
          txHash: 'txHash1',
          txType: EPolygonPoolEventsMap.Staking,
        },
        {
          txAmount: ONE_ETH.multipliedBy(2),
          txDate: NOW,
          txHash: 'txHash2',
          txType: EPolygonPoolEventsMap.Unstaking,
        },
      ],
      pendingBond: [
        {
          txAmount: ONE_ETH.multipliedBy(3),
          txDate: NOW,
          txHash: 'txHash3',
          txType: EPolygonPoolEventsMap.Unstaking,
        },
        {
          txAmount: ONE_ETH.multipliedBy(4),
          txDate: NOW,
          txHash: 'txHash4',
          txType: EPolygonPoolEventsMap.Unstaking,
        },
      ],
      pendingCertificate: [
        {
          txAmount: ONE_ETH.multipliedBy(3),
          txDate: NOW,
          txHash: 'txHash3',
          txType: EPolygonPoolEventsMap.Unstaking,
        },
        {
          txAmount: ONE_ETH.multipliedBy(4),
          txDate: NOW,
          txHash: 'txHash4',
          txType: EPolygonPoolEventsMap.Unstaking,
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
    const { result } = renderHook(() => useStakedMATICTxHistory());

    expect(result.current.hasHistory).toBe(true);
    expect(result.current.pendingUnstakeHistoryAMATICB).toStrictEqual([
      {
        id: 1,
        amount: ONE_ETH.multipliedBy(3),
        token: Token.aMATICb,
        timerSlot: `${date}, ${time}`,
      },
      {
        id: 2,
        amount: ONE_ETH.multipliedBy(4),
        token: Token.aMATICb,
        timerSlot: `${date}, ${time}`,
      },
    ]);
    expect(result.current.transactionHistoryAMATICB).toStrictEqual({
      staked: [
        {
          amount: ONE_ETH,
          date: NOW,
          hash: 'txHash1',
          link: 'https://goerli.etherscan.io/tx/txHash1',
        },
      ],
      stakedToken: Token.aMATICb,
      unstaked: [
        {
          amount: ONE_ETH.multipliedBy(2),
          date: NOW,
          hash: 'txHash2',
          link: 'https://goerli.etherscan.io/tx/txHash2',
        },
      ],
      unstakedToken: Token.aMATICb,
    } as IHistoryDialogData);
  });

  test('should handle load history data', () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedMATICTxHistory());

    act(() => {
      result.current.handleLoadTxHistory();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('should return empty data', () => {
    (useAuth as jest.Mock).mockReturnValue({ chainId: undefined });
    (useQuery as jest.Mock).mockReturnValue({ data: null, loading: true });

    const { result } = renderHook(() => useStakedMATICTxHistory());

    expect(result.current.hasHistory).toBe(false);
    expect(result.current.isHistoryDataLoading).toBe(true);
    expect(result.current.pendingUnstakeHistoryAMATICB).toStrictEqual([]);
    expect(result.current.transactionHistoryAMATICB).toStrictEqual({
      staked: [],
      stakedToken: Token.aMATICb,
      unstaked: [],
      unstakedToken: Token.aMATICb,
    } as IHistoryDialogData);
  });
});
