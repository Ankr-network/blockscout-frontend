import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { trackSwitchToken } from 'modules/analytics/tracking-actions/trackSwitchToken';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { Token } from 'modules/common/types/token';

import { useSendAnalytics, ISendAnalyticsHookArgs } from '..';

jest.mock('modules/auth/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('modules/analytics/tracking-actions/trackSwitchToken', () => ({
  trackSwitchToken: jest.fn(),
}));

describe('modules/switcher/screens/Main/useSendAnalytics', () => {
  const defaultHookProps: ISendAnalyticsHookArgs = {
    swapOption: Token.aETHb,
    feeBasisPoints: 30,
    ratio: new BigNumber(10 ** 18),
    fethBalance: new BigNumber(9000),
    aethBalance: new BigNumber(9000),
  };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ chainId: 1 });

    (trackSwitchToken as jest.Mock).mockReturnValue(undefined);
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useSendAnalytics(defaultHookProps));

    const { sendAnalytics } = result.current;
    expect(sendAnalytics).toBeDefined();
  });

  test('should send analytics (aETHb -> aETHc)', () => {
    const { result } = renderHook(() => useSendAnalytics(defaultHookProps));

    const { sendAnalytics } = result.current;

    act(() => {
      sendAnalytics({ amount: '9000' });
    });

    expect(trackSwitchToken).toBeCalledTimes(1);
    expect(trackSwitchToken).toBeCalledWith({
      inputAmount: '9000',
      inputToken: Token.aETHb,
      inputTokenBalance: '9000',
      ouputToken: Token.aETHc,
      outputAmount: '8973',
      serviceFee: '27',
      switchProportion: '100',
      walletPublicAddress: undefined,
      walletType: undefined,
    });
  });

  test('should send analytics (aETHc -> aETHb)', () => {
    const { result } = renderHook(() =>
      useSendAnalytics({
        ...defaultHookProps,
        swapOption: Token.aETHc,
      }),
    );

    const { sendAnalytics } = result.current;

    act(() => {
      sendAnalytics({ amount: '9000' });
    });

    expect(trackSwitchToken).toBeCalledTimes(1);
    expect(trackSwitchToken).toBeCalledWith({
      inputAmount: '9000',
      inputToken: Token.aETHc,
      inputTokenBalance: '9000',
      ouputToken: Token.aETHb,
      outputAmount: '8973',
      serviceFee: '27',
      switchProportion: '100',
      walletPublicAddress: undefined,
      walletType: undefined,
    });
  });

  test('should check zero balances case', () => {
    const { result } = renderHook(() =>
      useSendAnalytics({
        ...defaultHookProps,
        aethBalance: undefined,
        fethBalance: undefined,
      }),
    );

    const { sendAnalytics } = result.current;

    act(() => {
      sendAnalytics({ amount: '9000' });
    });

    expect(trackSwitchToken).toBeCalledTimes(1);
    expect(trackSwitchToken).toBeCalledWith({
      inputAmount: '9000',
      inputToken: Token.aETHb,
      inputTokenBalance: '0',
      ouputToken: Token.aETHc,
      outputAmount: '8973',
      serviceFee: '27',
      switchProportion: 'Out of range',
      walletPublicAddress: undefined,
      walletType: undefined,
    });
  });
});
