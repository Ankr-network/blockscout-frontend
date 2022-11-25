import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { ONE_ETH, ZERO } from 'modules/common/const';
import { useAddBNBTokenToWalletMutation } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { useGetBNBPendingValuesQuery } from 'modules/stake-bnb/actions/fetchPendingValues';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';

import { useStakedABNBBData } from '../useStakedABNBBData';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useDispatchRequest: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: () => ({ chainId: 1 }),
}));

jest.mock('modules/stake-bnb/Routes', () => ({
  RoutesConfig: {
    stake: { generatePath: () => '/stake' },
    unstake: { generatePath: () => '/unstake' },
  },
}));

jest.mock('modules/defi-aggregator/Routes', () => ({
  RoutesConfig: { defi: { generatePath: () => '/defi' } },
}));

jest.mock('modules/stake-bnb/actions/addBNBTokenToWallet', () => ({
  useAddBNBTokenToWalletMutation: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/fetchPendingValues', () => ({
  useGetBNBPendingValuesQuery: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/fetchStats', () => ({
  useGetBNBStatsQuery: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/stake', () => ({
  useStakeBNBMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('modules/stake-bnb/actions/unstake', () => ({
  useUnstakeBNBMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('modules/stake/actions/getMetrics', () => ({
  getMetrics: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedABNBB/useStakedABNBBData', () => {
  const defaultStatsData = {
    data: { aBNBbBalance: ONE_ETH, pendingValue: ZERO },
    loading: false,
  };

  const defaultMutationData = {
    loading: false,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultStatsData);

    (useGetBNBPendingValuesQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });

    (useMutation as jest.Mock).mockReturnValue(defaultMutationData);

    (useAddBNBTokenToWalletMutation as jest.Mock).mockReturnValue([jest.fn()]);

    (useGetBNBStatsQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: { aBNBbBalance: ONE_ETH, pendingValue: ZERO },
    });

    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return amount and pending value', () => {
    const { result } = renderHook(() => useStakedABNBBData());

    expect(result.current.amount).toStrictEqual(ONE_ETH);
    expect(result.current.pendingValue).toStrictEqual(ZERO);
    expect(result.current.isBalancesLoading).toBe(false);
    expect(result.current.isStakeLoading).toBe(false);
    expect(result.current.isUnstakeLoading).toBe(false);
  });

  test('should return links and types', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
    });

    const { result } = renderHook(() => useStakedABNBBData());

    expect(result.current.stakeLink).toBe('/stake');
    expect(result.current.unstakeLink).toBe('/unstake');
    expect(result.current.tradeLink).toBe('/defi');
  });

  test('should handle add token to metamask', () => {
    const [addBNBTokenToWallet] = useAddBNBTokenToWalletMutation();

    const { result } = renderHook(() => useStakedABNBBData());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(addBNBTokenToWallet).toBeCalledTimes(1);
  });
});
