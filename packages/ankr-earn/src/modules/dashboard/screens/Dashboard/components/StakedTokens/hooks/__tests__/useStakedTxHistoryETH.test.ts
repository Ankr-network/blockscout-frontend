import { useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';

import { ONE_ETH, ZERO } from 'modules/common/const';

import { useStakedTxHistoryETH } from '../useStakedTxHistoryETH';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/useStakedTxHistoryETH', () => {
  const NOW = new Date();

  const defaultData = {
    loading: false,
    data: {
      totalPending: ONE_ETH,
      completedAETHC: [
        {
          txDate: NOW,
          txAmount: ONE_ETH,
          txHash: 'txHash1',
          txType: 'type1',
        },
      ],
      completedAETHB: [
        {
          txDate: NOW,
          txAmount: ONE_ETH,
          txHash: 'txHash1',
          txType: 'type1',
        },
      ],
      pending: [
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
        link: 'https://testnet.ftmscan.com/tx/txHash1',
      },
    ]);
    expect(result.current.stakedAETHC).toStrictEqual([
      {
        amount: ONE_ETH,
        date: NOW,
        hash: 'txHash1',
        link: 'https://testnet.ftmscan.com/tx/txHash1',
      },
    ]);
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
