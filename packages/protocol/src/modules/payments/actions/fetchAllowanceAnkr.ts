import BigNumber from 'bignumber.js';
import { formatFromWei } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

export interface IFetchAllowanceAnkrParams {
  address: string;
}

const fallback = 0;

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchAllowanceAnkr },
  useFetchAllowanceAnkrQuery,
  useLazyFetchAllowanceAnkrQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllowanceAnkr: build.query<number, IFetchAllowanceAnkrParams>({
      queryFn: createWeb3NotifyingQueryFn(async ({ address }) => {
        const web3ReadService = await MultiService.getWeb3ReadService();
        const allowance = await web3ReadService
          .getContractService()
          .getAllowance(address);

        const allowanceNumber = new BigNumber(allowance);

        if (allowanceNumber.isZero()) {
          return { data: fallback };
        }

        return { data: Number(formatFromWei(allowanceNumber)) };
      }),
    }),
  }),
});

export const {
  selectDataWithFallbackCachedByParams: selectAllowanceAnkr,
  selectLoadingCachedByParams: selectAllowanceAnkrLoading,
  selectStateCachedByParams: selectAllowanceAnkrState,
} = createQuerySelectors({ endpoint: fetchAllowanceAnkr, fallback });
