import {
  AvailableWriteProviders,
  EthereumWeb3KeyProvider,
  EEthereumNetworkId,
} from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import {
  EPolkadotNetworkId,
  ISwitchNetworkData,
  PolkadotProvider,
} from 'polkadot';

import { web3Api } from 'modules/api/web3Api';
import { isEVMCompatible } from 'modules/auth/eth/utils/isEVMCompatible';
import { isPolkadotCompatible } from 'modules/auth/polkadot/utils/isPolkadotCompatible';

import {
  AvailableStakingWriteProviders,
  ExtraWriteProviders,
  ProvidersMap,
} from '../../../common/types';
import { setChainId } from '../store/authSlice';

interface ISwitchNetworkArgs {
  chainId: EEthereumNetworkId | EPolkadotNetworkId;
  providerId: AvailableStakingWriteProviders;
}

export const {
  useSwitchNetworkMutation,
  endpoints: { switchNetwork },
} = web3Api.injectEndpoints({
  endpoints: build => {
    let switchNetworkData: ISwitchNetworkData | undefined;

    return {
      switchNetwork: build.mutation<boolean, ISwitchNetworkArgs>({
        queryFn: async ({ chainId, providerId }) => {
          const provider =
            await ProviderManagerSingleton.getInstance<ProvidersMap>().getProvider(
              providerId,
            );

          switch (providerId) {
            case AvailableWriteProviders.ethCompatible: {
              if (isEVMCompatible(chainId)) {
                (provider as EthereumWeb3KeyProvider).switchNetwork(chainId);
                return {
                  data: true,
                };
              }

              break;
            }

            case ExtraWriteProviders.polkadotCompatible: {
              if (isPolkadotCompatible(chainId)) {
                switchNetworkData = await (
                  provider as PolkadotProvider
                ).switchNetwork(chainId);

                return {
                  data: true,
                };
              }

              break;
            }

            case ExtraWriteProviders.suiCompatible:
            default:
              break;
          }

          return {
            data: false,
          };
        },
        async onQueryStarted(
          { chainId, providerId },
          { dispatch, queryFulfilled },
        ) {
          return queryFulfilled.then(() => {
            dispatch(
              setChainId({
                providerId,
                isActive: true,
                chainId,
                ...(switchNetworkData?.address !== undefined && {
                  address: switchNetworkData?.address,
                }),
              }),
            );
          });
        },
      }),
    };
  },
});
