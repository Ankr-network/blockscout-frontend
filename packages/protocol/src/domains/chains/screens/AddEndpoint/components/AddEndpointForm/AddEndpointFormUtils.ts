import { useMemo } from 'react';
import { IPrivateEndpoint } from 'multirpc-sdk';

import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';

export const initialValues = {};

export const formatDataForRequest = (
  chainId: string,
  scheme: string,
  requestUrl: string,
): IPrivateEndpoint => {
  return {
    blockchain: chainId,
    scheme,
    requestUrl,
  };
};

export const usePrivateUrls = (privateChain?: IApiChain) => {
  return useMemo(
    () =>
      [
        ...(privateChain?.urls || []),
        ...(privateChain?.extensions || []).flatMap<IApiChainURL>(
          ({ urls }) => urls,
        ),
        ...(privateChain?.extenders || []).flatMap<IApiChainURL>(
          ({ urls }) => urls,
        ),
      ].flatMap<string>(({ rpc, ws }) => (ws ? [rpc, ws] : [rpc])),
    [privateChain],
  );
};

export const usePublicUrls = (publicChain?: IApiChain) => {
  return useMemo(
    () =>
      [
        ...(publicChain?.urls || []),
        ...(publicChain?.extensions || []).flatMap<IApiChainURL>(
          ({ urls }) => urls,
        ),
        ...(publicChain?.extenders || []).flatMap<IApiChainURL>(
          ({ urls }) => urls,
        ),
      ].flatMap<string>(({ rpc, ws }) => (ws ? [rpc, ws] : [rpc])),
    [publicChain],
  );
};
