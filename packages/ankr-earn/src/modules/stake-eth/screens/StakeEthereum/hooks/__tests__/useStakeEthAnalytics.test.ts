import { useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { EthereumSDK } from '@ankr.com/staking-sdk';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';

import {
  IUseStakeEthAnalyticsArgs,
  useStakeEthAnalytics,
} from '../useStakeEthAnalytics';
import { useTotalAmount } from '../useTotalAmount';

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

jest.mock(
  'modules/stake-eth/screens/StakeEthereum/hooks/useTotalAmount',
  () => ({
    useTotalAmount: jest.fn(),
  }),
);

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@ankr.com/staking-sdk', () => ({
  EthereumSDK: {
    getInstance: jest.fn(),
  },
}));

jest.mock('modules/analytics/tracking-actions/trackStake', () => ({
  trackStake: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/getCommonData', () => ({
  useGetETHCommonDataQuery: jest.fn(),
}));

const mockEthSDK = {
  getABBalance: () => new BigNumber(2),
  getACBalance: () => new BigNumber(3),
};

describe('modules/stake-eth/screens/StakeEthereum/hooks/useStakeEthAnalytics', () => {
  const defaultQueryAction = {
    loading: false,
    data: undefined,
  };

  const defaultHookProps: IUseStakeEthAnalyticsArgs = {
    amount: new BigNumber(1),
    fee: ZERO,
  };

  const defaultQueryCommonData = {
    ...defaultQueryAction,
    data: {
      ethBalance: new BigNumber(1),
    },
  };

  const defaultTotalAmountData = {
    isFeeLoading: false,
    tokenOut: Token.aETHb,
    totalAmount: new BigNumber(3),
  };

  const defaultAuthData = {
    address: '0x11',
    walletName: 'Metamask',
  };

  beforeEach(() => {
    (trackStake as jest.Mock).mockReturnValue(undefined);
    (useConnectedData as jest.Mock).mockReturnValue(defaultAuthData);
    (useTotalAmount as jest.Mock).mockReturnValue(defaultTotalAmountData);
    (useQuery as jest.Mock).mockReturnValue(defaultQueryCommonData);
    (useGetETHCommonDataQuery as jest.Mock).mockReturnValue({
      data: {
        ethBalance: new BigNumber(1),
      },
    });
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useStakeEthAnalytics(defaultHookProps));
    (EthereumSDK.getInstance as jest.Mock).mockReturnValue(mockEthSDK);

    const { sendAnalytics } = result.current;
    expect(sendAnalytics).toBeDefined();
  });

  test('should send stake aETHb analytics', async () => {
    (EthereumSDK.getInstance as jest.Mock).mockReturnValue(mockEthSDK);

    const { result } = renderHook(() => useStakeEthAnalytics(defaultHookProps));

    await act(async () => {
      await result.current.sendAnalytics();
    });

    expect(trackStake).toBeCalledTimes(1);

    expect(trackStake).toBeCalledWith({
      address: defaultAuthData.address,
      walletType: defaultAuthData.walletName,
      amount: defaultHookProps.amount,
      willGetAmount: defaultTotalAmountData.totalAmount,
      tokenIn: Token.ETH,
      tokenOut: defaultTotalAmountData.tokenOut,
      prevStakedAmount: defaultQueryCommonData.data.ethBalance,
      synthBalance: new BigNumber(2),
    });
  });

  test('should send stake aETHc analytics', async () => {
    (useTotalAmount as jest.Mock).mockReturnValue({
      ...defaultTotalAmountData,
      tokenOut: Token.aETHc,
    });

    const { result } = renderHook(() => useStakeEthAnalytics(defaultHookProps));

    (EthereumSDK.getInstance as jest.Mock).mockReturnValue(mockEthSDK);

    await act(async () => {
      await result.current.sendAnalytics();
    });

    expect(trackStake).toBeCalledTimes(1);

    expect(trackStake).toBeCalledWith({
      address: defaultAuthData.address,
      walletType: defaultAuthData.walletName,
      amount: defaultHookProps.amount,
      willGetAmount: defaultTotalAmountData.totalAmount,
      tokenIn: Token.ETH,
      tokenOut: Token.aETHc,
      prevStakedAmount: defaultQueryCommonData.data.ethBalance,
      synthBalance: new BigNumber(3),
    });
  });
});
