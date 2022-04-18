import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { useClaimForm } from '../useClaimForm';

jest.mock('@redux-requests/react', () => ({
  useMutation: jest.fn(),
  useQuery: jest.fn(),
  useDispatchRequest: jest.fn(),
}));

jest.mock('modules/dashboard/Routes', () => ({
  RoutesConfig: {
    dashboard: { generatePath: () => '/dashboard' },
  },
}));

describe('modules/stake-eth/screens/ClaimEthereum/hooks/useClaimForm', () => {
  const defaultQueryData = {
    data: undefined,
    error: undefined,
    loading: false,
  };

  const defaultCommonData = {
    ...defaultQueryData,
    data: {
      claimableAETHC: new BigNumber(1),
      claimableAETHB: new BigNumber(2),
      aETHcRatio: new BigNumber(0.8),
    },
  };

  const defaultMutationData = {
    loading: false,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultCommonData);
    (useMutation as jest.Mock).mockReturnValue(defaultMutationData);
    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return correct data', () => {
    const { result } = renderHook(() => useClaimForm());
    const { claimableAETHB } = defaultCommonData.data;

    expect(result.current.aETHcRatio).toStrictEqual(new BigNumber(1.25));
    expect(result.current.selectedToken).toBe(Token.aETHb);
    expect(result.current.balance).toStrictEqual(claimableAETHB);
    expect(result.current.totalAmount).toStrictEqual(claimableAETHB);
    expect(result.current.closeHref).toBe('/dashboard');
    expect(result.current.isLoading).toBe(defaultMutationData.loading);
    expect(result.current.isBalanceLoading).toBe(defaultCommonData.loading);
    expect(result.current.isDisabled).toBe(false);
    expect(result.current.onTokenSelect).toBeDefined();
    expect(result.current.onSubmit).toBeDefined();
  });

  test('should return disabled state when balance is zero', () => {
    (useQuery as jest.Mock).mockReturnValue({
      ...defaultCommonData,
      data: {
        ...defaultCommonData.data,
        claimableAETHB: ZERO,
      },
    });

    const { result } = renderHook(() => useClaimForm());

    expect(result.current.isDisabled).toBe(true);
  });

  test('should return disabled and loading when claim is pending', () => {
    (useMutation as jest.Mock).mockReturnValue({
      loading: true,
    });

    const { result } = renderHook(() => useClaimForm());

    expect(result.current.isDisabled).toBe(true);
    expect(result.current.isLoading).toBe(true);
  });
});
