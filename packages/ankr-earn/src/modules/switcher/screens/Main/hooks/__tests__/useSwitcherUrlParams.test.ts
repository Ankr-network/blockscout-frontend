import { act, renderHook } from '@testing-library/react-hooks';
import { useLocation, useHistory } from 'react-router';

import { BlockchainNetworkId } from 'provider';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { Token } from 'modules/common/types/token';

import { useSwitcherUrlParams } from '../useSwitcherUrlParams';

jest.mock('react-router', () => ({
  useLocation: jest.fn(),
  useHistory: jest.fn(),
}));

jest.mock('modules/auth/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('modules/switcher/screens/Main/hooks/useSwitcherUrlParams', () => {
  const history = { replace: jest.fn() };

  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({ search: '' });

    (useHistory as jest.Mock).mockReturnValue(history);

    (useAuth as jest.Mock).mockReturnValue({
      chainId: BlockchainNetworkId.mainnet,
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
