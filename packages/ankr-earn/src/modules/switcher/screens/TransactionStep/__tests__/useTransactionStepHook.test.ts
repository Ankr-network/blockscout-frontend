import { useDispatchRequest } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { EEthereumNetworkId } from 'modules/common/types';
import { Token } from 'modules/common/types/token';
import { useAddSwitchTokenToWalletMutation } from 'modules/switcher/actions/addSwitchTokenToWallet';
import {
  useGetSwitcherTxDataQuery,
  useGetSwitcherTxReceiptQuery,
} from 'modules/switcher/actions/getSwitcherTxData';

import { useTransactionStepHook } from '../useTransactionStepHook';

jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

jest.mock('modules/switcher/actions/getSwitcherTxData', () => ({
  useGetSwitcherTxDataQuery: jest.fn(),
  useGetSwitcherTxReceiptQuery: jest.fn(),
}));

jest.mock('modules/switcher/actions/addSwitchTokenToWallet', () => ({
  useAddSwitchTokenToWalletMutation: jest.fn(),
}));

describe('modules/switcher/screens/Progress/useTransactionStepHook', () => {
  const defaultTxData = {
    isFetching: false,
    error: undefined,
    data: {
      amount: new BigNumber('8.4919'),
      destinationAddress: '0xe64FCf6327bB016955EFd36e75a852085270c374',
    },
  };

  const defaultTxReceiptData = {
    ...defaultTxData,
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

    (useGetSwitcherTxDataQuery as jest.Mock).mockReturnValue(defaultTxData);
    (useGetSwitcherTxReceiptQuery as jest.Mock).mockReturnValue(
      defaultTxReceiptData,
    );
    (useAddSwitchTokenToWalletMutation as jest.Mock).mockReturnValue([
      jest.fn(),
    ]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return intial data', async () => {
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
    const [addTokenToWallet] = useAddSwitchTokenToWalletMutation();

    const { result } = renderHook(() => useTransactionStepHook());

    act(() => {
      result.current.handleAddTokenToWallet();
    });

    expect(addTokenToWallet).toBeCalledTimes(1);
  });

  test('should return error if there is provider error', async () => {
    (useGetSwitcherTxDataQuery as jest.Mock).mockReturnValueOnce({
      data: defaultTxData.data,
      isLoading: false,
      error: new Error('error'),
    });

    const { result } = renderHook(() => useTransactionStepHook());

    expect(result.current.error).toBeDefined();
  });

  test('should return error if there is transaction fail error', async () => {
    (useGetSwitcherTxReceiptQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { status: false },
    });

    const { result } = renderHook(() => useTransactionStepHook());

    expect((result.current.error as Error)?.message).toBe(
      TxErrorCodes.TX_FAILED,
    );
  });
});
