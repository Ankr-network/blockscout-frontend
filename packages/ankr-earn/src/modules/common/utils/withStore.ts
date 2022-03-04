import { RequestAction, RequestsStore } from '@redux-requests/core';

export function withStore(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  request: any,
  _action: RequestAction,
  store: RequestsStore,
): { promise: Promise<unknown> } {
  return {
    promise: (async () => {
      return request.promise(store);
    })(),
  };
}
