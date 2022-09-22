import { useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { EAvalanchePoolEventsMap } from '@ankr.com/staking-sdk';
import { t } from 'common';

import { IHistoryDialogData } from 'modules/common/components/HistoryDialog';
import { ONE_ETH as ONE } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedAVAXTxHistory } from '../useStakedAVAXTxHistory';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('modules/stake-avax/actions/fetchTotalHistoryData', () => ({
  fetchTotalHistoryData: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/useStakedAVAXTxHistory', () => {
  const NOW = new Date();

  const defaultData = {
    loading: false,
    data: {
      completedBond: [
        {
          txAmount: ONE,
          txDate: NOW,
          txHash: 'txHash1',
          txType: EAvalanchePoolEventsMap.StakePending,
        },
        {
          txAmount: ONE.multipliedBy(2),
          txDate: NOW,
          txHash: 'txHash2',
          txType: EAvalanchePoolEventsMap.AvaxClaimPending,
        },
      ],
      completedCertificate: [
        {
          txAmount: ONE,
          txDate: NOW,
          txHash: 'txHash1',
          txType: EAvalanchePoolEventsMap.StakePending,
        },
        {
          txAmount: ONE.multipliedBy(2),
          txDate: NOW,
          txHash: 'txHash2',
          txType: EAvalanchePoolEventsMap.AvaxClaimPending,
        },
      ],
      pendingBond: [
        {
          txAmount: ONE.multipliedBy(3),
          txDate: NOW,
          txHash: 'txHash3',
          txType: EAvalanchePoolEventsMap.AvaxClaimPending,
        },
        {
          txAmount: ONE.multipliedBy(4),
          txDate: NOW,
          txHash: 'txHash4',
          txType: EAvalanchePoolEventsMap.StakePending,
        },
      ],
      pendingCertificate: [
        {
          txAmount: ONE.multipliedBy(3),
          txDate: NOW,
          txHash: 'txHash3',
          txType: EAvalanchePoolEventsMap.AvaxClaimPending,
        },
        {
          txAmount: ONE.multipliedBy(4),
          txDate: NOW,
          txHash: 'txHash4',
          txType: EAvalanchePoolEventsMap.StakePending,
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

    const { result } = renderHook(() => useStakedAVAXTxHistory());

    expect(result.current.hasHistory).toBe(true);
    expect(result.current.pendingUnstakeHistoryAAVAXB).toStrictEqual([
      {
        id: 1,
        amount: ONE.multipliedBy(3),
        token: Token.aAVAXb,
        timerSlot: `${date}, ${time}`,
      },
    ]);
    expect(result.current.transactionHistoryAAVAXB).toStrictEqual({
      staked: [
        {
          amount: ONE,
          date: NOW,
          hash: 'txHash1',
          link: 'https://testnet.snowtrace.io/tx/txHash1',
        },
      ],
      stakedToken: Token.aAVAXb,
      unstaked: [
        {
          amount: ONE.multipliedBy(2),
          date: NOW,
          hash: 'txHash2',
          link: 'https://testnet.snowtrace.io/tx/txHash2',
        },
      ],
      unstakedToken: Token.aAVAXb,
    } as IHistoryDialogData);
  });

  test('should handle load history data', () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedAVAXTxHistory());

    act(() => {
      result.current.handleLoadTxHistory();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('should return empty data', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, loading: true });

    const { result } = renderHook(() => useStakedAVAXTxHistory());

    expect(result.current.hasHistory).toBe(false);
    expect(result.current.isHistoryDataLoading).toBe(true);
    expect(result.current.pendingUnstakeHistoryAAVAXB).toStrictEqual([]);
    expect(result.current.transactionHistoryAAVAXB).toStrictEqual({
      staked: [],
      stakedToken: Token.aAVAXb,
      unstaked: [],
      unstakedToken: Token.aAVAXb,
    } as IHistoryDialogData);
  });
});
