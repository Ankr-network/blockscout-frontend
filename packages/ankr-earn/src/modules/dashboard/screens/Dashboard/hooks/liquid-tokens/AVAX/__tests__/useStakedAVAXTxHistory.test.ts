import { t } from '@ankr.com/common';
import { act, renderHook } from '@testing-library/react-hooks';

import { EAvalanchePoolEventsMap } from '@ankr.com/staking-sdk';

import { IHistoryDialogData } from 'modules/common/components/HistoryDialog';
import { ONE_ETH as ONE } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useLazyGetAVAXTotalHistoryDataQuery } from 'modules/stake-avax/actions/fetchTotalHistoryData';

import { useStakedAVAXTxHistory } from '../useStakedAVAXTxHistory';

jest.mock('modules/stake-avax/actions/fetchTotalHistoryData', () => ({
  useLazyGetAVAXTotalHistoryDataQuery: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useProviderEffect', () => ({
  useProviderEffect: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/hooks/liquid-tokens/AVAX/useStakedAVAXTxHistory', () => {
  const NOW = new Date();

  const defaultData = {
    isFetching: false,
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
    refetch: jest.fn(),
  };

  beforeEach(() => {
    (useLazyGetAVAXTotalHistoryDataQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      defaultData,
    ]);
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
    const [refetch] = useLazyGetAVAXTotalHistoryDataQuery();
    const { result } = renderHook(() => useStakedAVAXTxHistory());

    act(() => {
      result.current.handleLoadTxHistory();
    });

    expect(refetch).toBeCalledTimes(1);
  });

  test('should return empty data', () => {
    (useLazyGetAVAXTotalHistoryDataQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: null,
        isFetching: true,
      },
    ]);

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
