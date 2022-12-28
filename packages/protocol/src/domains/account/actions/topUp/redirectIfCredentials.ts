import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { authConnect, AuthConnectParams } from 'domains/auth/actions/connect';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';
import { web3Api } from 'store/queries';

export const {
  useLazyTopUpRedirectIfCredentialsQuery,
  endpoints: { topUpRedirectIfCredentials },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpRedirectIfCredentials: build.query<boolean, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState, dispatch }) => {
        const service = await MultiService.getWeb3Service();
        const provider = service.getKeyProvider();
        const { currentAccount: address } = provider;

        const { data: connectData } =
          // we shouldn't care about params because
          // endpoints cache by their names only
          authConnect.select(undefined as unknown as AuthConnectParams)(
            getState() as RootState,
          );

        const shouldRedirect =
          connectData?.credentials &&
          connectData?.workerTokenData?.userEndpointToken;

        if (shouldRedirect) {
          resetTransactionSliceAndRedirect(dispatch, address);

          return { data: true };
        }

        return { data: false };
      }),
    }),
  }),
});
