import { useMutation, useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';
import { IGetCommonData } from 'modules/stake-eth/actions/getCommonData';
import { TMetrics } from 'modules/stake/actions/getMetrics';

import { useStakableEth } from '../useStakableEth';

jest.mock('modules/auth/eth/hooks/useETHNetworks', () => ({
  useETHNetworks: () => [
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

  const defaultQueryMetrics = {
    ...defaultQueryAction,
    data: {
      eth: {
        totalStaked: new BigNumber(100),
        totalStakedUsd: new BigNumber(1000),
        stakers: '20',
        apy: '4',
      } as TMetrics['eth'],
    },
  };

  const defaultQueryCommonData = {
    ...defaultQueryAction,
    data: {
      ethBalance: new BigNumber(3),
      aETHbBalance: new BigNumber(1),
      aETHcBalance: new BigNumber(0),
      minStake: new BigNumber(0.5),
      aETHcRatio: new BigNumber(0.3),
    } as IGetCommonData,
  };

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue(defaultQueryAction);
    (useQuery as jest.Mock)
      .mockReturnValueOnce(defaultQueryMetrics)
      .mockReturnValueOnce(defaultQueryCommonData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useStakableEth());

    expect(result.current.token).toBe(Token.ETH);
    expect(result.current.href).toBe('/stake');
    expect(result.current.apy).toBe(4);
    expect(result.current.balance).toStrictEqual(
      defaultQueryCommonData.data.ethBalance,
    );
    expect(result.current.isStakeLoading).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.networks).toStrictEqual([
      {
        title: 'goerli',
        chainId: 5,
      },
    ]);
  });
});
