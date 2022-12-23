import { throwIfError } from '@ankr.com/common';

import { connectEthCompatible } from 'modules/auth/eth/actions/connectEthCompatible';

export function createWalletConnectionGuard() {
  return function walletConnectionGuard(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    request: any,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    store: any,
  ): { promise: Promise<unknown> } {
    return {
      promise: (async () => {
        const { data } = throwIfError(
          await store.dispatch(connectEthCompatible.initiate()),
        );

        return request.promise(store, data);
      })(),
    };
  };
}
