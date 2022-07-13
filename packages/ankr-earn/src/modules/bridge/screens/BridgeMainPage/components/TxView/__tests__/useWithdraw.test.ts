import { useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';

import { useTxReceipt } from 'modules/bridge/hooks/useTxReceipt';

import { useWithdraw } from '../useWithdraw';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('@redux-requests/core', () => ({
  resetRequests: jest.fn(),
}));

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('modules/bridge/hooks/useTxReceipt', () => ({
  useTxReceipt: jest.fn(),
}));

jest.mock('modules/bridge/actions/notarize', () => ({
  notarize: jest.fn(),
}));

jest.mock('modules/bridge/actions/withdrawal', () => ({
  withdrawal: jest.fn(),
}));

describe('modules/bridge/screens/BridgeMainPage/components/TxView/useWithdraw', () => {
  const defaultWithdrawData = {
    loading: false,
    data: undefined,
    error: undefined,
  };

  const defaultNotarizeData = {
    loading: false,
    error: undefined,
    data: {
      encodedProof: 'asdsad',
      encodedReceipt: 'asdsd',
      signature: 'asdasd',
    },
  };

  const defaulTxReceiptData = {
    isSuccessful: false,
    isLoading: false,
    actionName: 'someName',
  };

  beforeEach(() => {
    (useTxReceipt as jest.Mock).mockReturnValue(defaulTxReceiptData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return actual initial data', () => {
    (useQuery as jest.Mock)
      .mockReturnValueOnce(defaultWithdrawData)
      .mockReturnValueOnce(defaultNotarizeData);

    const { result } = renderHook(() => useWithdraw());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isReceived).toBe(false);
    expect(result.current.txHash).toBeUndefined();
    expect(result.current.onClick).toBeDefined();
  });

  test('should return actual data', () => {
    (useQuery as jest.Mock)
      .mockReturnValueOnce({ ...defaultWithdrawData, data: '0xdasdaw' })
      .mockReturnValueOnce(defaultNotarizeData);

    (useTxReceipt as jest.Mock).mockReturnValue({
      ...defaulTxReceiptData,
      isSuccessful: true,
    });

    const { result } = renderHook(() => useWithdraw());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isReceived).toBe(true);
    expect(result.current.txHash).toBe('0xdasdaw');
    expect(result.current.onClick).toBeDefined();
  });

  test('should handle withdraw click properly', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    (useQuery as jest.Mock)
      .mockReturnValueOnce(defaultWithdrawData)
      .mockReturnValueOnce(defaultNotarizeData);

    const { result } = renderHook(() => useWithdraw());

    act(() => {
      result.current.onClick();
    });

    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('withdraw click should not be called', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    (useQuery as jest.Mock)
      .mockReturnValueOnce(defaultWithdrawData)
      .mockReturnValueOnce({
        ...defaultNotarizeData,
        data: null,
      });

    const { result } = renderHook(() => useWithdraw());

    act(() => {
      result.current.onClick();
    });

    expect(mockDispatch).toBeCalledTimes(0);
  });
});
