import BigNumber from 'bignumber.js';
import {
  EBlockchain,
  Web3Address,
  getBNWithDecimalsFromString,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { createWeb3NotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { ECurrency } from '../types';
import { selectPaymentOptionsByNetworkAndCurrency } from '../store/selectors';

export interface IFetchAllowanceUsdcParams {
  address: Web3Address;
  network: EBlockchain;
}

const currency = ECurrency.USDC;
const fallback = 0;

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchAllowanceUsdc },
  useFetchAllowanceUsdcQuery,
  useLazyFetchAllowanceUsdcQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllowanceUsdc: build.query<number, IFetchAllowanceUsdcParams>({
      queryFn: createWeb3NotifyingQueryFn(
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
            web3ReadService.getContractServiceUsdc(tokenAddress);

          const allowance = await contractReadService.getAllowance({
            from: address,
            to: depositContractAddress,
            network,
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
  selectDataWithFallbackCachedByParams: selectAllowanceUsdc,
  selectLoadingCachedByParams: selectAllowanceUsdcLoading,
  selectStateCachedByParams: selectAllowanceUsdcState,
} = createQuerySelectors({ endpoint: fetchAllowanceUsdc, fallback });
