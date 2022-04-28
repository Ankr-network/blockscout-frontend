import { useMutation, useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { featuresConfig } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { useStakableEth } from '../useStakableEth';

jest.mock('modules/auth/common/components/GuardRoute/useNetworks', () => ({
  useNetworks: () => [
    {
      title: 'mainnet',
      chainId: 1,
    },
    {
      title: 'goerli',
      chainId: 5,
    },
  ],
}));

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('modules/stake-eth/Routes', () => ({
  RoutesConfig: {
    stake: { generatePath: () => '/stake' },
  },
}));

describe('modules/dashboard/screens/Dashboard/components/StakableTokens/hooks/useStakableEth', () => {
  const defaultQueryAction = {
    loading: false,
    data: undefined,
  };

  const defaultQueryApy = {
    ...defaultQueryAction,
    data: 4,
  };

  const defaultQueryCommonData = {
    ...defaultQueryAction,
    data: {
      ethBalance: new BigNumber(3),
      aETHbBalance: new BigNumber(1),
      aETHcBalance: new BigNumber(0),
      minStake: new BigNumber(0.5),
      aETHcRatio: new BigNumber(0.3),
    },
  };

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue(defaultQueryAction);
    (useQuery as jest.Mock)
      .mockReturnValueOnce(defaultQueryApy)
      .mockReturnValueOnce(defaultQueryCommonData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return ', () => {
    const { result } = renderHook(() => useStakableEth());

    expect(result.current.token).toBe(Token.ETH);
    expect(result.current.href).toBe('/stake');
    expect(result.current.apy).toBe(defaultQueryApy.data);
    expect(result.current.balance).toStrictEqual(
      defaultQueryCommonData.data.ethBalance,
    );
    expect(result.current.isStakeLoading).toBe(false);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.isShowed).toBe(featuresConfig.stakeETH);
    expect(result.current.networks).toStrictEqual([
      {
        title: 'goerli',
        chainId: 5,
      },
    ]);
  });
});
