import { useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';

import { ZERO } from 'modules/common/const';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import { useGetMaxApyQuery } from 'modules/stake-ankr/actions/getMaxApy';
import { useGetTotalInfoQuery } from 'modules/stake-ankr/actions/getTotalInfo';

import { usePortfolioStakedData } from '../usePortfolioStakedData';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('modules/stake-ankr/actions/getANKRPrice', () => ({
  useGetAnkrPriceQuery: jest.fn(),
}));

jest.mock('modules/stake-ankr/actions/getMaxApy', () => ({
  useGetMaxApyQuery: jest.fn(),
}));

jest.mock('modules/stake-ankr/actions/getTotalInfo', () => ({
  useGetTotalInfoQuery: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/MyPortfolio/usePortfolioStakedData', () => {
  const defaultQueryData = {
    loading: false,
    data: undefined,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultQueryData);
    (useGetAnkrPriceQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetMaxApyQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetTotalInfoQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial zero data', () => {
    const { result } = renderHook(() => usePortfolioStakedData());

    expect(result.current).toStrictEqual({
      data: [],
      isLoading: false,
      totalAmountUsd: ZERO,
      totalYieldAmountUsd: ZERO,
      apr: ZERO,
    });
  });
});
