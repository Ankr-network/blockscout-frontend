import { useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';

import { ZERO } from 'modules/common/const';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import { useGetCommonDataQuery } from 'modules/stake-ankr/actions/getCommonData';
import { useGetMaxApyQuery } from 'modules/stake-ankr/actions/getMaxApy';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/fetchCommonData';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';
import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';
import { useGetDashboardDataQuery } from 'modules/stake-xdc/actions/getDashboardData';

import { usePortfolioNativeData } from '../usePortfolioNativeData';

jest.mock('modules/stake-ankr/actions/getANKRPrice', () => ({
  useGetAnkrPriceQuery: jest.fn(),
}));

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

jest.mock('modules/stake-ankr/actions/getCommonData', () => ({
  useGetCommonDataQuery: jest.fn(),
}));

jest.mock('modules/stake-ankr/actions/getMaxApy', () => ({
  useGetMaxApyQuery: jest.fn(),
}));

jest.mock('modules/stake-avax/actions/fetchCommonData', () => ({
  useGetAVAXCommonDataQuery: jest.fn(),
}));

jest.mock('modules/stake-fantom/actions/getCommonData', () => ({
  useGetFTMCommonDataQuery: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/fetchStats', () => ({
  useGetBNBStatsQuery: jest.fn(),
}));

jest.mock('modules/stake-xdc/actions/getDashboardData', () => ({
  useGetDashboardDataQuery: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/MyPortfolio/usePortfolioNativeData', () => {
  const defaultQueryData = {
    loading: false,
    data: undefined,
  };

  beforeEach(() => {
    (useGetAnkrPriceQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetCommonDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetAVAXCommonDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetMaxApyQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetFTMCommonDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetBNBStatsQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetDashboardDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });

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
      totalYieldAmountUsd: ZERO,
      apr: ZERO,
    });
  });
});
