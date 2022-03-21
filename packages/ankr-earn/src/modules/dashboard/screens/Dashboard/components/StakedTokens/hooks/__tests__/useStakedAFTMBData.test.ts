import { useMutation, useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';

import { ONE_ETH, ZERO } from 'modules/common/const';

import { useStakedAFTMBData } from '../useStakedAFTMBData';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('modules/auth/hooks/useConnectedData', () => ({
  useConnectedData: () => ({ chainId: 1 }),
}));

jest.mock('modules/stake-fantom/Routes', () => ({
  RoutesConfig: {
    stake: { generatePath: () => '/stake' },
    unstake: { generatePath: () => '/unstake' },
  },
}));

jest.mock('modules/boost/Routes', () => ({
  RoutesConfig: { tradingCockpit: { generatePath: () => '/trade' } },
}));

describe('modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/useStakedAFTMBData', () => {
  const defaultStatsData = {
    data: { aFTMbBalance: ONE_ETH },
    loading: false,
  };

  const defaultMutationData = {
    loading: false,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultStatsData);

    (useMutation as jest.Mock).mockReturnValue(defaultMutationData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return data', () => {
    const { result } = renderHook(() => useStakedAFTMBData());

    expect(result.current.amount).toStrictEqual(ONE_ETH);
    expect(result.current.pendingUnstakes).toStrictEqual(ZERO);
    expect(result.current.isBalancesLoading).toBe(false);
    expect(result.current.isShowed).toBe(true);
    expect(result.current.isStakeLoading).toBe(false);
    expect(result.current.isUnstakeLoading).toBe(false);
    expect(result.current.tradeLink).toBe('/trade');
    expect(result.current.stakeLink).toBe('/stake');
  });

  test('should return zero if there is no data', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
    });

    const { result } = renderHook(() => useStakedAFTMBData());

    expect(result.current.amount).toStrictEqual(ZERO);
    expect(result.current.isBalancesLoading).toBe(false);
  });
});
