import {
  AvailableWriteProviders,
  EEthereumNetworkId,
  EthereumWeb3KeyProvider,
} from '@ankr.com/provider';
import {
  EPolkadotNetworkId,
  ISwitchNetworkData,
  PolkadotProvider,
} from 'polkadot';

import { getProviderManager } from 'modules/api/getProviderManager';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
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

type TSwitchNetwork = boolean;

export const {
  useSwitchNetworkMutation,
  endpoints: { switchNetwork },
} = web3Api.injectEndpoints({
  endpoints: build => {
    let switchNetworkData: ISwitchNetworkData | undefined;

    return {
      switchNetwork: build.mutation<TSwitchNetwork, ISwitchNetworkArgs>({
        queryFn: queryFnNotifyWrapper<
          ISwitchNetworkArgs,
          never,
          TSwitchNetwork
        >(async ({ chainId, providerId }) => {
          const provider = await getProviderManager<ProvidersMap>().getProvider(
            providerId,
          );

          switch (providerId) {
            case AvailableWriteProviders.ethCompatible: {
              if (isEVMCompatible(chainId)) {
                await (provider as EthereumWeb3KeyProvider).switchNetwork(
                  chainId,
                );
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
        }),

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
