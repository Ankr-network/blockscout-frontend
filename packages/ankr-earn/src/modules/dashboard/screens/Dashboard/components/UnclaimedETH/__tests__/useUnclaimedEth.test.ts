import { useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { EEthereumNetworkId } from 'common';

import { useUnclaimedEth } from '../useUnclaimedEth';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('modules/stake-eth/Routes', () => ({
  RoutesConfig: {
    root: '/stake/ethereum',
    claim: {
      generatePath: () => '/claim/ethereum',
    },
  },
}));

describe('modules/dashboard/screens/Dashboard/components/UnclaimedETH/useUnclaimedEth', () => {
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
    expect(result.current.chainId).toBe(EEthereumNetworkId.goerli);
    expect(result.current.token).toBe('ETH');
    expect(result.current.claimLink).toBe('/claim/ethereum');
  });
});
