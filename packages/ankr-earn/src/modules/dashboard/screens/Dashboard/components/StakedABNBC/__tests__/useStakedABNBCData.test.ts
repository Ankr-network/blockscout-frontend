import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';
import { useAddBNBTokenToWalletMutation } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { useGetBNBPendingValuesQuery } from 'modules/stake-bnb/actions/fetchPendingValues';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/useGetBNBStatsQuery';

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
  useAddBNBTokenToWalletMutation: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/fetchPendingValues', () => ({
  useGetBNBPendingValuesQuery: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/useGetBNBStatsQuery', () => ({
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

    (useGetBNBPendingValuesQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });

    (useMutation as jest.Mock).mockReturnValue(defaultMutationData);

    (useAddBNBTokenToWalletMutation as jest.Mock).mockReturnValue([jest.fn()]);

    (useGetBNBStatsQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: { aBNBcBalance: new BigNumber(1), aBNBcRatio: new BigNumber(0.5) },
    });

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
    const [addBNBTokenToWallet] = useAddBNBTokenToWalletMutation();

    const { result } = renderHook(() => useStakedABNBCData());

    act(() => {
      result.current.onAddTokenToWallet();
    });

    expect(addBNBTokenToWallet).toBeCalledTimes(1);
  });
});
