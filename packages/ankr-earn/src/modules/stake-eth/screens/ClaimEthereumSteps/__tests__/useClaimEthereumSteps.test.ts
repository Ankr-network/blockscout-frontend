import { useDispatchRequest } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { useAddETHTokenToWalletMutation } from 'modules/stake-eth/actions/addTokenToWallet';
import { useGetETHClaimableDataQuery } from 'modules/stake-eth/actions/getClaimableData';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import {
  useGetETHTxDataQuery,
  useGetETHTxReceiptQuery,
} from 'modules/stake-eth/actions/getTxData';
import { RoutesConfig } from 'modules/stake-eth/Routes';

import { useClaimEthereumSteps } from '../useClaimEthereumSteps';

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

jest.mock('modules/stake-eth/Routes', () => ({
  RoutesConfig: {
    claimSteps: { useParams: jest.fn() },
  },
}));

jest.mock('modules/stake-eth/actions/addTokenToWallet', () => ({
  useAddETHTokenToWalletMutation: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/getCommonData', () => ({
  getCommonData: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/getClaimableData', () => ({
  getClaimableData: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/getTxData', () => ({
  useGetETHTxDataQuery: jest.fn(),
  useGetETHTxReceiptQuery: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/getClaimableData', () => ({
  useGetETHClaimableDataQuery: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/getCommonData', () => ({
  useGetETHCommonDataQuery: jest.fn(),
}));

describe('modules/stake-eth/screens/ClaimEthereumSteps/useClaimEthereumSteps', () => {
  const defaultQueryAction = {
    loading: false,
    data: undefined,
    stopPolling: jest.fn(),
  };

  const defaultQueryTxData = {
    ...defaultQueryAction,
    data: {
      isPending: true,
      amount: new BigNumber(1),
      destinationAddress: '0x2c6Ecc9e5b5397f3917A0E987A29FBdcBB674814',
    },
  };

  const defaultUseParamsData = {
    txHash:
      '0x496fecc71333ba873bd0d1dd7d781a7d1cd212072b8b0e7d21deecd3cfaffcf4',
    tokenOut: 'aETHb',
    amount: '1',
  };

  beforeEach(() => {
    (RoutesConfig.claimSteps.useParams as jest.Mock).mockReturnValue(
      defaultUseParamsData,
    );

    (useConnectedData as jest.Mock).mockReturnValue({
      chainId: 5,
      address: 'address',
    });

    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());

    (useAddETHTokenToWalletMutation as jest.Mock).mockReturnValue([jest.fn()]);

    (useGetETHClaimableDataQuery as jest.Mock).mockReturnValue({
      refetch: jest.fn(),
    });
    (useGetETHCommonDataQuery as jest.Mock).mockReturnValue({
      refetch: jest.fn(),
    });
    (useGetETHTxDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      stopPolling: jest.fn(),
      data: {
        ...defaultQueryTxData.data,
      },
    });
    (useGetETHTxReceiptQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      stopPolling: jest.fn(),
      data: {
        ...defaultQueryTxData.data,
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return intial data', () => {
    const { result } = renderHook(() => useClaimEthereumSteps());
    expect(result.current.transactionId).toBe(
      '0x496fecc71333ba873bd0d1dd7d781a7d1cd212072b8b0e7d21deecd3cfaffcf4',
    );
    expect(result.current.amount).toStrictEqual(new BigNumber(1));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isPending).toBe(false);
    expect(result.current.destination).toBe(
      '0x2c6Ecc9e5b5397f3917A0E987A29FBdcBB674814',
    );
    expect(result.current.error).toBeUndefined();
  });

  test('should return correct amount', async () => {
    (RoutesConfig.claimSteps.useParams as jest.Mock).mockReturnValue({
      ...defaultUseParamsData,
      tokenOut: 'aETHc',
    });

    const { result } = renderHook(() => useClaimEthereumSteps());

    expect(result.current.amount).toStrictEqual(new BigNumber(1));
  });

  test('should return error if there is provider error', async () => {
    (useGetETHTxDataQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      error: new Error('error'),
    }));

    const { result } = renderHook(() => useClaimEthereumSteps());

    expect(result.current.error).toBeDefined();
  });

  test('should return error if there is transaction fail error', async () => {
    (useGetETHTxReceiptQuery as jest.Mock).mockReturnValue({
      loading: false,
      data: { status: false },
    });

    const { result } = renderHook(() => useClaimEthereumSteps());

    expect((result.current.error as Error)?.message).toBe(
      TxErrorCodes.TX_FAILED,
    );
  });
});
