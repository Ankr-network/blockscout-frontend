import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';

import { useStakeEthereumStepsHook } from '../useStakeEthereumStepsHook';

jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
  useQuery: jest.fn(),
}));

jest.mock('@redux-requests/core', () => ({
  resetRequests: jest.fn(),
  stopPolling: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('modules/stake-eth/Routes', () => ({
  RoutesConfig: {
    claim: { path: '/claim' },
  },
}));

jest.mock('modules/auth/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

describe('modules/stake-eth/screens/StakeEthereumSteps/useStakeEthereumStepsHook', () => {
  const defaultQueryAction = {
    loading: false,
    data: undefined,
    stopPolling: jest.fn(),
  };

  const defaultQueryTxData = {
    ...defaultQueryAction,
    data: {
      isPending: true,
      amount: new BigNumber(1),
      destinationAddress: '0x2c6Ecc9e5b5397f3917A0E987A29FBdcBB674814',
    },
  };

  const defaultQueryCommonData = {
    ...defaultQueryAction,
    data: {
      ethBalance: new BigNumber(5),
      aETHcRatio: new BigNumber(0.5),
    },
  };

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      txHash:
        '0x496fecc71333ba873bd0d1dd7d781a7d1cd212072b8b0e7d21deecd3cfaffcf4',
      tokenOut: 'aETHb',
    });

    (useConnectedData as jest.Mock).mockReturnValue({
      chainId: 5,
      address: 'address',
    });

    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());

    (useQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      stopPolling: jest.fn(),
      data: {
        ...defaultQueryTxData.data,
        ...defaultQueryCommonData.data,
      },
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return intial data', () => {
    const { result } = renderHook(() => useStakeEthereumStepsHook());
    expect(result.current.transactionId).toBe(
      '0x496fecc71333ba873bd0d1dd7d781a7d1cd212072b8b0e7d21deecd3cfaffcf4',
    );
    expect(result.current.amount).toStrictEqual(new BigNumber(1));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isPending).toBe(false);
    expect(result.current.destination).toBe(
      '0x2c6Ecc9e5b5397f3917A0E987A29FBdcBB674814',
    );
    expect(result.current.error).toBeUndefined();
  });

  test('should return correct aETHc amount', async () => {
    (useParams as jest.Mock).mockReturnValue({
      tokenOut: 'aETHc',
    });

    const { result } = renderHook(() => useStakeEthereumStepsHook());

    expect(result.current.amount).toStrictEqual(new BigNumber('0.5'));
  });

  test('should return correct aETHb amount', async () => {
    (useParams as jest.Mock).mockReturnValue({
      tokenOut: 'aETHb',
    });

    const { result } = renderHook(() => useStakeEthereumStepsHook());

    expect(result.current.amount).toStrictEqual(new BigNumber('1'));
  });

  test('should return error if there is provider error', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      error: new Error('error'),
    }));

    const { result } = renderHook(() => useStakeEthereumStepsHook());

    expect(result.current.error).toBeDefined();
  });

  test('should return error if there is transaction fail error', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      data: { status: false },
    });

    const { result } = renderHook(() => useStakeEthereumStepsHook());

    expect(result.current.error?.message).toBe(TxErrorCodes.TX_FAILED);
  });
});
