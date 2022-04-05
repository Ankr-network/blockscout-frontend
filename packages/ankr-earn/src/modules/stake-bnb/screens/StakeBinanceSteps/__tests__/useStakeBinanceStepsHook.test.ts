import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';

import { useStakeBinanceStepsHook } from '../useStakeBinanceStepsHook';

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

jest.mock('modules/auth/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

jest.mock('modules/api/ProviderManagerSingleton', () => ({
  ProviderManagerSingleton: { getInstance: jest.fn() },
}));

describe('modules/stake-bnb/screens/StakeBinanceSteps/useStakeBinanceStepsHook', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockImplementation(() => ({
      txHash:
        '0x6d371b345d14faf0600bd9d813f001d09feace3a4621ed201150f8fb2084d347',
      tokenOut: 'aBNBb',
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
        amount: new BigNumber('0.12'),
        destinationAddress: '0x3C9205b5d4B312cA7C4d28110C91Fe2c74718a94',
      },
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return intial data', async () => {
    const { result } = renderHook(() => useStakeBinanceStepsHook());

    expect(result.current.transactionId).toBe(
      '0x6d371b345d14faf0600bd9d813f001d09feace3a4621ed201150f8fb2084d347',
    );
    expect(result.current.amount).toStrictEqual(new BigNumber('0.12'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isPending).toBe(false);
    expect(result.current.destination).toBe(
      '0x3C9205b5d4B312cA7C4d28110C91Fe2c74718a94',
    );
    expect(result.current.error).toBeUndefined();
  });

  // todo: add case with aBNBc value

  test('should return error if there is provider error', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      error: new Error('error'),
    }));

    const { result } = renderHook(() => useStakeBinanceStepsHook());

    expect(result.current.error).toBeDefined();
  });

  test('should return error if there is transaction fail error', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      data: { status: false },
    }));

    const { result } = renderHook(() => useStakeBinanceStepsHook());

    expect(result.current.error?.message).toBe(TxErrorCodes.TX_FAILED);
  });
});
