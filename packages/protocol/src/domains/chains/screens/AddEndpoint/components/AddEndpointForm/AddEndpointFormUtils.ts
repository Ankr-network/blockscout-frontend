import { useMemo } from 'react';
import { IPrivateEndpoint } from 'multirpc-sdk';

import { Chain, ChainURL } from 'modules/chains/types';

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

export const usePrivateUrls = (privateChain?: Chain) => {
  return useMemo(
    () =>
      [
        ...(privateChain?.urls || []),
        ...(privateChain?.extensions || []).flatMap<ChainURL>(
          ({ urls }) => urls,
        ),
        ...(privateChain?.extenders || []).flatMap<ChainURL>(
          ({ urls }) => urls,
        ),
      ].flatMap<string>(({ rpc, ws }) => (ws ? [rpc, ws] : [rpc])),
    [privateChain],
  );
};

export const usePublicUrls = (publicChain?: Chain) => {
  return useMemo(
    () =>
      [
        ...(publicChain?.urls || []),
        ...(publicChain?.extensions || []).flatMap<ChainURL>(
          ({ urls }) => urls,
        ),
        ...(publicChain?.extenders || []).flatMap<ChainURL>(({ urls }) => urls),
      ].flatMap<string>(({ rpc, ws }) => (ws ? [rpc, ws] : [rpc])),
    [publicChain],
  );
};
