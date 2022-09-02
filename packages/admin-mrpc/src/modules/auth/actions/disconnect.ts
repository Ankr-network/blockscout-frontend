import { store } from 'store';
import { resetAuthData, setAuthData } from 'modules/auth/store/authSlice';
import { disconnectService } from './connectUtils';
import { web3Api } from 'store/queries/web3Api';

export const {
  useLazyAuthDisconnectQuery,
  endpoints: { authDisconnect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authDisconnect: build.query<boolean, void>({
      queryFn: async () => {
        store.dispatch(setAuthData({ isManualDisconnected: true }));
        await disconnectService();

        store.dispatch(resetAuthData());

        return { data: true };
      },
      onQueryStarted: (_, { dispatch }) => {
        dispatch(web3Api.util.resetApiState());
      },
    }),
  }),
});
