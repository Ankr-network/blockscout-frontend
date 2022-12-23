import { act, renderHook } from '@testing-library/react-hooks';

import { ONE_ETH, ZERO } from 'modules/common/const';
import { useLazyGetETHTotalHistoryQuery } from 'modules/stake-eth/actions/getTotalHistory';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedTxHistoryETH } from '../useStakedTxHistoryETH';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useProviderEffect', () => ({
  useProviderEffect: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/getTotalHistory', () => ({
  useLazyGetETHTotalHistoryQuery: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/hooks/liquid-tokens/ETH/useStakedTxHistoryETH', () => {
  const NOW = new Date();

  const defaultData = {
    isFetching: false,
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
    refetch: jest.fn(),
  };

  beforeEach(() => {
    (useLazyGetETHTotalHistoryQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      defaultData,
    ]);

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
    const [refetch] = useLazyGetETHTotalHistoryQuery();

    const { result } = renderHook(() => useStakedTxHistoryETH());

    act(() => {
      result.current.handleLoadTxHistory();
    });

    expect(refetch).toBeCalledTimes(1);
  });

  test('should return empty data', () => {
    (useLazyGetETHTotalHistoryQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: null,
        isFetching: true,
      },
    ]);

    const { result } = renderHook(() => useStakedTxHistoryETH());

    expect(result.current.hasHistory).toBe(true);
    expect(result.current.isHistoryLoading).toBe(true);
    expect(result.current.pendingUnstakeHistory).toStrictEqual([]);
    expect(result.current.stakedAETHB).toStrictEqual([]);
    expect(result.current.stakedAETHC).toStrictEqual([]);
    expect(result.current.pendingValue).toStrictEqual(ZERO);
  });
});
