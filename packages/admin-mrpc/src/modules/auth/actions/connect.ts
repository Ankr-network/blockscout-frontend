import { IJwtToken, Web3Address } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { setAuthData } from 'modules/auth/store/authSlice';
import { connectProvider } from './connectUtils';

interface IResponseData {
  credentials: false | IJwtToken;
  address: Web3Address;
}

export const {
  useLazyAuthConnectQuery,
  endpoints: { authConnect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authConnect: build.query<IResponseData, void>({
      queryFn: async () => {
        await connectProvider();
        const service = await MultiService.getInstance();
        const key = await service.requestUserEncryptionKey();
        const { currentAccount: address } = service.getKeyProvider();
        const credentials = await service.loginAsUser(address, key);

        return {
          data: {
            credentials,
            address,
            encryptionPublicKey: key,
          },
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setAuthData(data));
      },
    }),
  }),
});
