import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';

import { useStakedABNBCData } from '../useStakedABNBCData';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useDispatchRequest: jest.fn(),
}));

jest.mock('modules/stake-bnb/Routes', () => ({
  RoutesConfig: {
    stake: { generatePath: () => '/stake' },
    unstake: { generatePath: () => '/unstake' },
  },
}));

jest.mock('modules/stake-bnb/actions/addBNBTokenToWallet', () => ({
  addBNBTokenToWallet: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/fetchPendingValues', () => ({
  fetchPendingValues: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/fetchStats', () => ({
  fetchStats: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/stake', () => ({
  stake: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/unstake', () => ({
  unstake: jest.fn(),
}));

jest.mock('modules/stake/actions/getMetrics', () => ({
  getMetrics: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedABNBC/useStakedABNBCData', () => {
  const defaultStatsData = {
    data: { aBNBcBalance: new BigNumber(1), aBNBcRatio: new BigNumber(0.5) },
    loading: false,
  };

  const defaultMutationData = {
    loading: false,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultStatsData);

    (useMutation as jest.Mock).mockReturnValue(defaultMutationData);

    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return proper data', () => {
    const { result } = renderHook(() => useStakedABNBCData());

    const expectedNativeAmount = new BigNumber(2);

    expect(result.current.amount).toStrictEqual(
      defaultStatsData.data.aBNBcBalance,
    );
    expect(result.current.isLoading).toBe(defaultStatsData.loading);
    expect(result.current.isStakeLoading).toBe(defaultMutationData.loading);
    expect(result.current.token).toBe(Token.aBNBc);
    expect(result.current.nativeAmount).toStrictEqual(expectedNativeAmount);
  });

  test('should return links and types', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
    });

    const { result } = renderHook(() => useStakedABNBCData());

    expect(result.current.stakeLink).toBe('/stake');
    expect(result.current.unstakeLink).toBe('/unstake');
  });

  test('should handle add token to metamask', () => {
    const mockDispatch = jest.fn();
    (useDispatchRequest as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedABNBCData());

    act(() => {
      result.current.onAddTokenToWallet();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });
});
