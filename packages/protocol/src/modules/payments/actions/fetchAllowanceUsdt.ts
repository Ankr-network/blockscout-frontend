import BigNumber from 'bignumber.js';
import {
  EBlockchain,
  Web3Address,
  getBNWithDecimalsFromString,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { ECurrency } from '../types';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IFetchAllowanceUsdtParams {
  address: Web3Address;
  network: EBlockchain;
}

const currency = ECurrency.USDT;
const fallback = 0;

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchAllowanceUsdt },
  useFetchAllowanceUsdtQuery,
  useLazyFetchAllowanceUsdtQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllowanceUsdt: build.query<number, IFetchAllowanceUsdtParams>({
      queryFn: createNotifyingQueryFn(
        async ({ address, network }, { getState }) => {
          const state = getState() as RootState;

          const { depositContractAddress, tokenAddress, tokenDecimals } =
            selectPaymentOptionsByNetworkAndCurrency(state, network, currency);

          const hasNecessaryData =
            depositContractAddress && tokenAddress && tokenDecimals;

          if (!hasNecessaryData) {
            return { data: fallback };
          }

          const web3ReadService = await MultiService.getWeb3ReadService();

          const contractReadService =
            web3ReadService.getContractServiceUsdt(tokenAddress);

          const allowance = await contractReadService.getAllowance({
            from: address,
            network,
            to: depositContractAddress,
          });

          const allowanceNumber = new BigNumber(allowance);

          if (allowanceNumber.isZero()) {
            return { data: fallback };
          }

          return {
            data: Number(
              getBNWithDecimalsFromString(
                allowanceNumber.toFixed(),
                tokenDecimals,
              ),
            ),
          };
        },
      ),
    }),
  }),
});

export const {
  selectDataWithFallbackCachedByParams: selectAllowanceUsdt,
  selectLoadingCachedByParams: selectAllowanceUsdtLoading,
  selectStateCachedByParams: selectAllowanceUsdtState,
} = createQuerySelectors({ endpoint: fetchAllowanceUsdt, fallback });
