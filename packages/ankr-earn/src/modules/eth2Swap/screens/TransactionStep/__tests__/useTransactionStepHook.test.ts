import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useConnectedData } from 'modules/auth/hooks/useConnectedData';

import { useTransactionStepHook } from '../useTransactionStepHook';

jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
  useQuery: jest.fn(),
}));

jest.mock('modules/auth/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

jest.mock('modules/api/ProviderManagerSingleton', () => ({
  ProviderManagerSingleton: { getInstance: jest.fn() },
}));

describe('modules/eth2Swap/screens/Progress/useTransactionStepHook', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockImplementation(() => ({
      swapOption: 'aETHc',
      txHash: 'hash',
    }));

    (useConnectedData as jest.Mock).mockImplementation(() => ({
      chainId: 1,
      address: 'address',
    }));

    (useDispatchRequest as jest.Mock).mockImplementation(() => jest.fn());

    (useQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      data: {
        amount: new BigNumber('8.4919'),
        destinationAddress: '0xe64FCf6327bB016955EFd36e75a852085270c374',
      },
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return intial data', async () => {
    const { result } = renderHook(() => useTransactionStepHook());

    expect(result.current.txHash).toBe('hash');
    expect(result.current.symbol).toBe('aETHb');
    expect(result.current.amount).toStrictEqual(new BigNumber('8.4919'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.destinationAddress).toBe(
      '0xe64FCf6327bB016955EFd36e75a852085270c374',
    );
    expect(result.current.error).toBeUndefined();
  });

  test('should handle adding token to wallet properly', async () => {
    const mockDispatch = jest.fn();

    (useDispatchRequest as jest.Mock).mockImplementation(() => mockDispatch);

    const { result } = renderHook(() => useTransactionStepHook());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(mockDispatch).toBeCalledTimes(2);
  });

  test('should return error if there is provider error', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      error: new Error('error'),
    }));

    const { result } = renderHook(() => useTransactionStepHook());

    expect(result.current.error).toBeDefined();
  });
});
