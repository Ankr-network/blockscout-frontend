import { renderHook } from '@testing-library/react-hooks';

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
  beforeEach(() => {
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
});
