import { ITokenInfo } from '@ankr.com/provider';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ETH_DECIMALS, SupportedChainIDS } from 'modules/common/const';
import { getTokenSymbol } from 'modules/common/utils/getTokenSymbol';

import { BridgeSDK } from '../api/BridgeSDK';
import { BridgeCacheTags } from '../const';
import { AvailableBridgeTokens } from '../types';
import { getTokenAddr } from '../utils/getTokenAddr';

interface IWatchAssetArgs {
  token: AvailableBridgeTokens;
  chainId: SupportedChainIDS;
}

export const { useAddBridgeTokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addBridgeTokenToWallet: build.mutation<boolean, IWatchAssetArgs>({
      queryFn: queryFnNotifyWrapper<IWatchAssetArgs, never, boolean>(
        async ({ token, chainId }) => {
          const sdk = await BridgeSDK.getInstance();

          const tokenInfo: ITokenInfo = {
            address: getTokenAddr(token, chainId),
            symbol: getTokenSymbol(token),
            decimals: ETH_DECIMALS,
            chainId,
          };

          return { data: await sdk.provider.addTokenToWallet(tokenInfo) };
        },
      ),
      invalidatesTags: [BridgeCacheTags.common],
    }),
  }),
});
