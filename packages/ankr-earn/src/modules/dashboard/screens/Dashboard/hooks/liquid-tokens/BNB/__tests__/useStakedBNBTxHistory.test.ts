import { t } from '@ankr.com/common';
import { act, renderHook } from '@testing-library/react-hooks';

import { EBinancePoolEventsMap } from '@ankr.com/staking-sdk';

import { IHistoryDialogData } from 'modules/common/components/HistoryDialog';
import { ONE_ETH } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useLazyGetBNBTotalHistoryQuery } from 'modules/stake-bnb/actions/fetchTotalHistory';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedBNBTxHistory } from '../useStakedBNBTxHistory';

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/fetchTotalHistory', () => ({
  useLazyGetBNBTotalHistoryQuery: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useProviderEffect', () => ({
  useProviderEffect: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/hooks/useTxHistory', () => {
  const NOW = new Date();

  const defaultData = {
    isFetching: false,
    data: {
      completedBond: [
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
      pendingBond: [
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
    (useLazyGetBNBTotalHistoryQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      defaultData,
    ]);

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
      staked: [
        {
          amount: ONE_ETH,
          date: NOW,
          hash: 'txHash1',
          link: 'https://testnet.bscscan.com/tx/txHash1',
        },
      ],
      stakedToken: Token.aBNBb,
      unstaked: [
        {
          amount: ONE_ETH.multipliedBy(2),
          date: NOW,
          hash: 'txHash2',
          link: 'https://testnet.bscscan.com/tx/txHash2',
        },
      ],
      unstakedToken: Token.aBNBb,
    } as IHistoryDialogData);
  });

  test('should handle load history data', () => {
    const [refetch] = useLazyGetBNBTotalHistoryQuery();

    const { result } = renderHook(() => useStakedBNBTxHistory());

    act(() => {
      result.current.handleLoadTxHistory();
    });

    expect(refetch).toBeCalledTimes(1);
  });

  test('should return empty data', () => {
    (useLazyGetBNBTotalHistoryQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: null,
        isFetching: true,
      },
    ]);

    const { result } = renderHook(() => useStakedBNBTxHistory());

    expect(result.current.hasHistory).toBe(false);
    expect(result.current.isHistoryDataLoading).toBe(true);
    expect(result.current.pendingUnstakeHistoryABNBB).toStrictEqual([]);
    expect(result.current.transactionHistoryABNBB).toStrictEqual({
      staked: [],
      stakedToken: Token.aBNBb,
      unstaked: [],
      unstakedToken: Token.aBNBb,
    } as IHistoryDialogData);
    expect(result.current.transactionHistoryABNBC).toStrictEqual({
      staked: [],
      stakedToken: Token.aBNBc,
      unstaked: [],
      unstakedToken: Token.aBNBc,
    } as IHistoryDialogData);
  });
});
