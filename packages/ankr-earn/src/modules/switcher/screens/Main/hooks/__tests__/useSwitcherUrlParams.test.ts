import { act, renderHook } from '@testing-library/react-hooks';
import { useHistory, useLocation } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';

import { useSwitcherUrlParams } from '../useSwitcherUrlParams';

jest.mock('react-router', () => ({
  useHistory: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

jest.mock('modules/switcher/Routes', () => ({
  RoutesConfig: {
    main: {
      useParams: () => ({ from: null }),
      generatePath: () => '/switch',
    },
  },
}));

describe('modules/switcher/screens/Main/hooks/useSwitcherUrlParams', () => {
  beforeEach(() => {
    (useConnectedData as jest.Mock).mockReturnValue({
      chainId: EEthereumNetworkId.mainnet,
    });

    (useHistory as jest.Mock).mockReturnValue({
      replace: jest.fn(),
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
});
