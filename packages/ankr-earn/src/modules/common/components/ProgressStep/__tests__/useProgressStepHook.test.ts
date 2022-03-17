import { act, renderHook } from '@testing-library/react-hooks';

import { useAuth } from 'modules/auth/hooks/useAuth';

import { useProgressStepHook } from '../useProgressStepHook';

jest.mock('modules/auth/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('modules/common/components/ProgressStep/useProgressStepHook', () => {
  beforeEach(() => {
    jest.useFakeTimers();

    (useAuth as jest.Mock).mockImplementation(() => ({ chainId: undefined }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useProgressStepHook());

    expect(result.current.chainId).toBe(1);
    expect(result.current.isAddressCopied).toBe(false);
    expect(result.current.isTxCopied).toBe(false);
    expect(result.current.handleCopyTxHash).toBeDefined();
    expect(result.current.handleCopyDestinationAddress).toBeDefined();
  });

  test('should handle copy tx hash', () => {
    const { result } = renderHook(() => useProgressStepHook());

    act(() => result.current.handleCopyTxHash());

    expect(result.current.isTxCopied).toBe(true);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.isTxCopied).toBe(false);
  });

  test('should handle copy destination address', () => {
    const { result } = renderHook(() => useProgressStepHook());

    act(() => result.current.handleCopyDestinationAddress());

    expect(result.current.isAddressCopied).toBe(true);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.isAddressCopied).toBe(false);
  });
});
