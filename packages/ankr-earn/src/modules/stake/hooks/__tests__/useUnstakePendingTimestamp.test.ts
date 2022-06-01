import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';

import { Token } from 'modules/common/types/token';

import { useUnstakePendingTimestamp } from '../useUnstakePendingTimestamp';

jest.mock('@redux-requests/react', () => ({
  useDispatchRequest: jest.fn(),
  useQuery: jest.fn(),
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
    });
  });

  test('should return default AVAX data if time is over', () => {
    const date = new Date();
    (useQuery as jest.Mock).mockReturnValue({ data: { avax: date } });

    const { result } = renderHook(() =>
      useUnstakePendingTimestamp({
        token: Token.AVAX,
      }),
    );

    expect(result.current).toStrictEqual({
      label: 'It takes about 28 days to unstake',
      timestamp: +date,
    });
  });
});
