import { useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import { ONE_ETH, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { EBinancePoolEventsMap } from 'modules/stake-bnb/api/BinanceSDK';
import { IGetHistory } from 'modules/stake-fantom/actions/getHistory';
import { EFantomPoolEvents } from 'modules/stake-fantom/api/sdk';
import { useStakedFTMTxHistory } from '../useStakedFTMTxHistory';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/useStakedFTMTxHistory.ts', () => {
  const NOW = new Date();

  const defaultData: {
    loading: boolean;
    data: IGetHistory;
  } = {
    loading: false,
    data: {
      totalPending: ONE_ETH,
      stakeEvents: [
        {
          txAmount: ONE_ETH,
          txDate: NOW,
          txHash: 'txHash1',
          txType: EFantomPoolEvents.StakeReceived,
        },
      ],
      pendingEvents: [
        {
          txAmount: ONE_ETH.multipliedBy(3),
          txDate: NOW,
          txHash: 'txHash3',
          txType: EFantomPoolEvents.TokensBurned,
        },
      ],
      withdrawnEvents: [
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
    (useQuery as jest.Mock).mockReturnValue(defaultData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return tx history data', () => {
    const date = t('format.date', { value: NOW });
    const time = t('format.time-short', { value: NOW });
    const { result } = renderHook(() => useStakedFTMTxHistory());

    expect(result.current.hasHistory).toBe(true);
    expect(result.current.pendingUnstakeHistory).toStrictEqual([
      {
        id: NOW.getTime(),
        amount: ONE_ETH.multipliedBy(3),
        token: Token.aFTMb,
        timerSlot: `${date}, ${time}`,
      },
    ]);
    expect(result.current.staked).toStrictEqual([
      {
        amount: ONE_ETH,
        date: NOW,
        hash: 'txHash1',
        link: 'https://testnet.ftmscan.com/tx/txHash1',
      },
    ]);

    expect(result.current.unstaked).toStrictEqual([
      {
        amount: ONE_ETH.multipliedBy(3),
        date: NOW,
        hash: 'txHash3',
        link: 'https://testnet.ftmscan.com/tx/txHash3',
      },
    ]);
  });

  test('should return empty data', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, loading: true });

    const { result } = renderHook(() => useStakedFTMTxHistory());

    expect(result.current.hasHistory).toBe(true);
    expect(result.current.isHistoryLoading).toBe(true);
    expect(result.current.pendingUnstakeHistory).toStrictEqual([]);
    expect(result.current.staked).toStrictEqual([]);
    expect(result.current.unstaked).toStrictEqual([]);
    expect(result.current.pendingValue).toStrictEqual(ZERO);
  });
});
