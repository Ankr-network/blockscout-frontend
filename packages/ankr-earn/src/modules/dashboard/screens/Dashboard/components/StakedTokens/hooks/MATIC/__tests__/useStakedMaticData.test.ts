import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { ONE_ETH, ZERO } from 'modules/common/const';
import { EPolygonPoolEventsMap } from 'modules/stake-polygon/api/PolygonSDK';

import { useStakedAMATICBData } from '../useStakedAMATICBData';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useDispatchRequest: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: () => ({ chainId: 1 }),
}));

jest.mock('modules/stake-polygon/Routes', () => ({
  RoutesConfig: {
    stake: { generatePath: () => '/stake' },
    unstake: { generatePath: () => '/unstake' },
  },
}));

jest.mock('modules/boost/Routes', () => ({
  RoutesConfig: { tradingCockpit: { generatePath: () => '/trade' } },
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAMATICB/useStakedMaticData', () => {
  const defaultStatsData = {
    data: { aMATICbBalance: ONE_ETH, pendingValue: ZERO },
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

  test('should return amount and pending value', () => {
    const { result } = renderHook(() => useStakedAMATICBData());

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

    const { result } = renderHook(() => useStakedAMATICBData());

    expect(result.current.stakeLink).toBe('/stake');
    expect(result.current.unstakeLink).toBe('/unstake');
    expect(result.current.tradeLink).toBe('/trade');
    expect(result.current.stakeType).toBe(EPolygonPoolEventsMap.StakePending);
    expect(result.current.unstakeType).toBe(
      EPolygonPoolEventsMap.MaticClaimPending,
    );
  });

  test('should handle add token to metamask', () => {
    const mockDispatch = jest.fn();
    (useDispatchRequest as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedAMATICBData());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });
});
