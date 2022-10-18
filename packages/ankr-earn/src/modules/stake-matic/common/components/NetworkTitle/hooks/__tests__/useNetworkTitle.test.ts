import { EEthereumNetworkId } from '@ankr.com/provider-core';
import { renderHook } from '@testing-library/react-hooks';

import { useAuth } from 'modules/auth/common/hooks/useAuth';

import { useNetworkTitle } from '../useNetworkTitle';

jest.mock('modules/auth/common/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('modules/stake-matic/common/components/NetworkTitle/hooks/useNetworkTitle', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      chainId: undefined,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return "null" data in common cases', () => {
    const { result } = renderHook(() => useNetworkTitle());

    expect(result.current.Icon).toBe(null);
    expect(result.current.text).toBe(null);
  });

  test('should return "null" data if invalid "chainId"', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      chainId: 1_000_000,
    }));

    const { result } = renderHook(() => useNetworkTitle());

    expect(result.current.Icon).toBe(null);
    expect(result.current.text).toBe(null);
  });

  test('should return valid data', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      chainId: EEthereumNetworkId.mainnet,
    }));

    const { result } = renderHook(() => useNetworkTitle());

    expect(typeof result.current.Icon === 'object').toBeTruthy();
    expect(typeof result.current.text === 'string').toBeTruthy();
  });
});
