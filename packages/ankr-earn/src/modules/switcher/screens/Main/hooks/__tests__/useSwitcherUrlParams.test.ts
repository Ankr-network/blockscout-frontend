import { EEthereumNetworkId } from '@ankr.com/provider-core';
import { act, renderHook } from '@testing-library/react-hooks';
import { useLocation, useHistory } from 'react-router';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';

import { useSwitcherUrlParams } from '../useSwitcherUrlParams';

jest.mock('react-router', () => ({
  useLocation: jest.fn(),
  useHistory: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

describe('modules/switcher/screens/Main/hooks/useSwitcherUrlParams', () => {
  const history = { replace: jest.fn() };

  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({ search: '' });

    (useHistory as jest.Mock).mockReturnValue(history);

    (useConnectedData as jest.Mock).mockReturnValue({
      chainId: EEthereumNetworkId.mainnet,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useSwitcherUrlParams());

    expect(result.current.from).toBe(Token.aETHb);
    expect(result.current.to).toBe(Token.aETHc);
    expect(result.current.onChangeFrom).toBeDefined();
    expect(result.current.onChangeTo).toBeDefined();
  });

  test('should return unique "from" and "to"', () => {
    (useLocation as jest.Mock).mockReturnValue({
      search: '?from=aETHb&to=aETHb',
    });

    const { result } = renderHook(() => useSwitcherUrlParams());

    expect(result.current.from).toBe(Token.aETHb);
    expect(result.current.to).toBe(Token.aETHc);
  });

  test('should return unique "from" and "to" in an opposite order', () => {
    (useLocation as jest.Mock).mockReturnValue({
      search: '?from=aBNBc&to=aBNBc',
    });

    const { result } = renderHook(() => useSwitcherUrlParams());

    expect(result.current.from).toBe(Token.aBNBc);
    expect(result.current.to).toBe(Token.aBNBb);
  });

  test('should return initial data for binance chain', () => {
    (useConnectedData as jest.Mock).mockReturnValue({
      chainId: EEthereumNetworkId.smartchain,
    });

    const { result } = renderHook(() => useSwitcherUrlParams());

    expect(result.current.from).toBe(Token.aBNBb);
    expect(result.current.to).toBe(Token.aBNBc);
    expect(result.current.onChangeFrom).toBeDefined();
    expect(result.current.onChangeTo).toBeDefined();
  });

  test('should change params properly', () => {
    const { result } = renderHook(() => useSwitcherUrlParams());

    act(() => {
      result.current.onChangeFrom(Token.aETHc);
      result.current.onChangeTo(Token.aETHb);
    });

    expect(history.replace).toBeCalledTimes(2);
    expect(history.replace).toHaveBeenLastCalledWith({
      search: 'from=aETHc&to=aETHb',
    });
  });

  test('should not change wrong params', () => {
    const { result } = renderHook(() => useSwitcherUrlParams());

    act(() => {
      result.current.onChangeFrom('wrong1');
      result.current.onChangeTo('wrong2');
    });

    expect(history.replace).toBeCalledTimes(1);
    expect(history.replace).toHaveBeenLastCalledWith({
      search: 'from=aETHb&to=aETHc',
    });
  });
});
