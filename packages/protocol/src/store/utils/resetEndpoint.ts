import { nothing } from 'immer';

import { AppDispatch } from 'store/store';
import { web3Api } from 'store/queries';

export const resetEndpoint = (endpointName = '', dispatch: AppDispatch) => {
  if (web3Api.endpoints[endpointName as never]) {
    dispatch(
      web3Api.util.updateQueryData(
        endpointName as unknown as never,
        undefined as unknown as never,
        () => nothing,
      ),
    );
  }
};
