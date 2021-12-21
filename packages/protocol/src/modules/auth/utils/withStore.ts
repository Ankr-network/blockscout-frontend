import { RequestAction, RequestsStore } from '@redux-requests/core';

export function withStore(
  request: any,
  action: RequestAction,
  store: RequestsStore,
) {
  return {
    promise: (async () => {
      return request.promise(store);
    })(),
  };
}
