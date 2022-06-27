import { useQuery } from '@redux-requests/react';
import { renderHook } from '@testing-library/react-hooks';

import { useTxReceipt } from '../useTxReceipt';

jest.mock('@redux-requests/react', () => ({
  useQuery: jest.fn(),
}));

describe('modules/bridge/hooks/useTxReceipt', () => {
  const defaultData = {
    loading: false,
    pristine: true,
    data: undefined,
    error: undefined,
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue(defaultData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return actual initial data', () => {
    const { result } = renderHook(() => useTxReceipt('action'));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccessful).toBe(false);
    expect(result.current.actionName).toBe('getTxReceipt/action');
  });

  test('loading true when is not pristine', () => {
    (useQuery as jest.Mock).mockReturnValue({
      ...defaultData,
      pristine: false,
    });

    const { result } = renderHook(() => useTxReceipt('action'));

    expect(result.current.isLoading).toBe(true);
  });

  test('should not be loading when has a result', () => {
    (useQuery as jest.Mock).mockReturnValue({
      ...defaultData,
      pristine: false,
      data: {
        status: true,
      },
    });

    const { result } = renderHook(() => useTxReceipt('action'));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccessful).toBe(true);
  });
});
