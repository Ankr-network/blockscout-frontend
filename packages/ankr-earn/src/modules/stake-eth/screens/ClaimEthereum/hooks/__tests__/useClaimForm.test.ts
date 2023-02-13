import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useClaimETHMutation } from 'modules/stake-eth/actions/claim';
import { useGetETHClaimableDataQuery } from 'modules/stake-eth/actions/getClaimableData';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';

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

jest.mock('modules/stake-eth/actions/claim', () => ({
  claim: jest.fn(),
}));

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/getClaimableData', () => ({
  useGetETHClaimableDataQuery: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/claim', () => ({
  useClaimETHMutation: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/getCommonData', () => ({
  useGetETHCommonDataQuery: jest.fn(),
}));

describe('modules/stake-eth/screens/ClaimEthereum/hooks/useClaimForm', () => {
  const defaultQueryData = {
    data: undefined,
    error: undefined,
    loading: false,
    isFetching: false,
  };

  const defaultCommonData = {
    ...defaultQueryData,
    data: {
      claimableAETHC: new BigNumber(1),
      claimableAETHB: new BigNumber(2),
      aETHcRatio: new BigNumber(0.8),
    },
    refetch: jest.fn(),
  };

  const defaultMutationData = {
    loading: false,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultCommonData);
    (useMutation as jest.Mock).mockReturnValue(defaultMutationData);
    (useDispatchRequest as jest.Mock).mockReturnValue(jest.fn());
    (useConnectedData as jest.Mock).mockReturnValue({ chainId: 1 });
    (useGetETHClaimableDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: {
        claimableAETHC: new BigNumber(1),
        claimableAETHB: new BigNumber(2),
      },
      refetch: jest.fn(),
    });
    (useClaimETHMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        isLoading: false,
      },
    ]);
    (useGetETHCommonDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: {
        claimableAETHC: new BigNumber(1.6),
        claimableAETHB: new BigNumber(2),
        aETHcRatio: new BigNumber(0.8),
      },
      refetch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return correct data', () => {
    const { result } = renderHook(() => useClaimForm());
    const { claimableAETHB, claimableAETHC } = defaultCommonData.data;

    expect(result.current.nativeAmount).toStrictEqual(new BigNumber(1.25));
    expect(result.current.balance).toStrictEqual(claimableAETHB);
    expect(result.current.totalAmount).toStrictEqual(claimableAETHC);
    expect(result.current.closeHref).toBe('/dashboard');
    expect(result.current.isLoading).toBe(defaultMutationData.loading);
    expect(result.current.isBalanceLoading).toBe(defaultCommonData.loading);
    expect(result.current.onSubmit).toBeDefined();
  });

  test('should return loading when claim is pending', () => {
    (useClaimETHMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        isLoading: true,
      },
    ]);

    const { result } = renderHook(() => useClaimForm());

    expect(result.current.isLoading).toBe(true);
  });
});
