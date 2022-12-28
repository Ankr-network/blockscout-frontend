import { RootState } from 'store';
import { authFetchEncryptionKey } from 'domains/auth/actions/fetchEncryptionKey';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';

export const {
  useLazyAccountFetchPublicKeyQuery,
  endpoints: { accountFetchPublicKey },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchPublicKey: build.query<string, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState, dispatch }) => {
        const state = getState() as RootState;

        let { encryptionPublicKey } = selectAuthData(state);

        if (!encryptionPublicKey) {
          const { key: publicKey } = await dispatch(
            authFetchEncryptionKey.initiate(),
          ).unwrap();

          await dispatch(setAuthData({ encryptionPublicKey: publicKey }));

          encryptionPublicKey = publicKey;
        }

        return { data: encryptionPublicKey };
      }),
    }),
  }),
});
