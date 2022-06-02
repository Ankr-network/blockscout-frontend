import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';

import { Token } from 'modules/common/types/token';
import { getTimeRemaining } from 'modules/common/utils/getTimeRemaining';

import { useUnstakePendingTimestamp } from '../useUnstakePendingTimestamp';

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
  useQuery: jest.fn(),
}));

jest.mock('modules/common/utils/getTimeRemaining', () => ({
  getTimeRemaining: jest.fn(),
}));

jest.mock('../../actions/getUnstakeDate', () => ({
  getUnstakeDate: jest.fn(),
}));

describe('modules/stake/hooks/useUnstakePending', () => {
  const dispatchRequest = jest.fn();

  const unstakeDate = new Date();
  unstakeDate.setDate(unstakeDate.getDate() + 1);
  unstakeDate.setHours(unstakeDate.getHours() + 2);
  unstakeDate.setMinutes(unstakeDate.getMinutes() + 32);

  beforeEach(() => {
    (useDispatchRequest as jest.Mock).mockReturnValue(dispatchRequest);

    (useQuery as jest.Mock).mockReturnValue({ data: { avax: unstakeDate } });

    (getTimeRemaining as jest.Mock).mockReturnValue({
      total: 95_520_000,
      days: 1,
      hours: 2,
      minutes: 32,
      seconds: 0,
    });

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial data', () => {
    const { result } = renderHook(() =>
      useUnstakePendingTimestamp({
        token: Token.AVAX,
      }),
    );

    expect(result.current).toStrictEqual({
      label: 'You will get your AVAX in 1d:2h:32m',
      timestamp: +unstakeDate,
      isTimeOver: false,
    });
  });

  test('should return default AVAX data', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: null });

    const { result } = renderHook(() =>
      useUnstakePendingTimestamp({
        token: Token.AVAX,
      }),
    );

    expect(result.current).toStrictEqual({
      label: 'It takes about 28 days to unstake',
      timestamp: 0,
      isTimeOver: true,
    });
  });

  test('should return default AVAX data if time is over', () => {
    const date = new Date();
    (useQuery as jest.Mock).mockReturnValue({ data: { avax: date } });

    (getTimeRemaining as jest.Mock).mockReturnValue({
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    const { result } = renderHook(() =>
      useUnstakePendingTimestamp({
        token: Token.AVAX,
      }),
    );

    expect(result.current).toStrictEqual({
      label: 'It takes about 28 days to unstake',
      timestamp: +date,
      isTimeOver: true,
    });
  });
});
