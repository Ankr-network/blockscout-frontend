import { RequestAction } from '@redux-requests/core';

import { connectEthCompatible } from 'modules/auth/eth/actions/connectEthCompatible';

export function createWalletConnectionGuard(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  request: any,
  _action: RequestAction,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  store: any,
): { promise: Promise<unknown> } {
  return {
    promise: (async () => {
      await store.dispatch(connectEthCompatible.initiate());

      return request.promise(store);
    })(),
  };
}
