import { useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';
import BigNumber from 'bignumber.js';

import { TMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useStakeStats } from '../useStakeStats';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

describe('src/modules/stake/components/StakeStats/useStakeStats', () => {
  const defaultQueryAction = {
    loading: false,
    data: undefined,
  };

  const defaultQueryMetrics = {
    ...defaultQueryAction,
    data: {
      eth: {
        totalStaked: new BigNumber(100),
        totalStakedUsd: new BigNumber(1000),
        stakers: '20',
        apy: new BigNumber(4),
      } as TMetrics['eth'],
    },
  };

  const defaultArgs = {
    amount: 2,
    metricsServiceName: EMetricsServiceName.ETH,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultQueryMetrics);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useStakeStats(defaultArgs));

    expect(result.current.apy).toBe('4.0%');
    expect(result.current.yearlyEarning).toBe('0.08');
    expect(result.current.yearlyEarningUSD).toBe('0.8');
    expect(result.current.totalStaked).toBe('100');
    expect(result.current.totalStakedUSD).toBe('1,000');
    expect(result.current.stakers).toBe('20');
  });

  test('should return relevant data on error', () => {
    (useQuery as jest.Mock).mockReturnValue({ error: {}, data: null });

    const { result } = renderHook(() => useStakeStats(defaultArgs));

    expect(result.current.apy).toBe('N/A');
    expect(result.current.yearlyEarning).toBe('0');
    expect(result.current.yearlyEarningUSD).toBe('N/A');
    expect(result.current.totalStaked).toBe(undefined);
    expect(result.current.totalStakedUSD).toBe(undefined);
    expect(result.current.stakers).toBe(undefined);
  });
});
