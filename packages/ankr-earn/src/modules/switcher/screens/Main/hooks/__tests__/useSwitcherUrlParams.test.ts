import { act, renderHook } from '@testing-library/react-hooks';
import { useHistory, useLocation } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';

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
      search: '?from=aFTMc&to=aFTMc',
    });

    const { result } = renderHook(() => useSwitcherUrlParams());

    expect(result.current.from).toBe(Token.aFTMc);
    expect(result.current.to).toBe(Token.aFTMb);
  });

  test('should return initial data for fantom chain', () => {
    (useConnectedData as jest.Mock).mockReturnValue({
      chainId: EEthereumNetworkId.fantom,
    });

    const { result } = renderHook(() => useSwitcherUrlParams());

    expect(result.current.from).toBe(Token.aFTMb);
    expect(result.current.to).toBe(Token.aFTMc);
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
