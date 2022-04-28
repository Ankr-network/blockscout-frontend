import { useQuery } from '@redux-requests/react';
import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { EthSDK } from 'modules/api/EthSDK';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { Token } from 'modules/common/types/token';

import {
  IUseStakeEthAnalyticsArgs,
  useStakeEthAnalytics,
} from '../useStakeEthAnalytics';
import { useTotalAmount } from '../useTotalAmount';

jest.mock('modules/auth/hooks/useAuth', () => ({
  useAuth: jest.fn(),
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

jest.mock('modules/api/EthSDK', () => ({
  EthSDK: {
    getInstance: jest.fn(),
  },
}));

jest.mock('modules/analytics/tracking-actions/trackStake', () => ({
  trackStake: jest.fn(),
}));

const mockEthSDK = {
  getAethbBalance: () => new BigNumber(2),
  getAethcBalance: () => new BigNumber(3),
};

describe('modules/stake-eth/screens/StakeEthereum/hooks/useStakeEthAnalytics', () => {
  const defaultQueryAction = {
    loading: false,
    data: undefined,
  };

  const defaultHookProps: IUseStakeEthAnalyticsArgs = {
    amount: new BigNumber(1),
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
    (useAuth as jest.Mock).mockReturnValue(defaultAuthData);
    (useTotalAmount as jest.Mock).mockReturnValue(defaultTotalAmountData);
    (useQuery as jest.Mock).mockReturnValue(defaultQueryCommonData);
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useStakeEthAnalytics(defaultHookProps));
    (EthSDK.getInstance as jest.Mock).mockReturnValue(mockEthSDK);

    const { sendAnalytics } = result.current;
    expect(sendAnalytics).toBeDefined();
  });

  test('should send stake aETHb analytics', async () => {
    (EthSDK.getInstance as jest.Mock).mockReturnValue(mockEthSDK);

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

    (EthSDK.getInstance as jest.Mock).mockReturnValue(mockEthSDK);

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
