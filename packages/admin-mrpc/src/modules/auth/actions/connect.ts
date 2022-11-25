import { Web3Address } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { setAuthData } from 'modules/auth/store/authSlice';
import { TOKEN_LIFETIME } from 'modules/common/const';
import { connectProvider } from './connectUtils';

interface IResponseData {
  address: Web3Address;
  backofficeAuthorizationToken: string;
}

export const {
  useLazyAuthConnectQuery,
  endpoints: { authConnect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authConnect: build.query<IResponseData, void>({
      queryFn: async () => {
        await connectProvider();
        const service = await MultiService.getWeb3Service();
        const { currentAccount: address } = service.getKeyProvider();
        const backofficeAuthorizationToken = await service.authorizeBackoffice(
          TOKEN_LIFETIME,
        );

        return {
          data: {
            address,
            backofficeAuthorizationToken,
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
