import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';

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

jest.mock('modules/boost/Routes', () => ({
  RoutesConfig: { tradingCockpit: { generatePath: () => '/trade' } },
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAETHC/useStakedAETHCData', () => {
  const defaultStatsData = {
    data: { aETHcBalance: new BigNumber(1) },
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
    const { result } = renderHook(() => useStakedAETHCData());

    const expectedStakeLink = '/stake';

    expect(result.current.amount).toStrictEqual(new BigNumber(1));
    expect(result.current.pendingValue).toStrictEqual(ZERO);
    expect(result.current.isBalancesLoading).toBe(false);
    expect(result.current.isShowed).toBe(true);
    expect(result.current.isStakeLoading).toBe(false);
    expect(result.current.stakeLink).toBe(expectedStakeLink);
    expect(result.current.tradeLink).toBe('/trade');
  });

  test('should return zero if there is no data', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
    });

    const { result } = renderHook(() => useStakedAETHCData());

    expect(result.current.amount).toStrictEqual(ZERO);
    expect(result.current.pendingValue).toStrictEqual(ZERO);
    expect(result.current.isBalancesLoading).toBe(false);
  });

  test('should handle add token to metamask', () => {
    const mockDispatch = jest.fn();
    (useDispatchRequest as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedAETHCData());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });
});
