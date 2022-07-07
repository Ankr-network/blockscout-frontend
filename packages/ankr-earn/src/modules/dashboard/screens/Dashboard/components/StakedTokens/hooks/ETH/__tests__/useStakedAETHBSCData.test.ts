import {
  useDispatchRequest,
  useQuery,
  useMutation,
} from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { useGuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute/hooks/useGuardETHRoute';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useStakedAETHBSCData } from '../useStakedAETHBSCData';

const mockONE = new BigNumber(1);
const mockTWO = new BigNumber(2);
const mockSwapOldAETHCBSC = jest.fn();
const mockAddBNBTokenToWallet = jest.fn();

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useDispatchRequest: jest.fn(),
}));

jest.mock('modules/dashboard/utils/getUSDAmount', () => ({
  getUSDAmount: () => mockONE,
}));

jest.mock('modules/dashboard/utils/getTokenNativeAmount', () => ({
  getTokenNativeAmount: () => mockONE,
}));

jest.mock('modules/stake-bnb/actions/fetchStats', () => ({
  fetchStats: jest.fn(),
}));

jest.mock('modules/stake/actions/getMetrics', () => ({
  getMetrics: jest.fn(),
}));

jest.mock('modules/dashboard/actions/fetchAETHCBridgeBalanceBSC', () => ({
  fetchAETHCBridgeBalanceBSC: jest.fn(),
}));

jest.mock('modules/dashboard/actions/swapOldAETHCBSC', () => ({
  swapOldAETHCBSC: (...params: unknown[]) => mockSwapOldAETHCBSC(...params),
}));

jest.mock('modules/stake-bnb/actions/addBNBTokenToWallet', () => ({
  addBNBTokenToWallet: (...params: unknown[]) =>
    mockAddBNBTokenToWallet(...params),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: () => ({ chainId: 1 }),
}));

jest.mock(
  'modules/auth/eth/components/GuardETHRoute/hooks/useGuardETHRoute',
  () => ({
    useGuardETHRoute: jest.fn(),
  }),
);

jest.mock('modules/stake-bnb/Routes', () => ({
  RoutesConfig: {
    stake: { generatePath: () => '/stake' },
    unstake: { generatePath: () => '/unstake' },
  },
}));

jest.mock('modules/boost/Routes', () => ({
  RoutesConfig: { tradingCockpit: { generatePath: () => '/trade' } },
}));

describe('modules/dashboard/screens/Dashboard/components/StakedTokens/hooks/ETH/useStakedAETHBSCData.ts', () => {
  const defaultStatsData = {
    data: { aETHBalance: mockONE, aETHRatio: mockONE },
    loading: false,
  };

  const defaultAvailableBalanceData = {
    data: mockONE,
  };

  const defaultMetricsData = {
    data: {
      [EMetricsServiceName.BNB]: {
        totalStaked: new BigNumber(2),
        totalStakedUsd: new BigNumber(3),
      },
    },
    loading: false,
  };

  beforeEach(() => {
    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());
    (useMutation as jest.Mock).mockReturnValue({ loading: false });
    (useGuardETHRoute as jest.Mock).mockReturnValue({
      onSwitchNetwork: () => () => Promise.resolve(),
      isUnsupportedNetwork: false,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return default values', () => {
    (useQuery as jest.Mock)
      .mockReturnValueOnce(defaultStatsData)
      .mockReturnValueOnce(defaultAvailableBalanceData)
      .mockReturnValueOnce(defaultMetricsData);

    const { result } = renderHook(() => useStakedAETHBSCData());

    expect(result.current.amount).toStrictEqual(mockONE);
    expect(result.current.usdAmount).toStrictEqual(mockONE);
    expect(result.current.network).toStrictEqual('Binance SmartChain Testnet');
    expect(result.current.swapDisabled).toStrictEqual(false);
    expect(result.current.chainId).toStrictEqual(
      EEthereumNetworkId.smartchainTestnet,
    );
    expect(result.current.isBalancesLoading).toBe(false);
    expect(result.current.isSwapLoading).toBe(false);
    expect(result.current.isShowed).toBe(true);
  });

  test('should swap tokens with account balance', () => {
    (useQuery as jest.Mock)
      .mockReturnValueOnce(defaultStatsData)
      .mockReturnValueOnce(defaultAvailableBalanceData)
      .mockReturnValueOnce(defaultMetricsData);

    const mockDispatch = jest.fn();
    (useDispatchRequest as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedAETHBSCData());

    act(() => {
      result.current.onSwapToken();
    });

    expect(mockSwapOldAETHCBSC).toBeCalledWith(mockONE);
  });

  test('should swap tokens with switching network', () => {
    (useQuery as jest.Mock)
      .mockReturnValueOnce(defaultStatsData)
      .mockReturnValueOnce(defaultAvailableBalanceData)
      .mockReturnValueOnce(defaultMetricsData);

    const mockOnSwitchNetwork = jest.fn();
    (useGuardETHRoute as jest.Mock).mockReturnValue({
      onSwitchNetwork: () => () => {
        mockOnSwitchNetwork();
        return Promise.resolve();
      },
      isUnsupportedNetwork: true,
    });

    const mockDispatch = jest.fn();
    (useDispatchRequest as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedAETHBSCData());

    act(() => {
      result.current.onSwapToken();
    });

    expect(mockOnSwitchNetwork).toBeCalledTimes(1);
  });

  test('should swap tokens with max available balance', () => {
    (useQuery as jest.Mock)
      .mockReturnValueOnce({
        ...defaultStatsData,
        data: {
          ...defaultStatsData.data,
          aETHBalance: mockTWO,
        },
      })
      .mockReturnValueOnce(defaultAvailableBalanceData)
      .mockReturnValueOnce(defaultMetricsData);

    const mockDispatch = jest.fn();
    (useDispatchRequest as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedAETHBSCData());

    act(() => {
      result.current.onSwapToken();
    });

    expect(mockSwapOldAETHCBSC).toBeCalledWith(mockONE);
  });

  test('should add token to wallet', () => {
    (useQuery as jest.Mock)
      .mockReturnValueOnce(defaultStatsData)
      .mockReturnValueOnce(defaultAvailableBalanceData)
      .mockReturnValueOnce(defaultMetricsData);

    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());

    const { result } = renderHook(() => useStakedAETHBSCData());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(mockAddBNBTokenToWallet).toBeCalledTimes(1);
  });
});
