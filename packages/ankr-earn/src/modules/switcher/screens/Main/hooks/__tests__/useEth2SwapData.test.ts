import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { ONE_ETH, ZERO } from 'modules/common/const';

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
    const { result } = renderHook(() => useSwitcherData());
    const {
      ratio,
      chainId,
      allowance,
      aethBalance,
      fethBalance,
      isDataLoading,
      swapOption,
      balance,
      handleChooseAEthB,
      handleChooseAEthC,
    } = result.current;

    expect(ratio.toNumber()).toBe(ONE_ETH.toNumber());
    expect(chainId).toBe(1);
    expect(allowance.toNumber()).toBe(0);
    expect(aethBalance).toBeUndefined();
    expect(fethBalance).toBeUndefined();
    expect(isDataLoading).toBe(false);
    expect(swapOption).toBeDefined();
    expect(balance.toNumber()).toBe(0);
    expect(handleChooseAEthB).toBeDefined();
    expect(handleChooseAEthC).toBeDefined();
  });

  describe('swap option', () => {
    test('should change swap option properly', () => {
      const { result } = renderHook(() => useSwitcherData());
      const { handleChooseAEthB, handleChooseAEthC } = result.current;

      expect(result.current.swapOption).toBe('aETHb');

      act(() => handleChooseAEthC());

      expect(result.current.swapOption).toBe('aETHc');

      act(() => handleChooseAEthB());

      expect(result.current.swapOption).toBe('aETHb');
    });
  });

  describe('allowance', () => {
    test('should has approve step', () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: { allowance: ZERO },
        loading: false,
      });

      const { result } = renderHook(() => useSwitcherData());

      expect(result.current.hasApprove).toBe(true);
    });
  });
});
