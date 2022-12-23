import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { useAddFTMTokenToWalletMutation } from 'modules/stake-fantom/actions/addFTMTokenToWallet';
import {
  useGetFTMTxDataQuery,
  useGetFTMTxReceiptQuery,
} from 'modules/stake-fantom/actions/getTxData';

import { useStakeFantomStepsHook } from '../useStakeFantomStepsHook';

jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

jest.mock('modules/stake-fantom/actions/addFTMTokenToWallet', () => ({
  useAddFTMTokenToWalletMutation: jest.fn(),
}));

jest.mock('modules/stake-fantom/actions/getTxData', () => ({
  useGetFTMTxDataQuery: jest.fn(),
  useGetFTMTxReceiptQuery: jest.fn(),
}));

jest.mock('@ankr.com/staking-sdk', () => ({
  ProviderManagerSingleton: { getInstance: jest.fn() },
  XDC: { XDC_BLOCK_1_DAY_RANGE: jest.fn() },
}));

describe('modules/stake-fantom/screens/StakeFantomSteps/useStakeFantomStepsHook', () => {
  const defaultQueryData = {
    isFetching: false,
    data: {
      isPending: true,
      amount: new BigNumber('1'),
      destinationAddress: '0xEdef5C8a69f086099e14746F5A5c0B1Dd4d0054C',
    },
  };

  beforeEach(() => {
    (useParams as jest.Mock).mockImplementation(() => ({
      txHash:
        '0xbef62debf29d8f91311ea9916c5e80ecbb358719860698bcb3041a0d397169e3',
    }));

    (useConnectedData as jest.Mock).mockImplementation(() => ({
      chainId: 97,
      address: 'address',
    }));

    (useAddFTMTokenToWalletMutation as jest.Mock).mockReturnValue([jest.fn()]);
    (useGetFTMTxDataQuery as jest.Mock).mockReturnValue(defaultQueryData);
    (useGetFTMTxReceiptQuery as jest.Mock).mockReturnValue(defaultQueryData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return intial data', async () => {
    const { result } = renderHook(() => useStakeFantomStepsHook());

    expect(result.current.transactionId).toBe(
      '0xbef62debf29d8f91311ea9916c5e80ecbb358719860698bcb3041a0d397169e3',
    );
    expect(result.current.tokenName).toBe('aFTMb');
    expect(result.current.amount).toStrictEqual(new BigNumber('1'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isPending).toBe(false);
    expect(result.current.destination).toBe(
      '0xEdef5C8a69f086099e14746F5A5c0B1Dd4d0054C',
    );
    expect(result.current.error).toBeUndefined();
  });

  test('should return error if there is provider error', async () => {
    (useGetFTMTxDataQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      error: new Error('error'),
    }));

    const { result } = renderHook(() => useStakeFantomStepsHook());

    expect(result.current.error).toBeDefined();
  });

  test('should return error if there is transaction fail error', async () => {
    (useGetFTMTxReceiptQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      data: { status: false },
    }));

    const { result } = renderHook(() => useStakeFantomStepsHook());

    expect((result.current.error as Error)?.message).toBe(
      TxErrorCodes.TX_FAILED,
    );
  });
});
