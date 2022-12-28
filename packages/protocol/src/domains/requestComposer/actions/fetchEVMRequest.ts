import { EVMLibraryID, EVMMethod } from '../constants';
import { EVMMethodResponse, MethodsRequest } from '../types';
import { RPC_CALLS_CONFIG } from '../utils/RPCCallsConfig';
import { buildProvider } from '../utils/buildProvider';
import { setEVMMethod } from '../store/requestComposerSlice';
import { web3Api } from 'store/queries';

export interface FetchEVMRequestParams {
  libraryID: EVMLibraryID;
  params: MethodsRequest<EVMMethod>;
  web3URL: string;
}

export interface FetchEVMRequestResult {
  response?: [EVMMethodResponse];
  error?: unknown;
  time: number;
}

export const {
  endpoints: { requestComposerFetchEVMRequest },
  useLazyRequestComposerFetchEVMRequestQuery,
  useRequestComposerFetchEVMRequestQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    requestComposerFetchEVMRequest: build.query<
      FetchEVMRequestResult,
      FetchEVMRequestParams
    >({
      queryFn: async ({ libraryID, params, web3URL }, { dispatch }) => {
        const { methodName, params: args } = params;

        dispatch(setEVMMethod(methodName));

        const web3Method = RPC_CALLS_CONFIG[methodName] || {};
        const { exec, parseArgs } = web3Method[libraryID] || {};

        const provider = buildProvider(libraryID, web3URL);

        const start = performance.now();

        try {
          const parsedArgs = args.map((arg, i) =>
            parseArgs?.[i] ? parseArgs[i](arg) : arg,
          );

          const data: EVMMethodResponse = await exec(provider, ...parsedArgs);

          // We need to use a reference data type for response to make sure
          // that react will render the components with the same value
          // for different requests.
          const response: [EVMMethodResponse] = [data];

          return { data: { response, time: performance.now() - start } };
        } catch (error) {
          return { data: { error, time: performance.now() - start } };
        }
      },
    }),
  }),
});
