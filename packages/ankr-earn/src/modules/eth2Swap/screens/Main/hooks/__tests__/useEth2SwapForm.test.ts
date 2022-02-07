import { renderHook, act } from '@testing-library/react-hooks';
import { useDispatchRequest, useMutation } from '@redux-requests/react';
import fc from 'fast-check';
import BigNumber from 'bignumber.js';

import { AvailableProviders } from 'provider/providerManager/types';
import { ONE_ETH, ZERO } from 'modules/common/const';
import { useAuth } from 'modules/auth/hooks/useAuth';
import {
  approveAETHC,
  swapAssets,
} from 'modules/eth2Swap/actions/transactions';
import { useEth2SwapForm, IEth2SwapFormHookArgs } from '..';

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('modules/eth2Swap/actions/transactions', () => ({
  approveAETHC: jest.fn(),
  swapAssets: jest.fn(),
}));

jest.mock('modules/auth/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('modules/eth2Swap/screens/Main/useEth2SwapHook', () => {
  const defaultHookProps: IEth2SwapFormHookArgs = {
    ratio: ONE_ETH,
    swapOption: 'aETHb',
    max: ONE_ETH,
  };

  beforeEach(() => {
    const dispatchRequest = jest.fn(() => Promise.resolve({}));
    (useDispatchRequest as jest.Mock).mockReturnValue(dispatchRequest);

    (useMutation as jest.Mock).mockReturnValue({
      loading: false,
    });

    (useAuth as jest.Mock).mockReturnValue({ chainId: 1 });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useEth2SwapForm(defaultHookProps));
    const {
      txError,
      txHash,
      validate,
      calculateFeeAndTotal,
      handleApprove,
      handleSwap,
      handleClearTx,
    } = result.current;

    expect(txError).toBe('');
    expect(txHash).toBe('');
    expect(validate).toBeDefined();
    expect(calculateFeeAndTotal).toBeDefined();
    expect(handleApprove).toBeDefined();
    expect(handleSwap).toBeDefined();
    expect(handleClearTx).toBeDefined();
  });

  describe('handle clear tx', () => {
    test('should clear tx hash and error', () => {
      const { result } = renderHook(() => useEth2SwapForm(defaultHookProps));

      act(() => {
        result.current.handleClearTx();
      });

      expect(result.current.txError).toBe('');
      expect(result.current.txHash).toBe('');
    });
  });

  describe('handle swap', () => {
    test('should handle assets swap properly', () => {
      const { result } = renderHook(() => useEth2SwapForm(defaultHookProps));

      act(() => {
        result.current.handleSwap('1');
      });

      expect(swapAssets).toBeCalledTimes(1);
      expect(swapAssets).toBeCalledWith({
        amount: '1',
        swapOption: 'aETHb',
        providerId: AvailableProviders.ethCompatible,
      });
    });

    test('should handle swap error', async () => {
      const dispatchRequest = jest.fn(() =>
        Promise.resolve({ error: 'error' }),
      );

      (useDispatchRequest as jest.Mock).mockReturnValue(dispatchRequest);

      const { result } = renderHook(() => useEth2SwapForm(defaultHookProps));

      await act(() => {
        result.current.handleSwap('1');
      });

      expect(result.current.txError).toBe('error');
    });
  });

  describe('handle approve', () => {
    test('should handle approve aETHc for aETHb properly', () => {
      const { result } = renderHook(() => useEth2SwapForm(defaultHookProps));

      act(() => {
        result.current.handleApprove();
      });

      expect(approveAETHC).toBeCalledTimes(1);
      expect(approveAETHC).toBeCalledWith({
        providerId: AvailableProviders.ethCompatible,
      });
    });
  });

  describe('fee and total', () => {
    test('should check fee and total sum', () => {
      const { result } = renderHook(() => useEth2SwapForm(defaultHookProps));

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
      const { result } = renderHook(() => useEth2SwapForm(defaultHookProps));

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
        useEth2SwapForm({
          ...defaultHookProps,
          ratio: new BigNumber('940763088322812800'),
        }),
      );

      const total = result.current.calculateValueWithRatio(new BigNumber(10));
      expect(total.toNumber()).toBe(10.6297);
    });

    test('should calculate total amount from aETHc to aETHb', () => {
      const { result } = renderHook(() =>
        useEth2SwapForm({
          ...defaultHookProps,
          swapOption: 'aETHc',
          ratio: new BigNumber('940763088322812800'),
        }),
      );

      const total = result.current.calculateValueWithRatio(new BigNumber(10));
      expect(total.toNumber()).toBe(9.4076);
    });
  });

  describe('validate', () => {
    test('should return max validation error', async () => {
      const { result } = renderHook(() =>
        useEth2SwapForm({ ...defaultHookProps, max: ZERO }),
      );

      const errors = await result.current.validate({ amount: '11' });

      expect(errors).toStrictEqual({ amount: 'Should be less than 0' });
    });

    test('should return positive validation error', async () => {
      const { result } = renderHook(() => useEth2SwapForm(defaultHookProps));

      const errors = await result.current.validate({ amount: '-1' });

      expect(errors).toStrictEqual({ amount: 'Should be greater than 0' });
    });

    test('should return NaN validation error', async () => {
      const { result } = renderHook(() => useEth2SwapForm(defaultHookProps));

      const errors = await result.current.validate({ amount: 'NaN' });

      expect(errors).toStrictEqual({ amount: 'Must be a number' });
    });

    test('should return required validation error', async () => {
      const { result } = renderHook(() => useEth2SwapForm(defaultHookProps));

      const errors = await result.current.validate({});

      expect(errors).toStrictEqual({ amount: 'This field is required' });
    });

    test('should not return any validation error', async () => {
      const { result } = renderHook(() => useEth2SwapForm(defaultHookProps));

      const errors = await result.current.validate({ amount: '1' });

      expect(errors).toBeUndefined();
    });
  });
});
