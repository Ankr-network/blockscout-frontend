import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { ONE_ETH, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { useSwitcherData } from '..';

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
  useQuery: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('modules/switcher/screens/Main/useSwitcherData', () => {
  beforeEach(() => {
    const dispatchRequest = jest.fn(() => Promise.resolve({}));
    (useDispatchRequest as jest.Mock).mockReturnValue(dispatchRequest);

    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
    });

    (useAuth as jest.Mock).mockReturnValue({ chainId: 1 });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useSwitcherData({ from: Token.aETHb }));
    const {
      ratio,
      chainId,
      allowance,
      acBalance,
      abBalance,
      isDataLoading,
      balance,
    } = result.current;

    expect(ratio.toFixed()).toBe('1');
    expect(chainId).toBe(1);
    expect(allowance.toFixed()).toBe('0');
    expect(acBalance).toBeUndefined();
    expect(abBalance).toBeUndefined();
    expect(isDataLoading).toBe(false);
    expect(balance.toFixed()).toBe('0');
  });

  describe('allowance', () => {
    test('should check allowance', () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: { allowance: ZERO, acBalance: ZERO, abBalance: ZERO },
        loading: false,
      });

      const { result } = renderHook(() =>
        useSwitcherData({ from: Token.aETHc }),
      );

      expect(result.current.checkAllowance(ZERO)).toBe(true);
    });

    test('should check allowance and return false for ab tokens', () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: { allowance: ZERO, acBalance: ZERO, abBalance: ZERO },
        loading: false,
      });

      const { result } = renderHook(() =>
        useSwitcherData({ from: Token.aBNBb }),
      );

      expect(result.current.checkAllowance(ZERO)).toBe(false);
    });

    test('should check allowance for non-zero values', () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: { allowance: ONE_ETH, acBalance: ZERO, abBalance: ZERO },
        loading: false,
      });

      const { result } = renderHook(() =>
        useSwitcherData({ from: Token.aETHc }),
      );

      expect(result.current.checkAllowance(new BigNumber(1))).toBe(false);
      expect(result.current.checkAllowance(new BigNumber(1.1))).toBe(true);
    });
  });
});
