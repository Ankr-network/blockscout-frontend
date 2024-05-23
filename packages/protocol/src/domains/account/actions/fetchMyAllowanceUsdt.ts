import {
  EBlockchain,
  TContractAddresses,
  getBNWithDecimalsFromString,
} from 'multirpc-sdk';

import { web3Api } from 'store/queries';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

interface IFetchMyAllowanceUsdtParams extends TContractAddresses {
  network: EBlockchain;
  tokenDecimals: number;
}

export const {
  endpoints: { fetchMyAllowanceUsdt },
  useFetchMyAllowanceUsdtQuery,
  useLazyFetchMyAllowanceUsdtQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchMyAllowanceUsdt: build.query<number, IFetchMyAllowanceUsdtParams>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({
            params: {
              network,
              depositContractAddress,
              tokenAddress,
              tokenDecimals,
            },
            web3Service,
          }) => {
            const { currentAccount } = web3Service.getKeyWriteProvider();

            if (!currentAccount) {
              return { data: 0 };
            }

            const allowanceValue = await web3Service
              .getUsdtContractService({
                depositContractAddress,
                tokenAddress,
              })
              .getAllowanceValue({
                network,
                depositContractAddress,
                tokenAddress,
              });

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
