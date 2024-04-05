import { IApiUserGroupParams, formatFromWei } from 'multirpc-sdk';
import BigNumber from 'bignumber.js';

import { web3Api } from 'store/queries';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

export const {
  endpoints: { fetchMyAllowance },
  useFetchMyAllowanceQuery,
  useLazyFetchMyAllowanceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchMyAllowance: build.query<BigNumber | null, IApiUserGroupParams>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ params: group, web3Service }) => {
            const allowanceValue = await web3Service
              .getContractService()
              .getAllowanceValue();

            if (group) {
              // eslint-disable-next-line no-console
              console.log('fetApprovedAmount for group address: ', group);
            }

            const hasAllowance = allowanceValue && !allowanceValue.isZero();

            if (!hasAllowance) {
              return { data: null };
            }

            return { data: new BigNumber(formatFromWei(allowanceValue)) };
          },
        ),
        fallback: { data: null },
      }),
    }),
  }),
});
