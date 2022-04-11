import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { ONE_ETH, ZERO } from 'modules/common/const';
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
      aethBalance,
      fethBalance,
      isDataLoading,
      balance,
    } = result.current;

    expect(ratio.toNumber()).toBe(ONE_ETH.toNumber());
    expect(chainId).toBe(1);
    expect(allowance.toNumber()).toBe(0);
    expect(aethBalance).toBeUndefined();
    expect(fethBalance).toBeUndefined();
    expect(isDataLoading).toBe(false);
    expect(balance.toNumber()).toBe(0);
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
