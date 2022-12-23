import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { ONE_ETH, ZERO } from 'modules/common/const';
import { useAddMaticOnEthTokenToWalletMutation } from 'modules/stake-matic/eth/actions/useAddMaticOnEthTokenToWalletMutation';
import { useGetMaticOnEthStatsQuery } from 'modules/stake-matic/eth/actions/useGetMaticOnEthStatsQuery';

import { useStakedAMATICBData } from '../useStakedAMATICBData';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
  useDispatchRequest: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: () => ({ chainId: 1 }),
}));

jest.mock('modules/stake-matic/eth/Routes', () => ({
  RoutesConfig: {
    stake: { generatePath: () => '/stake' },
    unstake: { generatePath: () => '/unstake' },
  },
}));

jest.mock('modules/switcher/Routes', () => ({
  RoutesConfig: { main: { generatePath: () => '/switch' } },
}));

jest.mock(
  'modules/stake-matic/eth/actions/useAddMaticOnEthTokenToWalletMutation',
  () => ({
    useAddMaticOnEthTokenToWalletMutation: jest.fn(),
  }),
);

jest.mock('modules/stake-matic/eth/actions/useGetMaticOnEthStatsQuery', () => ({
  useGetMaticOnEthStatsQuery: jest.fn(),
}));

jest.mock('modules/stake-matic/eth/actions/useStakeMaticOnEthMutation', () => ({
  useStakeMaticOnEthMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock(
  'modules/stake-matic/eth/actions/useUnstakeMaticOnEthMutation',
  () => ({
    useUnstakeMaticOnEthMutation: () => [jest.fn(), { isLoading: false }],
  }),
);

jest.mock('modules/stake/actions/getMetrics', () => ({
  getMetrics: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAMATICB/useStakedAMATICBData', () => {
  const defaultStatsData = {
    data: { aMATICbBalance: ONE_ETH, pendingValue: ZERO },
    loading: false,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultStatsData);

    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());

    (useAddMaticOnEthTokenToWalletMutation as jest.Mock).mockReturnValue([
      jest.fn(),
    ]);
    (useGetMaticOnEthStatsQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: { aMATICbBalance: ONE_ETH, pendingValue: ZERO },
    });
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
    expect(result.current.switchLink).toBe('/switch');
  });

  test('should handle add token to metamask', () => {
    const [addMATICTokenToWallet] = useAddMaticOnEthTokenToWalletMutation();

    const { result } = renderHook(() => useStakedAMATICBData());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(addMATICTokenToWallet).toBeCalledTimes(1);
  });
});
