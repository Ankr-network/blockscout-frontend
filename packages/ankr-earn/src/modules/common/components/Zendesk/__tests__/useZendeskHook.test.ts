import { act, renderHook } from '@testing-library/react-hooks';

import {
  useZendeskHook,
  IUseZendeskHookArgs,
  ZENDESK_WIDGET_KEY,
  ZendeskActions,
} from '../useZendeskHook';

describe('modules/common/components/Zendesk/useZendeskHook', () => {
  const defaultHookArgs: IUseZendeskHookArgs = {
    zendeskKey: 'key',
  };

  const oldZE = { ...window.zE };

  beforeEach(() => {
    window.zE = { ...oldZE } as unknown as typeof window.zE;

    window.zE = function zE() {
      return undefined;
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return initial data', () => {
    const { result } = renderHook(() => useZendeskHook(defaultHookArgs));

    expect(result.current.isLoaded).toBe(false);
    expect(result.current.onOpen).toBeDefined();
    expect(result.current.onHide).toBeDefined();
    expect(result.current.onShow).toBeDefined();
  });

  test('should inject script and load', () => {
    window.zE = undefined;

    const appendSpy = jest.spyOn(document.body, 'appendChild');

    renderHook(() => useZendeskHook(defaultHookArgs));

    expect(appendSpy).toBeCalledTimes(1);
  });

  test('should open widget', () => {
    const spyZE = jest.spyOn(window, 'zE');

    const { result } = renderHook(() => useZendeskHook(defaultHookArgs));

    act(() => {
      result.current.onOpen();
    });

    expect(spyZE).toBeCalledWith(ZENDESK_WIDGET_KEY, ZendeskActions.OPEN);
  });

  test('should show widget', () => {
    const spyZE = jest.spyOn(window, 'zE');

    const { result } = renderHook(() => useZendeskHook(defaultHookArgs));

    act(() => {
      result.current.onShow();
    });

    expect(spyZE).toBeCalledWith(ZENDESK_WIDGET_KEY, ZendeskActions.SHOW);
  });

  test('should hide widget', () => {
    const spyZE = jest.spyOn(window, 'zE');

    const { result } = renderHook(() => useZendeskHook(defaultHookArgs));

    act(() => {
      result.current.onHide();
    });

    expect(spyZE).toBeCalledWith(ZENDESK_WIDGET_KEY, ZendeskActions.HIDE);
  });
});
