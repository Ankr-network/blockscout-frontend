import { act, renderHook } from '@testing-library/react-hooks';

import { useCopyTokenAddressHook } from 'modules/common/hooks/useCopyTokenAddressHook';

describe('modules/dashboard/components/CopyTokenAddress/useCopyTokenAddressHook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useCopyTokenAddressHook());

    expect(result.current.isCopied).toBe(false);
    expect(result.current.handleCopy).toBeDefined();
  });

  test('should handle copy address', () => {
    const { result } = renderHook(() => useCopyTokenAddressHook());

    act(() => result.current.handleCopy());

    expect(result.current.isCopied).toBe(true);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.isCopied).toBe(false);
  });
});
