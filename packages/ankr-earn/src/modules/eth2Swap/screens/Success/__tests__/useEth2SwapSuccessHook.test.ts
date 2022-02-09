import { act, renderHook } from '@testing-library/react-hooks';
import { useDispatchRequest } from '@redux-requests/react';
import { useParams } from 'react-router';

import { AvailableProviders } from 'provider/providerManager/types';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { addEth2SwapTokenToWallet } from 'modules/eth2Swap/actions/wallet';
import { useEth2SwapSuccessHook } from '../useEth2SwapSuccessHook';

jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
}));

jest.mock('modules/auth/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('modules/eth2Swap/actions/wallet', () => ({
  addEth2SwapTokenToWallet: jest.fn(),
}));

describe('modules/eth2Swap/screens/Success/useEth2SwapSuccessHook', () => {
  beforeEach(() => {
    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());

    (useParams as jest.Mock).mockReturnValue({
      swapOption: 'aETHb',
      txHash: 'hash',
    });

    (useAuth as jest.Mock).mockReturnValue({ chainId: 1 });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useEth2SwapSuccessHook());

    expect(result.current.chainId).toBe(1);
    expect(result.current.swapOption).toBe('aETHb');
    expect(result.current.txHash).toBe('hash');
    expect(result.current.handleAddTokenToWallet).toBeDefined();
  });

  test('should handle add token to wallet', async () => {
    const { result } = renderHook(() => useEth2SwapSuccessHook());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(addEth2SwapTokenToWallet).toBeCalledTimes(1);
    expect(addEth2SwapTokenToWallet).toBeCalledWith({
      swapOption: 'aETHb',
      providerId: AvailableProviders.ethCompatible,
    });
  });
});
