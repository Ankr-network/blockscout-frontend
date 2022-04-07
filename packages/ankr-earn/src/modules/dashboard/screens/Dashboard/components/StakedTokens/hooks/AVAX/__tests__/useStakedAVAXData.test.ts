import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { ONE_ETH as ONE, ZERO } from 'modules/common/const';
import { EAvalanchePoolEventsMap } from 'modules/stake-avax/api/AvalancheSDK';

import { useStakedAVAXData } from '../useStakedAVAXData';

jest.mock('@redux-requests/react', () => ({
  useMutation: jest.fn(),
  useQuery: jest.fn(),
  useDispatchRequest: jest.fn(),
}));

jest.mock('modules/auth/hooks/useConnectedData', () => ({
  useConnectedData: () => ({ chainId: 43114 }),
}));

jest.mock('modules/boost/Routes', () => ({
  RoutesConfig: { tradingCockpit: { generatePath: () => '/trade' } },
}));

jest.mock('modules/stake-avax/Routes', () => ({
  RoutesConfig: {
    stake: { generatePath: () => '/stake' },
    unstake: { generatePath: () => '/unstake' },
  },
}));

describe('modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/useStakedAVAXData', () => {
  const defaultStatsData = {
    data: { aAVAXbBalance: ONE, pendingValue: ZERO },
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
    const { result } = renderHook(() => useStakedAVAXData());

    expect(result.current.amount).toStrictEqual(ONE);
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

    const { result } = renderHook(() => useStakedAVAXData());

    expect(result.current.stakeLink).toBe('/stake');
    expect(result.current.unstakeLink).toBe('/unstake');
    expect(result.current.tradeLink).toBe('/trade');
    expect(result.current.stakeType).toBe(EAvalanchePoolEventsMap.StakePending);
    expect(result.current.unstakeType).toBe(
      EAvalanchePoolEventsMap.AvaxClaimPending,
    );
  });

  test('should handle add token to metamask', () => {
    const mockDispatch = jest.fn();
    (useDispatchRequest as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedAVAXData());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });
});
