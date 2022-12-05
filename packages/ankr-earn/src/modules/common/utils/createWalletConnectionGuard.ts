import { throwIfError } from '@ankr.com/common';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { connect } from 'modules/auth/common/actions/connect';

export function createWalletConnectionGuard(provider: AvailableWriteProviders) {
  return function walletConnectionGuard(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    request: any,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    store: any,
  ): { promise: Promise<unknown> } {
    return {
      promise: (async () => {
        const { data } = throwIfError(
          await store.dispatch(connect.initiate({ providerId: provider })),
        );

        return request.promise(store, data);
      })(),
    };
  };
}
