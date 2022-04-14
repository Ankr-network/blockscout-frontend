import { renderHook } from '@testing-library/react-hooks';

import { Token } from 'modules/common/types/token';
import { RoutesConfig } from 'modules/stake-eth/Routes';

import { useSelectedToken } from '../useSelectedToken';

jest.mock('modules/stake-eth/Routes', () => ({
  RoutesConfig: {
    stake: {
      generatePath: jest.fn(),
      useParams: jest.fn(),
    },
  },
}));

jest.mock('react-router', () => ({
  useHistory: () => ({ replace: jest.fn() }),
}));

describe('modules/stake-eth/screens/StakeEthereum/hooks/useSelectedToken', () => {
  test('should return aETHb as default selected token', () => {
    (RoutesConfig.stake.useParams as jest.Mock).mockReturnValue({
      token: 'fdsf',
    });

    const { result } = renderHook(() => useSelectedToken());
    const { selectedToken, handleTokenSelect } = result.current;

    expect(selectedToken).toBe(Token.aETHb);
    expect(handleTokenSelect).toBeDefined();
  });

  test('should return aETHc selected token', () => {
    (RoutesConfig.stake.useParams as jest.Mock).mockReturnValue({
      token: 'aETHc',
    });

    const { result } = renderHook(() => useSelectedToken());
    const { selectedToken } = result.current;

    expect(selectedToken).toBe(Token.aETHc);
  });
});
