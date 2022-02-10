import { renderHook } from '@testing-library/react-hooks';
import { useQuery } from '@redux-requests/react';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { Token } from 'modules/common/types/token';
import { ONE_ETH } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { EPolygonPoolEventsMap } from 'modules/stake-polygon/api/PolygonSDK';
import { useStakedMaticTxHistory } from '../useStakedMaticTxHistory';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('modules/auth/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedCard/useTxHistory', () => {
  const NOW = new Date();

  const defaultData = {
    loading: false,
    data: {
      completed: [
        {
          txAmount: ONE_ETH,
          txDate: NOW,
          txHash: 'txHash1',
          txType: EPolygonPoolEventsMap.StakePending,
        },
        {
          txAmount: ONE_ETH.multipliedBy(2),
          txDate: NOW,
          txHash: 'txHash2',
          txType: EPolygonPoolEventsMap.MaticClaimPending,
        },
      ],
      pending: [
        {
          txAmount: ONE_ETH.multipliedBy(3),
          txDate: NOW,
          txHash: 'txHash3',
          txType: EPolygonPoolEventsMap.MaticClaimPending,
        },
        {
          txAmount: ONE_ETH.multipliedBy(4),
          txDate: NOW,
          txHash: 'txHash4',
          txType: EPolygonPoolEventsMap.StakePending,
        },
      ],
    },
  };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ chainId: 1 });

    (useQuery as jest.Mock).mockReturnValue(defaultData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return tx history data', () => {
    const date = t('format.date', { value: NOW });
    const time = t('format.time-short', { value: NOW });
    const { result } = renderHook(() => useStakedMaticTxHistory());

    expect(result.current.txHistory).toStrictEqual(defaultData.data);
    expect(result.current.hasHistory).toBe(true);
    expect(result.current.pendingUnstakeHistory).toStrictEqual([
      {
        id: 1,
        amount: ONE_ETH.multipliedBy(3),
        token: Token.aMATICb,
        timerSlot: `${date}, ${time}`,
      },
    ]);
    expect(result.current.transactionHistory).toStrictEqual({
      token: Token.aMATICb,
      staked: [
        {
          amount: ONE_ETH,
          date: NOW,
          hash: 'txHash1',
          link: 'https://etherscan.io/tx/txHash1',
        },
      ],
      unstaked: [
        {
          amount: ONE_ETH.multipliedBy(2),
          date: NOW,
          hash: 'txHash2',
          link: 'https://etherscan.io/tx/txHash2',
        },
      ],
    });
  });

  test('should return empty data', () => {
    (useAuth as jest.Mock).mockReturnValue({ chainId: undefined });
    (useQuery as jest.Mock).mockReturnValue({ data: null, loading: true });

    const { result } = renderHook(() => useStakedMaticTxHistory());

    expect(result.current.txHistory).toBeNull();
    expect(result.current.hasHistory).toBe(false);
    expect(result.current.isHistoryDataLoading).toBe(true);
    expect(result.current.pendingUnstakeHistory).toStrictEqual([]);
    expect(result.current.transactionHistory).toStrictEqual({
      token: Token.aMATICb,
      staked: [],
      unstaked: [],
    });
  });
});
