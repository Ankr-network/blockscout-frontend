import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { useAddETHTokenToWalletMutation } from 'modules/stake-eth/actions/addTokenToWallet';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';

import { useStakedAETHBData } from '../useStakedAETHBData';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useDispatchRequest: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: () => ({ chainId: 1 }),
}));

jest.mock('modules/stake-eth/Routes', () => ({
  RoutesConfig: {
    stake: { generatePath: () => '/stake' },
  },
}));

jest.mock('modules/switcher/Routes', () => ({
  RoutesConfig: { main: { generatePath: () => '/switch' } },
}));

jest.mock('modules/stake-eth/actions/addTokenToWallet', () => ({
  useAddETHTokenToWalletMutation: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/getCommonData', () => ({
  useGetETHCommonDataQuery: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/stake', () => ({
  useStakeETHMutation: () => [jest.fn(), { isLoading: false }],
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAETHB/useStakedAETHBData', () => {
  const defaultStatsData = {
    data: { aETHbBalance: new BigNumber(1) },
    loading: false,
  };

  const defaultMutationData = {
    loading: false,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultStatsData);

    (useMutation as jest.Mock).mockReturnValue(defaultMutationData);

    (useAddETHTokenToWalletMutation as jest.Mock).mockReturnValue([jest.fn()]);

    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());

    (useGetETHCommonDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: { aETHbBalance: new BigNumber(1) },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return data', () => {
    const { result } = renderHook(() => useStakedAETHBData());
    const expectedStakeLink = '/stake';

    expect(result.current.amount).toStrictEqual(new BigNumber(1));
    expect(result.current.pendingValue).toStrictEqual(ZERO);
    expect(result.current.switchLink).toBe('/switch');
    expect(result.current.isBalancesLoading).toBe(false);
    expect(result.current.isStakeLoading).toBe(false);
    expect(result.current.stakeLink).toBe(expectedStakeLink);
  });

  test('should return zero if there is no data', () => {
    (useGetETHCommonDataQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
    });

    const { result } = renderHook(() => useStakedAETHBData());

    expect(result.current.amount).toStrictEqual(ZERO);
    expect(result.current.pendingValue).toStrictEqual(ZERO);
    expect(result.current.isBalancesLoading).toBe(false);
  });

  test('should handle add token to metamask', () => {
    const [addTokenToWallet] = useAddETHTokenToWalletMutation();

    const { result } = renderHook(() => useStakedAETHBData());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(addTokenToWallet).toBeCalledTimes(1);
  });
});
