import { renderHook, act } from '@testing-library/react-hooks';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import fc from 'fast-check';
import BigNumber from 'bignumber.js';

import { AvailableProviders } from 'provider/providerManager/types';
import { ETH_SCALE_FACTOR, ONE_ETH } from 'modules/common/const';
import { useAuth } from 'modules/auth/hooks/useAuth';
import {
  approveAETHC,
  swapAssets,
} from 'modules/eth2Swap/actions/transactions';
import { useEth2SwapHook } from '../useEth2SwapHook';

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
  useQuery: jest.fn(),
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
  beforeEach(() => {
    const dispatchRequest = jest.fn(() => Promise.resolve({}));
    (useDispatchRequest as jest.Mock).mockReturnValue(dispatchRequest);

    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
    });

    (useMutation as jest.Mock).mockReturnValue({
      loading: false,
    });

    (useAuth as jest.Mock).mockReturnValue({ chainId: 1 });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useEth2SwapHook());
    const {
      ratio,
      chainId,
      allowance,
      aethBalance,
      fethBalance,
      isDataLoading,
      swapOption,
      balance,
      txError,
      txHash,
      validate,
      calculateFeeAndTotal,
      handleChooseAEthB,
      handleChooseAEthC,
      handleApprove,
      handleSwap,
      handleClearTx,
    } = result.current;

    expect(ratio.toNumber()).toBe(ONE_ETH.toNumber());
    expect(chainId).toBe(1);
    expect(txError).toBe('');
    expect(txHash).toBe('');
    expect(allowance.toNumber()).toBe(0);
    expect(aethBalance).toBeUndefined();
    expect(fethBalance).toBeUndefined();
    expect(isDataLoading).toBe(false);
    expect(swapOption).toBeDefined();
    expect(balance.toNumber()).toBe(0);
    expect(validate).toBeDefined();
    expect(calculateFeeAndTotal).toBeDefined();
    expect(handleChooseAEthB).toBeDefined();
    expect(handleChooseAEthC).toBeDefined();
    expect(handleApprove).toBeDefined();
    expect(handleSwap).toBeDefined();
    expect(handleClearTx).toBeDefined();
  });

  describe('handle clear tx', () => {
    test('should clear tx hash and error', () => {
      const { result } = renderHook(() => useEth2SwapHook());

      act(() => {
        result.current.handleClearTx();
      });

      expect(result.current.txError).toBe('');
      expect(result.current.txHash).toBe('');
    });
  });

  describe('handle swap', () => {
    test('should handle assets swap properly', () => {
      const { result } = renderHook(() => useEth2SwapHook());

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

      const { result } = renderHook(() => useEth2SwapHook());

      await act(() => {
        result.current.handleSwap('1');
      });

      expect(result.current.txError).toBe('error');
    });
  });

  describe('handle approve', () => {
    test('should handle approve aETHc for aETHb properly', () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: { allowance: new BigNumber(1) },
        loading: false,
      });

      const { result } = renderHook(() => useEth2SwapHook());

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
      const { result } = renderHook(() => useEth2SwapHook());

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
      const { result } = renderHook(() => useEth2SwapHook());

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

  describe('swap option', () => {
    test('should change swap option properly', () => {
      const { result } = renderHook(() => useEth2SwapHook());
      const { handleChooseAEthB, handleChooseAEthC } = result.current;

      expect(result.current.swapOption).toBe('aETHb');

      act(() => handleChooseAEthC());

      expect(result.current.swapOption).toBe('aETHc');

      act(() => handleChooseAEthB());

      expect(result.current.swapOption).toBe('aETHb');
    });
  });

  describe('calculate with ratio', () => {
    test('should calculate total amount from aETHb to aETHc', () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: {
          ratio: new BigNumber('940763088322812800'),
        },
        loading: false,
      });

      const { result } = renderHook(() => useEth2SwapHook());

      act(() => {
        result.current.handleChooseAEthB();
      });

      const total = result.current.calculateValueWithRatio(new BigNumber(10));
      expect(total.toNumber()).toBe(10.6297);
    });

    test('should calculate total amount from aETHc to aETHb', () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: {
          ratio: new BigNumber('940763088322812800'),
        },
        loading: false,
      });

      const { result } = renderHook(() => useEth2SwapHook());

      act(() => {
        result.current.handleChooseAEthC();
      });

      const total = result.current.calculateValueWithRatio(new BigNumber(10));
      expect(total.toNumber()).toBe(9.4076);
    });
  });

  describe('validate', () => {
    test('should return max validation error', async () => {
      const { result } = renderHook(() => useEth2SwapHook());

      const errors = await result.current.validate({ amount: '11' });

      expect(errors).toStrictEqual({ amount: 'Should be less than 0' });
    });

    test('should return positive validation error', async () => {
      const { result } = renderHook(() => useEth2SwapHook());

      const errors = await result.current.validate({ amount: '-1' });

      expect(errors).toStrictEqual({ amount: 'Should be greater than 0' });
    });

    test('should return NaN validation error', async () => {
      const { result } = renderHook(() => useEth2SwapHook());

      const errors = await result.current.validate({ amount: 'NaN' });

      expect(errors).toStrictEqual({ amount: 'Must be a number' });
    });

    test('should return required validation error', async () => {
      const { result } = renderHook(() => useEth2SwapHook());

      const errors = await result.current.validate({});

      expect(errors).toStrictEqual({ amount: 'This field is required' });
    });

    test('should not return any validation error', async () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: {
          fethBalance: new BigNumber(ETH_SCALE_FACTOR),
          aethBalance: new BigNumber(ETH_SCALE_FACTOR),
          ratio: new BigNumber('940763088322812800'),
        },
        loading: false,
      });

      const { result } = renderHook(() => useEth2SwapHook());

      const errors = await result.current.validate({ amount: '1' });

      expect(errors).toBeUndefined();
    });
  });
});
