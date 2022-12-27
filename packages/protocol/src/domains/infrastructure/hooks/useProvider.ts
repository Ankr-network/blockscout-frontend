import { IProvider } from 'multirpc-sdk';

import { Trigger, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { infrastructureFetchProvider } from 'domains/infrastructure/actions/fetchProvider';

export interface Provider {
  handleFetchProvider: Trigger<void, IProvider>;
  isLoading: boolean;
  providerData?: IProvider | null;
}

export const useProvider = (): Provider => {
  const [handleFetchProvider, { data, isLoading }] = useQueryEndpoint(
    infrastructureFetchProvider,
  );

  return {
    handleFetchProvider,
    isLoading,
    providerData: typeof data === 'string' ? null : data,
  };
};
