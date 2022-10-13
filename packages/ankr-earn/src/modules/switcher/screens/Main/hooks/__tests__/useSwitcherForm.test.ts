import { useDispatchRequest, useMutation } from '@redux-requests/react';
import { renderHook, act } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';
import fc from 'fast-check';

import { AvailableWriteProviders, EEthereumNetworkId } from 'common';

import { switchNetwork } from 'modules/auth/common/actions/switchNetwork';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { ONE_ETH, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { approve, swapAssets } from 'modules/switcher/actions/transactions';

import { useSwitcherForm, ISwitcherFormHookArgs } from '..';

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('modules/switcher/actions/transactions', () => ({
  approve: jest.fn(),
  swapAssets: jest.fn(),
}));

jest.mock('modules/auth/common/actions/switchNetwork', () => ({
  switchNetwork: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useAuth', () => ({
  useAuth: jest.fn(),
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
    const dispatchRequest = jest.fn(() => Promise.resolve({}));
    (useDispatchRequest as jest.Mock).mockReturnValue(dispatchRequest);

    (useMutation as jest.Mock).mockReturnValue({
      loading: false,
    });

    (useAuth as jest.Mock).mockReturnValue({ chainId: 1 });

    (switchNetwork as jest.Mock).mockReturnValue(undefined);
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
      calculateFeeAndTotal,
      handleApprove,
      handleSwap,
      handleClearTx,
      handleSwitchNetwork,
    } = result.current;

    expect(txError).toBe('');
    expect(txHash).toBe('');
    expect(validate).toBeDefined();
    expect(calculateFeeAndTotal).toBeDefined();
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

  describe('handle swap', () => {
    test('should handle assets swap properly', async () => {
      const { result } = renderHook(() => useSwitcherForm(defaultHookProps));

      act(() => {
        result.current.handleSwap('1');
      });

      expect(swapAssets).toBeCalledTimes(1);
      expect(swapAssets).toBeCalledWith({
        amount: '1',
        from: Token.aETHb,
        to: Token.aETHc,
        ratio: ONE_ETH,
        chainId: EEthereumNetworkId.mainnet,
      });
    });

    test('should handle swap error', async () => {
      const dispatchRequest = jest.fn(() =>
        Promise.resolve({ error: 'error' }),
      );

      (useDispatchRequest as jest.Mock).mockReturnValue(dispatchRequest);

      const { result, waitForNextUpdate } = renderHook(() =>
        useSwitcherForm(defaultHookProps),
      );

      act(() => {
        result.current.handleSwap('1');
      });

      await waitForNextUpdate();

      expect(result.current.txError).toBe('error');
    });

    test('should handle swap error object', async () => {
      const dispatchRequest = jest.fn(() =>
        Promise.resolve({ error: new Error('error') }),
      );

      (useDispatchRequest as jest.Mock).mockReturnValue(dispatchRequest);

      const { result, waitForNextUpdate } = renderHook(() =>
        useSwitcherForm(defaultHookProps),
      );

      act(() => {
        result.current.handleSwap('1');
      });

      await waitForNextUpdate();

      expect(result.current.txError).toBe('error');
    });
  });

  describe('handle approve', () => {
    test('should handle approve aETHc for aETHb properly', async () => {
      const { result } = renderHook(() => useSwitcherForm(defaultHookProps));

      act(() => {
        result.current.handleApprove();
      });

      expect(approve).toBeCalledTimes(1);
      expect(approve).toBeCalledWith({
        chainId: EEthereumNetworkId.mainnet,
        token: Token.aETHb,
      });
    });
  });

  describe('fee and total', () => {
    test('should check fee and total sum', () => {
      const { result } = renderHook(() => useSwitcherForm(defaultHookProps));

      fc.assert(
        fc.property(
          fc.float(),
          fc.nat(10_000),
          (amount: number, feeBP: number) => {
            const { fee, total } = result.current.calculateFeeAndTotal({
              amount: new BigNumber(amount),
              feeBP: new BigNumber(feeBP),
            });

            return fee.plus(total).eq(amount);
          },
        ),
      );
    });

    test('should calculate fee and total value', () => {
      const { result } = renderHook(() => useSwitcherForm(defaultHookProps));

      {
        const { fee, total } = result.current.calculateFeeAndTotal({
          feeBP: new BigNumber(10_000),
          amount: new BigNumber(10),
        });

        expect(fee.toNumber()).toStrictEqual(10);
        expect(total.toNumber()).toStrictEqual(0);
      }

      {
        const { fee, total } = result.current.calculateFeeAndTotal({
          feeBP: new BigNumber(30),
          amount: new BigNumber(5.24),
        });

        expect(fee.toNumber()).toStrictEqual(0.01572);
        expect(total.toNumber()).toStrictEqual(5.22428);
      }
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
