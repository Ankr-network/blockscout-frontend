import { useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { EAvalanchePoolEventsMap } from '@ankr.com/staking-sdk';

import { ONE_ETH as ONE, ZERO } from 'modules/common/const';
import { useAddAVAXTokenToWalletMutation } from 'modules/stake-avax/actions/addAVAXTokenToWallet';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/fetchCommonData';
import { useGetAVAXPendingValuesQuery } from 'modules/stake-avax/actions/fetchPendingValues';

import { useStakedAAVAXBData } from '../useStakedAAVAXBData';

jest.mock('@redux-requests/react', () => ({
  useMutation: jest.fn(),
  useQuery: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: () => ({ chainId: 43114 }),
}));

jest.mock('modules/defi-aggregator/Routes', () => ({
  RoutesConfig: { defi: { generatePath: () => '/defi' } },
}));

jest.mock('modules/stake-avax/Routes', () => ({
  RoutesConfig: {
    stake: { generatePath: () => '/stake' },
    unstake: { generatePath: () => '/unstake' },
  },
}));

jest.mock('modules/stake-avax/actions/addAVAXTokenToWallet', () => ({
  useAddAVAXTokenToWalletMutation: jest.fn(),
}));

jest.mock('modules/stake-avax/actions/fetchPendingValues', () => ({
  useGetAVAXPendingValuesQuery: jest.fn(),
}));

jest.mock('modules/stake-avax/actions/stake', () => ({
  useStakeAVAXMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('modules/stake-avax/actions/unstake', () => ({
  useUnstakeAVAXMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('modules/stake/actions/getMetrics', () => ({
  getMetrics: jest.fn(),
}));

jest.mock('modules/stake-avax/actions/fetchCommonData', () => ({
  useGetAVAXCommonDataQuery: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/useStakedAAVAXBData', () => {
  const defaultStatsData = {
    data: { aAVAXbBalance: ONE, pendingValue: ZERO },
    loading: false,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultStatsData);

    (useGetAVAXCommonDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });

    (useGetAVAXPendingValuesQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });

    (useAddAVAXTokenToWalletMutation as jest.Mock).mockReturnValue([jest.fn()]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return amount and pending value', () => {
    const { result } = renderHook(() => useStakedAAVAXBData());

    expect(result.current.amount).toStrictEqual(ZERO);
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

    const { result } = renderHook(() => useStakedAAVAXBData());

    expect(result.current.stakeLink).toBe('/stake');
    expect(result.current.unstakeLink).toBe('/unstake');
    expect(result.current.tradeLink).toBe('/defi');
    expect(result.current.stakeType).toBe(EAvalanchePoolEventsMap.StakePending);
    expect(result.current.unstakeType).toBe(
      EAvalanchePoolEventsMap.AvaxClaimPending,
    );
  });

  test('should handle add token to metamask', () => {
    const [addAVAXTokenToWallet] = useAddAVAXTokenToWalletMutation();

    const { result } = renderHook(() => useStakedAAVAXBData());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(addAVAXTokenToWallet).toBeCalledTimes(1);
  });
});
