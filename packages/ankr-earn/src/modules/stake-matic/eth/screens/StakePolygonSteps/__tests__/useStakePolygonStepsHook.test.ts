import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { useAddMaticOnEthTokenToWalletMutation } from 'modules/stake-matic/eth/actions/useAddMaticOnEthTokenToWalletMutation';
import { useGetMaticOnEthStatsQuery } from 'modules/stake-matic/eth/actions/useGetMaticOnEthStatsQuery';
import {
  useGetMaticOnEthTxDataQuery,
  useGetMaticOnEthTxReceiptQuery,
} from 'modules/stake-matic/eth/actions/useGetMaticOnEthTxDataQuery';

import { useStakePolygonStepsHook } from '../useStakePolygonStepsHook';

jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
  useQuery: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

jest.mock(
  'modules/stake-matic/eth/actions/useAddMaticOnEthTokenToWalletMutation',
  () => ({
    useAddMaticOnEthTokenToWalletMutation: jest.fn(),
  }),
);

jest.mock(
  'modules/stake-matic/eth/actions/useGetMaticOnEthTxDataQuery',
  () => ({
    useGetMaticOnEthTxDataQuery: jest.fn(),
    useGetMaticOnEthTxReceiptQuery: jest.fn(),
  }),
);

jest.mock('modules/stake-matic/eth/actions/useGetMaticOnEthStatsQuery', () => ({
  useGetMaticOnEthStatsQuery: jest.fn(),
}));

jest.mock('@ankr.com/staking-sdk', () => ({
  ProviderManagerSingleton: { getInstance: jest.fn() },
}));

describe('modules/stake-matic/eth/screens/StakePolygonSteps/useStakePolygonStepsHook', () => {
  const defaultQueryData = {
    isFetching: false,
    data: {
      isPending: true,
      amount: new BigNumber('1'),
      destinationAddress: '0xEdef5C8a69f086099e14746F5A5c0B1Dd4d0054C',
    },
  };

  beforeEach(() => {
    (useParams as jest.Mock).mockImplementation(() => ({
      txHash:
        '0xbef62debf29d8f91311ea9916c5e80ecbb358719860698bcb3041a0d397169e3',
    }));

    (useConnectedData as jest.Mock).mockImplementation(() => ({
      chainId: 97,
      address: 'address',
    }));

    (useDispatchRequest as jest.Mock).mockImplementation(() => jest.fn());

    (useQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      stopPolling: jest.fn(),
      data: {
        isPending: true,
        amount: new BigNumber('1'),
        destinationAddress: '0xEdef5C8a69f086099e14746F5A5c0B1Dd4d0054C',
      },
    }));
    (useAddMaticOnEthTokenToWalletMutation as jest.Mock).mockReturnValue([
      jest.fn(),
    ]);
    (useGetMaticOnEthTxDataQuery as jest.Mock).mockReturnValue(
      defaultQueryData,
    );
    (useGetMaticOnEthTxReceiptQuery as jest.Mock).mockReturnValue(
      defaultQueryData,
    );
    (useGetMaticOnEthStatsQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
      refetch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return intial data', async () => {
    const { result } = renderHook(() => useStakePolygonStepsHook());

    expect(result.current.transactionId).toBe(
      '0xbef62debf29d8f91311ea9916c5e80ecbb358719860698bcb3041a0d397169e3',
    );
    expect(result.current.amount).toStrictEqual(new BigNumber('1'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isPending).toBe(false);
    expect(result.current.destination).toBe(
      '0xEdef5C8a69f086099e14746F5A5c0B1Dd4d0054C',
    );
    expect(result.current.error).toBeUndefined();
  });

  test('should return error if there is provider error', async () => {
    (useGetMaticOnEthTxDataQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      error: new Error('error'),
    }));

    const { result } = renderHook(() => useStakePolygonStepsHook());

    expect(result.current.error).toBeDefined();
  });

  test('should return error if there is transaction fail error', async () => {
    (useGetMaticOnEthTxReceiptQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      data: { status: false },
    }));

    const { result } = renderHook(() => useStakePolygonStepsHook());

    expect((result.current.error as Error)?.message).toBe(
      TxErrorCodes.TX_FAILED,
    );
  });
});
