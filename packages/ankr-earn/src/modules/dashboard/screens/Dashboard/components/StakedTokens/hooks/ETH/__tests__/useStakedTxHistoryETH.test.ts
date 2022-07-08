import { useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { ONE_ETH, ZERO } from 'modules/common/const';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedTxHistoryETH } from '../useStakedTxHistoryETH';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/getTxHistoryAETHB', () => ({
  getTxHistoryETH: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/useStakedTxHistoryETH', () => {
  const NOW = new Date();

  const defaultData = {
    loading: false,
    data: {
      completedCertificate: [
        {
          txDate: NOW,
          txAmount: ONE_ETH,
          txHash: 'txHash1',
          txType: 'type1',
        },
      ],
      completedBond: [
        {
          txDate: NOW,
          txAmount: ONE_ETH,
          txHash: 'txHash1',
          txType: 'type1',
        },
      ],
      pendingBond: [
        {
          txAmount: ONE_ETH.multipliedBy(3),
          txDate: NOW,
          txHash: 'txHash3',
          txType: 'type2',
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
    const { result } = renderHook(() => useStakedTxHistoryETH());

    expect(result.current.hasHistory).toBe(true);
    expect(result.current.pendingUnstakeHistory).toStrictEqual([]);
    expect(result.current.stakedAETHB).toStrictEqual([
      {
        amount: ONE_ETH,
        date: NOW,
        hash: 'txHash1',
        link: 'https://goerli.etherscan.io/tx/txHash1',
      },
    ]);
    expect(result.current.stakedAETHC).toStrictEqual([
      {
        amount: ONE_ETH,
        date: NOW,
        hash: 'txHash1',
        link: 'https://goerli.etherscan.io/tx/txHash1',
      },
    ]);
  });

  test('should handle load history data', () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedTxHistoryETH());

    act(() => {
      result.current.handleLoadTxHistory();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('should return empty data', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, loading: true });

    const { result } = renderHook(() => useStakedTxHistoryETH());

    expect(result.current.hasHistory).toBe(true);
    expect(result.current.isHistoryLoading).toBe(true);
    expect(result.current.pendingUnstakeHistory).toStrictEqual([]);
    expect(result.current.stakedAETHB).toStrictEqual([]);
    expect(result.current.stakedAETHC).toStrictEqual([]);
    expect(result.current.pendingValue).toStrictEqual(ZERO);
  });
});
