import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { ONE_ETH, ZERO } from 'modules/common/const';

import { useStakedAFTMBData } from '../useStakedAFTMBData';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useDispatchRequest: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
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

jest.mock('modules/stake-fantom/actions/addFTMTokenToWallet', () => ({
  addFTMTokenToWallet: jest.fn(),
}));

jest.mock('modules/stake-fantom/actions/getCommonData', () => ({
  getCommonData: jest.fn(),
}));

jest.mock('modules/stake-fantom/actions/stake', () => ({
  stake: jest.fn(),
}));

jest.mock('modules/stake-fantom/actions/unstake', () => ({
  unstake: jest.fn(),
}));

jest.mock('modules/stake/actions/getMetrics', () => ({
  getMetrics: jest.fn(),
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

    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());
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

  test('should handle add token to metamask', () => {
    const mockDispatch = jest.fn();
    (useDispatchRequest as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedAFTMBData());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });
});
