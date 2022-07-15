import { useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';
import cloneDeep from 'lodash/cloneDeep';

import { t } from 'common';

import { HistoryDialogData } from 'modules/common/components/HistoryDialog';
import { Token } from 'modules/common/types/token';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { fetchTxHistory } from 'modules/stake-polkadot/actions/fetchTxHistory';
import { ETxTypes } from 'modules/stake-polkadot/api/PolkadotStakeSDK';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotTxLink } from 'modules/stake-polkadot/utils/getPolkadotTxLink';
import { useAppDispatch } from 'store/useAppDispatch';

import { useStakedPolkadotTxHistory } from '../useStakedPolkadotTxHistory';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('modules/stake-polkadot/actions/fetchTxHistory', () => ({
  fetchTxHistory: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: jest.fn(),
}));

/**
 *  TODO Please to add fixes for this after the "hook" stabilization (Polkadot Staking)
 */
describe('modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/Polkadot/useStakedPolkadotTxHistory', () => {
  const AMOUNT = new BigNumber('1.100000000000000000');
  const DATE_NOW = new Date();

  const txHashes = {
    txHash1: '121-2',
    txHash2: '122-2',
    txHash3: '123-2',
    txHash4: '124-2',
  };

  const defaultHistoryData = {
    completed: [
      {
        txAmount: AMOUNT,
        txDate: DATE_NOW,
        txHash: txHashes.txHash1,
        txType: ETxTypes.Staked,
      },
      {
        txAmount: AMOUNT.multipliedBy(2),
        txDate: DATE_NOW,
        txHash: txHashes.txHash2,
        txType: ETxTypes.Unstaked,
      },
    ],
    pending: [
      {
        txAmount: AMOUNT.multipliedBy(3),
        txDate: DATE_NOW,
        txHash: txHashes.txHash3,
        txType: ETxTypes.Unstaked,
      },
      {
        txAmount: AMOUNT.multipliedBy(4),
        txDate: DATE_NOW,
        txHash: txHashes.txHash4,
        txType: ETxTypes.Unstaked,
      },
    ],
  };

  const defaultQueryData = {
    data: cloneDeep(defaultHistoryData),
    loading: false,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultQueryData);

    (fetchTxHistory as jest.Mock).mockReturnValue(defaultHistoryData);

    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Case 1: Checking on empty data', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null, loading: true });

    const { result } = renderHook(() =>
      useStakedPolkadotTxHistory(EPolkadotNetworks.DOT),
    );

    expect(result.current.hasHistory).toBe(false);
    expect(result.current.isHistoryDataLoading).toBe(true);
    expect(result.current.pendingUnstakeHistory).toStrictEqual(
      [] as IPendingTableRow[],
    );
    expect(result.current.txHistory).toBeNull();

    expect(result.current.transactionHistory).toStrictEqual({
      staked: [],
      stakedToken: Token.DOT,
      unstaked: [],
      unstakedToken: Token.aDOTb,
    } as HistoryDialogData);
  });

  it('Case 2: Checking on available data', () => {
    const {
      completed: [COMPLETED_ONE, COMPLETED_TWO],
      pending: [PENDING_ONE, PENDING_TWO],
    } = defaultHistoryData;

    const date = t('format.date', { value: DATE_NOW });
    const time = t('format.time-short', { value: DATE_NOW });

    const { result } = renderHook(() =>
      useStakedPolkadotTxHistory(EPolkadotNetworks.DOT),
    );

    expect(result.current.hasHistory).toBe(true);
    expect(result.current.isHistoryDataLoading).toBe(false);
    expect(result.current.txHistory).toStrictEqual(defaultHistoryData);

    expect(result.current.pendingUnstakeHistory).toStrictEqual([
      {
        id: 1,
        amount: PENDING_ONE.txAmount,
        timerSlot: `${date}, ${time}`,
        token: Token.aDOTb,
      },
      {
        id: 2,
        amount: PENDING_TWO.txAmount,
        timerSlot: `${date}, ${time}`,
        token: Token.aDOTb,
      },
    ] as IPendingTableRow[]);

    expect(result.current.transactionHistory).toStrictEqual({
      staked: [
        {
          amount: COMPLETED_ONE.txAmount,
          date: COMPLETED_ONE.txDate,
          hash: COMPLETED_ONE.txHash,
          link: getPolkadotTxLink(EPolkadotNetworks.DOT, COMPLETED_ONE.txHash),
        },
      ],
      stakedToken: Token.DOT,
      unstaked: [
        {
          amount: COMPLETED_TWO.txAmount,
          date: COMPLETED_TWO.txDate,
          hash: COMPLETED_TWO.txHash,
          link: getPolkadotTxLink(EPolkadotNetworks.DOT, COMPLETED_TWO.txHash),
        },
      ],
      unstakedToken: Token.aDOTb,
    } as HistoryDialogData);
  });

  it('Case 3: Checking on history loading', () => {
    const mockDispatch = jest.fn();

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() =>
      useStakedPolkadotTxHistory(EPolkadotNetworks.DOT),
    );

    act(() => {
      result.current.handleLoadTxHistory();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });
});
