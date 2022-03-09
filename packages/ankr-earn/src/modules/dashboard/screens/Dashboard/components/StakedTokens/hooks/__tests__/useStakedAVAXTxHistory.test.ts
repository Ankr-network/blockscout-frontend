import { useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { ONE_ETH as ONE } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { EAvalanchePoolEventsMap } from 'modules/stake-avax/api/AvalancheSDK';

import { useStakedAVAXTxHistory } from '../useStakedAVAXTxHistory';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('modules/auth/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/useStakedAVAXTxHistory', () => {
  const NOW = new Date();

  const defaultData = {
    loading: false,
    data: {
      completed: [
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
      pending: [
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
    (useAuth as jest.Mock).mockReturnValue({ chainId: 43114 });

    (useQuery as jest.Mock).mockReturnValue(defaultData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return tx history data', () => {
    const date = t('format.date', { value: NOW });
    const time = t('format.time-short', { value: NOW });

    const { result } = renderHook(() => useStakedAVAXTxHistory());

    expect(result.current.txHistory).toStrictEqual(defaultData.data);
    expect(result.current.hasHistory).toBe(true);
    expect(result.current.pendingUnstakeHistory).toStrictEqual([
      {
        id: 1,
        amount: ONE.multipliedBy(3),
        token: Token.aAVAXb,
        timerSlot: `${date}, ${time}`,
      },
    ]);
    expect(result.current.transactionHistory).toStrictEqual({
      token: Token.aAVAXb,
      staked: [
        {
          amount: ONE,
          date: NOW,
          hash: 'txHash1',
          link: 'https://snowtrace.io/tx/txHash1',
        },
      ],
      unstaked: [
        {
          amount: ONE.multipliedBy(2),
          date: NOW,
          hash: 'txHash2',
          link: 'https://snowtrace.io/tx/txHash2',
        },
      ],
    });
  });

  test('should return empty data', () => {
    (useAuth as jest.Mock).mockReturnValue({ chainId: undefined });
    (useQuery as jest.Mock).mockReturnValue({ data: null, loading: true });

    const { result } = renderHook(() => useStakedAVAXTxHistory());

    expect(result.current.txHistory).toBeNull();
    expect(result.current.hasHistory).toBe(false);
    expect(result.current.isHistoryDataLoading).toBe(true);
    expect(result.current.pendingUnstakeHistory).toStrictEqual([]);
    expect(result.current.transactionHistory).toStrictEqual({
      token: Token.aAVAXb,
      staked: [],
      unstaked: [],
    });
  });
});
