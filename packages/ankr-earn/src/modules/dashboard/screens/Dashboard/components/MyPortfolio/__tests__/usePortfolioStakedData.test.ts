import { useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';

import { ZERO } from 'modules/common/const';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import { useGetMaxApyQuery } from 'modules/stake-ankr/actions/getMaxApy';
import { useGetTotalInfoQuery } from 'modules/stake-ankr/actions/getTotalInfo';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/useGetAVAXCommonDataQuery';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/useGetBNBStatsQuery';
import { useGetETHClaimableDataQuery } from 'modules/stake-eth/actions/getClaimableData';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';
import { useGetMaticOnEthStatsQuery } from 'modules/stake-matic/eth/actions/getMaticOnEthStats';
import { useGetMaticOnPolygonCommonDataQuery } from 'modules/stake-matic/polygon/actions/getMaticOnPolygonCommonData';
import { useGetXdcDashboardDataQuery } from 'modules/stake-xdc/actions/getDashboardData';

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

jest.mock('modules/stake-avax/actions/useGetAVAXCommonDataQuery', () => ({
  useGetAVAXCommonDataQuery: jest.fn(),
}));

jest.mock('modules/stake-fantom/actions/getCommonData', () => ({
  useGetFTMCommonDataQuery: jest.fn(),
}));

jest.mock('modules/stake-bnb/actions/useGetBNBStatsQuery', () => ({
  useGetBNBStatsQuery: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/getClaimableData', () => ({
  useGetETHClaimableDataQuery: jest.fn(),
}));

jest.mock('modules/stake-eth/actions/getCommonData', () => ({
  useGetETHCommonDataQuery: jest.fn(),
}));

jest.mock('modules/stake-xdc/actions/getDashboardData', () => ({
  useGetXdcDashboardDataQuery: jest.fn(),
}));

jest.mock(
  'modules/stake-matic/polygon/actions/getMaticOnPolygonCommonData',
  () => ({
    useGetMaticOnPolygonCommonDataQuery: jest.fn(),
  }),
);
jest.mock('modules/stake-matic/eth/actions/getMaticOnEthStats', () => ({
  useGetMaticOnEthStatsQuery: jest.fn(),
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
    (useGetFTMCommonDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetTotalInfoQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetAVAXCommonDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetBNBStatsQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetETHClaimableDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetETHCommonDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetXdcDashboardDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetMaticOnPolygonCommonDataQuery as jest.Mock).mockReturnValue({
      isFetching: false,
      data: undefined,
    });
    (useGetMaticOnEthStatsQuery as jest.Mock).mockReturnValue({
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
