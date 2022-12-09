import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { useAddBNBTokenToWalletMutation } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useStakedAETHBSCData } from '../useStakedAETHBSCData';
import { useSupportedNetwork } from '../useSupportedNetwork';

const mockONE = new BigNumber(1);
const mockSwapOldAETHCBSC = jest.fn();

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
  useGetBNBStatsQuery: jest.fn(),
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
  useAddBNBTokenToWalletMutation: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: () => ({ chainId: 1 }),
}));

jest.mock(
  'modules/dashboard/screens/Dashboard/components/StakedAETHBSC/useSupportedNetwork.ts',
  () => ({
    useSupportedNetwork: jest.fn(),
  }),
);

jest.mock('modules/stake-bnb/Routes', () => ({
  RoutesConfig: {
    stake: { generatePath: () => '/stake' },
    unstake: { generatePath: () => '/unstake' },
  },
}));

jest.mock('modules/defi-aggregator/Routes', () => ({
  RoutesConfig: { defi: { generatePath: () => '/defi' } },
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAETHBSC/useStakedAETHBSCData', () => {
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
    (useAddBNBTokenToWalletMutation as jest.Mock).mockReturnValue([jest.fn()]);
    (useGetBNBStatsQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: { aETHBalance: mockONE, aETHRatio: mockONE },
    });
    (useSupportedNetwork as jest.Mock).mockReturnValue({
      onSwitchNetwork: () => Promise.resolve(),
      isUnsupportedNetwork: false,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return default values', () => {
    (useQuery as jest.Mock)
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
  });

  test('should swap tokens with account balance', () => {
    (useQuery as jest.Mock)
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
      .mockReturnValueOnce(defaultAvailableBalanceData)
      .mockReturnValueOnce(defaultMetricsData);

    const mockOnSwitchNetwork = jest.fn();
    (useSupportedNetwork as jest.Mock).mockReturnValue({
      onSwitchNetwork: () => {
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
      .mockReturnValueOnce(defaultAvailableBalanceData)
      .mockReturnValueOnce(defaultMetricsData);
    const [addBNBTokenToWallet] = useAddBNBTokenToWalletMutation();

    const { result } = renderHook(() => useStakedAETHBSCData());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(addBNBTokenToWallet).toBeCalledTimes(1);
  });
});
