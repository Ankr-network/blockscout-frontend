import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { useStakedBridgeAETHCData } from '../useStakedBridgeAETHCData';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
  useDispatchRequest: jest.fn(),
}));

jest.mock('modules/bridge/actions/watchAsset', () => ({
  watchAsset: jest.fn(),
}));

jest.mock('modules/dashboard/actions/fetchAETHCBridged', () => ({
  fetchAETHCBridged: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/BridgedAETHCBSC/useStakedBridgeAETHCData', () => {
  const defaultStatsData = {
    loading: false,
    data: new BigNumber(1),
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultStatsData);

    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return amount and pending value', () => {
    const { result } = renderHook(() => useStakedBridgeAETHCData());

    expect(result.current.amount).toStrictEqual(new BigNumber(1));
    expect(result.current.network).toStrictEqual('Binance SmartChain Testnet');
    expect(result.current.isBalancesLoading).toBe(false);
    expect(result.current.chainId).toBe(97);
    expect(result.current.onAddTokenClick).toBeDefined();
  });

  test('should handle add token to metamask', () => {
    const mockDispatch = jest.fn();
    (useDispatchRequest as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useStakedBridgeAETHCData());

    act(() => {
      result.current.onAddTokenClick();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });
});
