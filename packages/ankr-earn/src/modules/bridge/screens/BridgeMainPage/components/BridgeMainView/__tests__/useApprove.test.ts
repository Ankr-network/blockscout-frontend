import { useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';

import { IUseTxReceipt, useTxReceipt } from 'modules/bridge/hooks/useTxReceipt';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import { SupportedChainIDS, ZERO } from 'modules/common/const';

import { IUseApproveArgs, useApprove } from '../useApprove';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('modules/bridge/hooks/useTxReceipt', () => ({
  useTxReceipt: jest.fn(),
}));

jest.mock('modules/bridge/actions/approve', () => ({
  approve: jest.fn(),
}));

describe('modules/bridge/screens/BridgeMainPage/components/BridgeMainView/useApprove', () => {
  const defaultApproveData = {
    loading: false,
    data: undefined,
    error: undefined,
  };

  const defaultHookArgs: IUseApproveArgs = {
    token: AvailableBridgeTokens.aETHb,
    chainId: SupportedChainIDS.GOERLI,
    amount: new BigNumber(1),
  };

  const defaulTxReceiptData = {
    isSuccessful: false,
    isLoading: false,
    actionName: 'someName',
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultApproveData);
    (useTxReceipt as jest.Mock).mockReturnValue(defaulTxReceiptData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return actual initial data', () => {
    const { result } = renderHook(() => useApprove(defaultHookArgs));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isApproved).toBe(false);
    expect(result.current.onClick).toBeDefined();
  });

  test('should return loading when approve is loading', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
    });

    const { result } = renderHook(() => useApprove(defaultHookArgs));

    expect(result.current.isLoading).toBe(true);
  });

  test('should return loading when txReceipt is loading', () => {
    (useTxReceipt as jest.Mock).mockReturnValue({
      ...defaulTxReceiptData,
      isLoading: true,
    } as IUseTxReceipt);

    const { result } = renderHook(() => useApprove(defaultHookArgs));

    expect(result.current.isLoading).toBe(true);
  });

  test('should return approved if approval has already been done before', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { isApproved: true },
    });

    const { result } = renderHook(() => useApprove(defaultHookArgs));

    expect(result.current.isApproved).toBe(true);
  });

  test('should return approved if receipt is successful', () => {
    (useTxReceipt as jest.Mock).mockReturnValue({
      ...defaulTxReceiptData,
      isSuccessful: true,
    } as IUseTxReceipt);

    const { result } = renderHook(() => useApprove(defaultHookArgs));

    expect(result.current.isApproved).toBe(true);
  });

  test('should handle approve click properly', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useApprove(defaultHookArgs));

    act(() => {
      result.current.onClick();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('should handle approve click properly', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() =>
      useApprove({
        ...defaultHookArgs,
        amount: ZERO,
      }),
    );

    act(() => {
      result.current.onClick();
    });

    expect(mockDispatch).toBeCalledTimes(0);
  });
});
