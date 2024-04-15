import { connectAccount } from 'modules/billing/utils/connectAccount';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

export interface IFetchANKRAllowanceFeeParams {
  amount: number;
}

export const {
  endpoints: { connectWalletAccount },
  useConnectWalletAccountMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    connectWalletAccount: build.mutation<string | null, void>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(async () => {
          const connectedAccount = await connectAccount();

          return { data: connectedAccount ?? null };
        }),
        fallback: { data: null },
      }),
    }),
  }),
  overrideExisting: true,
});
