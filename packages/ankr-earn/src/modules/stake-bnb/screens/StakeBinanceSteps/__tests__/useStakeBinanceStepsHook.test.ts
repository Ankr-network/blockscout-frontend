import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { useAddBNBTokenToWalletMutation } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';
import {
  useGetBNBTxDataQuery,
  useGetBNBTxReceiptQuery,
} from 'modules/stake-bnb/actions/getTxData';

import { useStakeBinanceStepsHook } from '../useStakeBinanceStepsHook';

jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/addBNBTokenToWallet', () => ({
  useAddBNBTokenToWalletMutation: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/fetchStats', () => ({
  useGetBNBStatsQuery: jest.fn(),
}));

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/getTxData', () => ({
  useGetBNBTxDataQuery: jest.fn(),
  useGetBNBTxReceiptQuery: jest.fn(),
}));

jest.mock('@ankr.com/staking-sdk', () => ({
  ProviderManagerSingleton: { getInstance: jest.fn() },
}));

describe('modules/stake-bnb/screens/StakeBinanceSteps/useStakeBinanceStepsHook', () => {
  const defaultQueryData = {
    isFetching: false,
    data: {
      isPending: true,
      amount: new BigNumber('2.1'),
      destinationAddress: '0x3C9205b5d4B312cA7C4d28110C91Fe2c74718a94',
    },
  };

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      txHash:
        '0x6d371b345d14faf0600bd9d813f001d09feace3a4621ed201150f8fb2084d347',
      tokenOut: 'aBNBb',
    });

    (useConnectedData as jest.Mock).mockReturnValue({
      chainId: 97,
      address: 'address',
    });

    (useAddBNBTokenToWalletMutation as jest.Mock).mockReturnValue([jest.fn()]);

    (useGetBNBTxDataQuery as jest.Mock).mockReturnValue(defaultQueryData);
    (useGetBNBTxReceiptQuery as jest.Mock).mockReturnValue(defaultQueryData);

    (useGetBNBStatsQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: {
        aBNBcRatio: new BigNumber(0.8),
        relayerFee: new BigNumber(0.1),
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return intial data', async () => {
    const { result } = renderHook(() => useStakeBinanceStepsHook());

    expect(result.current.transactionId).toBe(
      '0x6d371b345d14faf0600bd9d813f001d09feace3a4621ed201150f8fb2084d347',
    );
    expect(result.current.amount).toStrictEqual(new BigNumber('2'));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isPending).toBe(false);
    expect(result.current.destination).toBe(
      '0x3C9205b5d4B312cA7C4d28110C91Fe2c74718a94',
    );
    expect(result.current.error).toBeUndefined();
  });

  test('should return correct aBNBc amount', async () => {
    (useParams as jest.Mock).mockReturnValue({
      tokenOut: 'aBNBc',
    });

    (useGetBNBTxReceiptQuery as jest.Mock).mockImplementation(() => ({
      isFetching: false,
      data: {
        certAmount: '2.4',
      },
    }));
    const { result } = renderHook(() => useStakeBinanceStepsHook());

    expect(result.current.amount).toStrictEqual(new BigNumber('2.4'));
  });

  test('should return error if there is provider error', async () => {
    (useGetBNBTxDataQuery as jest.Mock).mockImplementation(() => ({
      loadng: false,
      error: new Error('error'),
    }));

    const { result } = renderHook(() => useStakeBinanceStepsHook());

    expect(result.current.error).toBeDefined();
  });

  test('should return error if there is transaction fail error', async () => {
    (useGetBNBTxReceiptQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      data: { status: false },
    }));

    const { result } = renderHook(() => useStakeBinanceStepsHook());

    expect((result.current.error as Error)?.message).toBe(
      TxErrorCodes.TX_FAILED,
    );
  });
});
