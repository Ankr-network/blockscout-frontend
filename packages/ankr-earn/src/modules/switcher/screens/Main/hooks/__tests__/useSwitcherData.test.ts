import { useDispatchRequest } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ONE_ETH, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetSwitcherDataQuery } from 'modules/switcher/actions/getSwitcherData';

import { useSwitcherData } from '..';

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

jest.mock('modules/switcher/actions/getSwitcherData', () => ({
  useGetSwitcherDataQuery: jest.fn(),
}));

describe('modules/switcher/screens/Main/useSwitcherData', () => {
  beforeEach(() => {
    const dispatchRequest = jest.fn(() => Promise.resolve({}));
    (useDispatchRequest as jest.Mock).mockReturnValue(dispatchRequest);

    (useGetSwitcherDataQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
    });

    (useConnectedData as jest.Mock).mockReturnValue({ chainId: 1 });
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
      (useGetSwitcherDataQuery as jest.Mock).mockReturnValue({
        data: { allowance: ZERO, acBalance: ZERO, abBalance: ZERO },
        isFetching: false,
      });

      const { result } = renderHook(() =>
        useSwitcherData({ from: Token.aETHc }),
      );

      expect(result.current.checkAllowance(ZERO)).toBe(true);
    });

    test('should check allowance and return false for ab tokens', () => {
      (useGetSwitcherDataQuery as jest.Mock).mockReturnValue({
        data: { allowance: ZERO, acBalance: ZERO, abBalance: ZERO },
        isFetching: false,
      });

      const { result } = renderHook(() =>
        useSwitcherData({ from: Token.aETHb }),
      );

      expect(result.current.checkAllowance(ZERO)).toBe(false);
    });

    test('should check allowance for non-zero values', () => {
      (useGetSwitcherDataQuery as jest.Mock).mockReturnValue({
        data: { allowance: ONE_ETH, acBalance: ZERO, abBalance: ZERO },
        isFetching: false,
      });

      const { result } = renderHook(() =>
        useSwitcherData({ from: Token.aETHc }),
      );

      expect(result.current.checkAllowance(new BigNumber(1))).toBe(false);
      expect(result.current.checkAllowance(new BigNumber(1.1))).toBe(true);
    });
  });
});
