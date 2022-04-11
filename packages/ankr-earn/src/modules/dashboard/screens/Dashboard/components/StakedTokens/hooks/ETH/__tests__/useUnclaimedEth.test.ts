import { useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { BlockchainNetworkId } from 'provider';

import { ZERO } from 'modules/common/const';

import { useUnclaimedEth } from '../useUnclaimedEth';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('modules/stake-eth/Routes', () => ({
  RoutesConfig: {
    root: '/stake/ethereum',
  },
}));

describe('modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/ETH/useUnclaimedEth', () => {
  const defaultData = {
    loading: false,
    error: undefined,
    data: {
      claimableAETHB: new BigNumber(2),
    },
  };

  test('should return tx history data', () => {
    (useQuery as jest.Mock).mockReturnValue(defaultData);

    const { result } = renderHook(() => useUnclaimedEth());

    expect(result.current.amount).toStrictEqual(new BigNumber(2));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.chainId).toBe(BlockchainNetworkId.goerli);
    expect(result.current.isShowed).toBe(true);
    expect(result.current.token).toBe('ETH');
    expect(result.current.claimLink).toBe('/stake/ethereum');
  });

  test('unclaimed ETH should not be showed if zero amount', () => {
    (useQuery as jest.Mock).mockReturnValue({
      ...defaultData,
      data: {
        claimableAETHB: ZERO,
      },
    });
    const { result } = renderHook(() => useUnclaimedEth());

    expect(result.current.isShowed).toBe(false);
  });

  test('unclaimed ETH should be showed if zero amount and is loading', () => {
    (useQuery as jest.Mock).mockReturnValue({
      ...defaultData,
      loading: true,
      data: {
        claimableAETHB: ZERO,
      },
    });
    const { result } = renderHook(() => useUnclaimedEth());

    expect(result.current.isShowed).toBe(true);
  });
});
