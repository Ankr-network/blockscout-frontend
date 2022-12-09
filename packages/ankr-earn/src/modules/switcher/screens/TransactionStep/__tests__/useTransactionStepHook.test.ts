import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { EEthereumNetworkId } from 'modules/common/types';
import { Token } from 'modules/common/types/token';

import { useTransactionStepHook } from '../useTransactionStepHook';

jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
  useQuery: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

jest.mock('modules/switcher/actions/getTxData', () => ({
  getTxData: jest.fn(),
  getTxReceipt: jest.fn(),
}));

describe('modules/switcher/screens/Progress/useTransactionStepHook', () => {
  const defaultQueryData = {
    loading: false,
    data: undefined,
    error: undefined,
    stopPolling: jest.fn(),
  };

  const defaultTxData = {
    ...defaultQueryData,
    data: {
      amount: new BigNumber('8.4919'),
      destinationAddress: '0xe64FCf6327bB016955EFd36e75a852085270c374',
    },
  };

  const defaultTxReceiptData = {
    ...defaultQueryData,
    data: {
      status: true,
    },
  };

  beforeEach(() => {
    (useParams as jest.Mock).mockImplementation(() => ({
      from: Token.aETHc,
      to: Token.aETHb,
      txHash: 'hash',
    }));

    (useConnectedData as jest.Mock).mockReturnValue({
      chainId: EEthereumNetworkId.mainnet,
    });

    (useDispatchRequest as jest.Mock).mockImplementation(() => jest.fn());

    (useQuery as jest.Mock).mockReturnValue(defaultQueryData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return intial data', async () => {
    (useQuery as jest.Mock)
      .mockReturnValueOnce(defaultTxData)
      .mockReturnValueOnce(defaultTxReceiptData);

    const { result } = renderHook(() => useTransactionStepHook());

    expect(result.current.txHash).toBe('hash');
    expect(result.current.symbol).toBe('aETHb');
    expect(result.current.amount).toStrictEqual(new BigNumber('8.4919'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isPending).toBe(false);
    expect(result.current.destinationAddress).toBe(
      '0xe64FCf6327bB016955EFd36e75a852085270c374',
    );
    expect(result.current.error).toBeUndefined();
  });

  test('should handle adding token to wallet properly', async () => {
    (useQuery as jest.Mock)
      .mockReturnValueOnce(defaultTxData)
      .mockReturnValueOnce(defaultTxReceiptData);

    const mockDispatch = jest.fn();

    (useDispatchRequest as jest.Mock).mockImplementation(() => mockDispatch);

    const { result } = renderHook(() => useTransactionStepHook());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(mockDispatch).toBeCalledTimes(3);
  });

  test('should return error if there is provider error', async () => {
    (useQuery as jest.Mock)
      .mockReturnValueOnce({
        ...defaultTxData,
        loading: false,
        error: new Error('error'),
      })
      .mockReturnValueOnce(defaultTxReceiptData);

    const { result } = renderHook(() => useTransactionStepHook());

    expect(result.current.error).toBeDefined();
  });

  test('should return error if there is transaction fail error', async () => {
    (useQuery as jest.Mock)
      .mockReturnValueOnce(defaultTxData)
      .mockReturnValueOnce({
        ...defaultTxReceiptData,
        loading: false,
        data: { status: false },
      });

    const { result } = renderHook(() => useTransactionStepHook());

    expect(result.current.error?.message).toBe(TxErrorCodes.TX_FAILED);
  });
});
