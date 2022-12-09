import { useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { ONE_ETH, ZERO } from 'modules/common/const';
import { useAddFTMTokenToWalletMutation } from 'modules/stake-fantom/actions/addFTMTokenToWallet';
import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';

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

jest.mock('modules/switcher/Routes', () => ({
  RoutesConfig: { main: { generatePath: () => '/switch' } },
}));

jest.mock('modules/stake-fantom/actions/addFTMTokenToWallet', () => ({
  useAddFTMTokenToWalletMutation: jest.fn(),
}));

jest.mock('modules/stake-fantom/actions/getCommonData', () => ({
  useGetFTMCommonDataQuery: jest.fn(),
}));

jest.mock('modules/stake-fantom/actions/stake', () => ({
  useStakeFTMMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('modules/stake-fantom/actions/unstake', () => ({
  useUnstakeFTMMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('modules/stake/actions/getMetrics', () => ({
  getMetrics: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAFTMB/useStakedAFTMBData', () => {
  const defaultStatsData = {
    data: { aFTMbBalance: ONE_ETH },
    loading: false,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultStatsData);

    (useGetFTMCommonDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });

    (useAddFTMTokenToWalletMutation as jest.Mock).mockReturnValue([jest.fn()]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return data', () => {
    const { result } = renderHook(() => useStakedAFTMBData());

    expect(result.current.amount).toStrictEqual(ZERO);
    expect(result.current.pendingUnstakes).toStrictEqual(ZERO);
    expect(result.current.isBalancesLoading).toBe(false);
    expect(result.current.isStakeLoading).toBe(false);
    expect(result.current.isUnstakeLoading).toBe(false);
    expect(result.current.switchLink).toBe('/switch');
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
    const [addFTMTokenToWallet] = useAddFTMTokenToWalletMutation();

    const { result } = renderHook(() => useStakedAFTMBData());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(addFTMTokenToWallet).toBeCalledTimes(1);
  });
});
