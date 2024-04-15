import { MultiRpcWeb3Sdk } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { QueryFn, QueryReturn } from 'store/queries/types';

export interface ParamsWithWeb3Service<Params> {
  params: Params;
  web3Service: MultiRpcWeb3Sdk;
}

export interface QueryFnWithWeb3ServiceGuardParams<Params, Result> {
  fallback: QueryReturn<Result>;
  queryFn: QueryFn<ParamsWithWeb3Service<Params>, Result>;
}

export const createQueryFnWithWeb3ServiceGuard = <Params, Result>({
  fallback,
  queryFn,
}: QueryFnWithWeb3ServiceGuardParams<Params, Result>) => {
  const fn: QueryFn<Params, Result> = async (params, ...args) => {
    const web3Service = MultiService.getWeb3Service();

    if (web3Service) {
      const result = await queryFn({ params, web3Service }, ...args);

      return result;
    }

    return fallback;
  };

  return fn;
};
