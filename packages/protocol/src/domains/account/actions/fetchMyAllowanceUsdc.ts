import { getBNWithDecimalsFromString, TContractAddresses } from 'multirpc-sdk';

import { web3Api } from 'store/queries';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

interface IFetchMyAllowanceUsdcParams extends TContractAddresses {
  tokenDecimals: number;
}

export const {
  endpoints: { fetchMyAllowanceUsdc },
  useFetchMyAllowanceUsdcQuery,
  useLazyFetchMyAllowanceUsdcQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchMyAllowanceUsdc: build.query<number, IFetchMyAllowanceUsdcParams>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({
            params: { depositContractAddress, tokenAddress, tokenDecimals },
            web3Service,
          }) => {
            const { currentAccount } = web3Service.getKeyWriteProvider();

            if (!currentAccount) {
              return { data: 0 };
            }

            const allowanceValue = await web3Service
              .getUsdcContractService({
                depositContractAddress,
                tokenAddress,
              })
              .getAllowanceValue(depositContractAddress);

            const hasAllowance = allowanceValue && !allowanceValue.isZero();

            if (!hasAllowance) {
              return { data: 0 };
            }

            return {
              data: Number(
                getBNWithDecimalsFromString(
                  allowanceValue.toFixed(),
                  tokenDecimals,
                ),
              ),
            };
          },
        ),
        fallback: { data: 0 },
      }),
    }),
  }),
});
