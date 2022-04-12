import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { useSwitcherData } from '..';

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
  useQuery: jest.fn(),
}));

jest.mock('modules/auth/hooks/useAuth', () => ({
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
    test('should has approve step', () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: { allowance: ZERO },
        loading: false,
      });

      const { result } = renderHook(() =>
        useSwitcherData({ from: Token.aETHb }),
      );

      expect(result.current.hasApprove).toBe(true);
    });
  });
});
