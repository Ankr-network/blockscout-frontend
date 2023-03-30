import { act, renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';

import { useSwitchNetworkMutation } from 'modules/auth/common/actions/switchNetwork';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ONE_ETH, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { ISwitcherFormHookArgs, useSwitcherForm } from '..';

jest.mock('modules/switcher/actions/swapAssets', () => ({
  useSwapAssetsMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('modules/switcher/actions/switcherApprove', () => ({
  useSwitcherApproveMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('modules/auth/common/actions/switchNetwork', () => ({
  useSwitchNetworkMutation: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

describe('modules/switcher/screens/Main/useSwitcherHook', () => {
  const defaultHookProps: ISwitcherFormHookArgs = {
    ratio: ONE_ETH,
    from: Token.aETHb,
    to: Token.aETHc,
    max: ONE_ETH,
    chainId: EEthereumNetworkId.mainnet,
    onSuccessSwap: jest.fn(),
  };

  beforeEach(() => {
    (useConnectedData as jest.Mock).mockReturnValue({ chainId: 1 });

    (useSwitchNetworkMutation as jest.Mock).mockReturnValue([jest.fn()]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useSwitcherForm(defaultHookProps));
    const {
      txError,
      txHash,
      validate,
      handleApprove,
      handleSwap,
      handleClearTx,
      handleSwitchNetwork,
    } = result.current;

    expect(txError).toBe('');
    expect(txHash).toBe('');
    expect(validate).toBeDefined();
    expect(handleApprove).toBeDefined();
    expect(handleSwap).toBeDefined();
    expect(handleClearTx).toBeDefined();
    expect(handleSwitchNetwork).toBeDefined();
  });

  describe('handle clear tx', () => {
    test('should clear tx hash and error', () => {
      const { result } = renderHook(() => useSwitcherForm(defaultHookProps));

      act(() => {
        result.current.handleClearTx();
      });

      expect(result.current.txError).toBe('');
      expect(result.current.txHash).toBe('');
    });
  });

  describe('handle switch network', () => {
    test('should clear tx hash and error', () => {
      const { result } = renderHook(() => useSwitcherForm(defaultHookProps));
      const [switchNetwork] = useSwitchNetworkMutation();

      act(() => {
        result.current.handleSwitchNetwork();
      });

      expect(switchNetwork).toBeCalledTimes(1);
      expect(switchNetwork).toBeCalledWith({
        providerId: AvailableWriteProviders.ethCompatible,
        chainId: EEthereumNetworkId.goerli,
      });
    });
  });

  describe('calculate with ratio', () => {
    test('should calculate total amount from aETHb to aETHc', () => {
      const { result } = renderHook(() =>
        useSwitcherForm({
          ...defaultHookProps,
          ratio: new BigNumber('0.94076'),
        }),
      );

      const total = result.current.calculateValueWithRatio(new BigNumber(10));
      expect(total.toNumber()).toBe(9.4076);
    });

    test('should calculate total amount from aETHc to aETHb', () => {
      const { result } = renderHook(() =>
        useSwitcherForm({
          ...defaultHookProps,
          from: Token.aETHc,
          to: Token.aETHb,
          ratio: new BigNumber('0.94076'),
        }),
      );

      const total = result.current.calculateValueWithRatio(new BigNumber(10));
      expect(total.toNumber()).toBe(10.6297);
    });
  });

  describe('validate', () => {
    test('should return max validation error', async () => {
      const { result } = renderHook(() =>
        useSwitcherForm({ ...defaultHookProps, max: ZERO }),
      );

      const errors = await result.current.validate({ amount: '11' });

      expect(errors).toStrictEqual({ amount: 'Should be less than 0' });
    });

    test('should return positive validation error', async () => {
      const { result } = renderHook(() => useSwitcherForm(defaultHookProps));

      const errors = await result.current.validate({ amount: '-1' });

      expect(errors).toStrictEqual({ amount: 'Should be greater than 0' });
    });

    test('should return NaN validation error', async () => {
      const { result } = renderHook(() => useSwitcherForm(defaultHookProps));

      const errors = await result.current.validate({ amount: 'NaN' });

      expect(errors).toStrictEqual({ amount: 'Must be a number' });
    });

    test('should return required validation error', async () => {
      const { result } = renderHook(() => useSwitcherForm(defaultHookProps));

      const errors = await result.current.validate({});

      expect(errors).toStrictEqual({ amount: 'This field is required' });
    });

    test('should not return any validation error', async () => {
      const { result } = renderHook(() => useSwitcherForm(defaultHookProps));

      const errors = await result.current.validate({ amount: '1' });

      expect(errors).toBeUndefined();
    });
  });
});
