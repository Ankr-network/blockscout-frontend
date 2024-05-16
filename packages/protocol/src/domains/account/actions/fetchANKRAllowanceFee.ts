import BigNumber from 'bignumber.js';
import { formatToWei } from 'multirpc-sdk';

import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';

export interface IFetchANKRAllowanceFeeParams {
  amount: number;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchANKRAllowanceFee },
  useFetchANKRAllowanceFeeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchANKRAllowanceFee: build.query<number, IFetchANKRAllowanceFeeParams>({
      providesTags: [RequestType.ANKRAllowanceFee],
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: { amount }, web3Service }) => {
            const { currentAccount } = web3Service.getKeyWriteProvider();

            if (currentAccount) {
              const contractService = web3Service.getContractService();

              const fee = await contractService.getAllowanceFee(
                formatToWei(new BigNumber(amount)),
              );

              return { data: Number(fee) };
            }

            return { data: 0 };
          },
        ),
        fallback: { data: 0 },
      }),
    }),
  }),
  overrideExisting: true,
});
