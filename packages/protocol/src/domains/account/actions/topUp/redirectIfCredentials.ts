import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';
import { web3Api } from 'store/queries';
import { selectAuthData } from 'domains/auth/store/authSlice';

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

        const { credentials, workerTokenData, isInstantJwtParticipant } =
          selectAuthData(getState() as RootState);

        const shouldRedirect =
          (credentials && workerTokenData?.userEndpointToken) ||
          isInstantJwtParticipant;

        if (shouldRedirect) {
          resetTransactionSliceAndRedirect(dispatch, address);

          return { data: true };
        }

        return { data: false };
      }),
    }),
  }),
});
