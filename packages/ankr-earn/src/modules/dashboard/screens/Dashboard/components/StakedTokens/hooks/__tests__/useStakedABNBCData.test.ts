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
  },
}));

describe('modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/useStakedABNBCData', () => {
  const defaultStatsData = {
    data: { aBNBcBalance: new BigNumber(1) },
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

    expect(result.current.amount).toStrictEqual(
      defaultStatsData.data.aBNBcBalance,
    );
    expect(result.current.isLoading).toBe(defaultStatsData.loading);
    expect(result.current.isStakeLoading).toBe(defaultMutationData.loading);
    expect(result.current.token).toBe(Token.aBNBc);
  });

  test('should return links and types', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
    });

    const { result } = renderHook(() => useStakedABNBCData());

    expect(result.current.stakeLink).toBe('/stake');
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

  test('should be showed', () => {
    const { result } = renderHook(() => useStakedABNBCData());

    expect(result.current.isShowed).toBe(true);
  });

  test('should be hidden', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
    });

    const { result } = renderHook(() => useStakedABNBCData());

    expect(result.current.isShowed).toBe(false);
  });
});
