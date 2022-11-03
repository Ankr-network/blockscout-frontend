import { act, renderHook } from '@testing-library/react-hooks';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';

import { useProgressStepHook } from '../useProgressStepHook';

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: jest.fn(),
}));

describe('modules/common/components/ProgressStep/useProgressStepHook', () => {
  beforeEach(() => {
    jest.useFakeTimers();

    (useConnectedData as jest.Mock).mockImplementation(() => ({
      chainId: undefined,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useProgressStepHook(Token.ANKR));

    expect(result.current.chainId).toBe(1);
    expect(result.current.isAddressCopied).toBe(false);
    expect(result.current.isTxCopied).toBe(false);
    expect(result.current.handleCopyTxHash).toBeDefined();
    expect(result.current.handleCopyDestinationAddress).toBeDefined();
  });

  test('should handle copy tx hash', () => {
    const { result } = renderHook(() => useProgressStepHook(Token.ANKR));

    act(() => result.current.handleCopyTxHash());

    expect(result.current.isTxCopied).toBe(true);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.isTxCopied).toBe(false);
  });

  test('should handle copy destination address', () => {
    const { result } = renderHook(() => useProgressStepHook(Token.ANKR));

    act(() => result.current.handleCopyDestinationAddress());

    expect(result.current.isAddressCopied).toBe(true);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.isAddressCopied).toBe(false);
  });
});
