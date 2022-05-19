import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';

import { useStakeFantomStepsHook } from '../useStakeFantomStepsHook';

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

jest.mock('modules/api/ProviderManagerSingleton', () => ({
  ProviderManagerSingleton: { getInstance: jest.fn() },
}));

describe('modules/stake-fantom/screens/StakeFantomSteps/useStakeFantomStepsHook', () => {
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
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return intial data', async () => {
    const { result } = renderHook(() => useStakeFantomStepsHook());

    expect(result.current.transactionId).toBe(
      '0xbef62debf29d8f91311ea9916c5e80ecbb358719860698bcb3041a0d397169e3',
    );
    expect(result.current.tokenName).toBe('aFTMb');
    expect(result.current.amount).toStrictEqual(new BigNumber('1'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isPending).toBe(false);
    expect(result.current.destination).toBe(
      '0xEdef5C8a69f086099e14746F5A5c0B1Dd4d0054C',
    );
    expect(result.current.error).toBeUndefined();
  });

  test('should return error if there is provider error', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      error: new Error('error'),
    }));

    const { result } = renderHook(() => useStakeFantomStepsHook());

    expect(result.current.error).toBeDefined();
  });

  test('should return error if there is transaction fail error', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      data: { status: false },
    }));

    const { result } = renderHook(() => useStakeFantomStepsHook());

    expect(result.current.error?.message).toBe(TxErrorCodes.TX_FAILED);
  });
});
