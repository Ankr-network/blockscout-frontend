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

import { useStakedAETHCData } from '../useStakedAETHCData';

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

jest.mock('modules/defi-aggregator/Routes', () => ({
  RoutesConfig: { defi: { generatePath: () => '/defi' } },
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

describe('modules/dashboard/screens/Dashboard/components/StakedAETHC/useStakedAETHCData', () => {
  const defaultStatsData = {
    loading: false,
    data: {
      aETHcBalance: new BigNumber(1),
      aETHcRatio: new BigNumber(0.5),
    },
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
      data: {
        aETHcBalance: new BigNumber(1),
        aETHcRatio: new BigNumber(0.5),
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return amount and pending value', () => {
    const { result } = renderHook(() => useStakedAETHCData());

    const expectedNativeAmount = new BigNumber(2);

    expect(result.current.amount).toStrictEqual(new BigNumber(1));
    expect(result.current.pendingValue).toStrictEqual(ZERO);
    expect(result.current.isBalancesLoading).toBe(false);
    expect(result.current.isStakeLoading).toBe(false);
    expect(result.current.stakeLink).toBe('/stake');
    expect(result.current.tradeLink).toBe('/defi');
    expect(result.current.nativeAmount).toStrictEqual(expectedNativeAmount);
  });

  test('should return zero if there is no data', () => {
    (useGetETHCommonDataQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
    });

    const { result } = renderHook(() => useStakedAETHCData());

    expect(result.current.amount).toStrictEqual(ZERO);
    expect(result.current.pendingValue).toStrictEqual(ZERO);
    expect(result.current.isBalancesLoading).toBe(false);
  });

  test('should handle add token to metamask', () => {
    const [addTokenToWallet] = useAddETHTokenToWalletMutation();

    const { result } = renderHook(() => useStakedAETHCData());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(addTokenToWallet).toBeCalledTimes(1);
  });
});
