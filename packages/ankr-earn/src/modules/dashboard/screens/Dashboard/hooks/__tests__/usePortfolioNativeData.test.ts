import { useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';

import { ZERO } from 'modules/common/const';

import { usePortfolioNativeData } from '../usePortfolioNativeData';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/hooks/usePortfolioNativeData', () => {
  const defaultQueryData = {
    loading: false,
    data: undefined,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultQueryData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial zero data', () => {
    const { result } = renderHook(() => usePortfolioNativeData());

    expect(result.current).toStrictEqual({
      data: [],
      isLoading: false,
      totalAmountUsd: ZERO,
    });
  });
});
