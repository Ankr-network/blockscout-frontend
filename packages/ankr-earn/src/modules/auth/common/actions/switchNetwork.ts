import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

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

import { isEVMCompatible } from 'modules/auth/eth/utils/isEVMCompatible';
import { isPolkadotCompatible } from 'modules/auth/polkadot/utils/isPolkadotCompatible';
import { withStore } from 'modules/common/utils/withStore';

import { ExtraWriteProviders, ProvidersMap } from '../../../common/types';
import { setChainId } from '../store/authSlice';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';

import { connect, IConnect } from './connect';

type TChangedData = Partial<IConnect>;

interface ISwitchNetworkArgs {
  chainId: EEthereumNetworkId | EPolkadotNetworkId;
  providerId: keyof ProvidersMap;
}

export const switchNetwork = createAction<RequestAction, [ISwitchNetworkArgs]>(
  'auth/switchNetwork',
  ({ chainId, providerId }) => {
    const authRequestKey = getAuthRequestKey(providerId);
    const connectAction = connect.toString() + authRequestKey;

    let switchNetworkData: ISwitchNetworkData | undefined;

    return {
      request: {
        promise: async () => {
          const provider =
            await ProviderManagerSingleton.getInstance<ProvidersMap>().getProvider(
              providerId,
            );

          switch (providerId) {
            case AvailableWriteProviders.ethCompatible: {
              if (isEVMCompatible(chainId)) {
                return (provider as EthereumWeb3KeyProvider).switchNetwork(
                  chainId,
                );
              }

              break;
            }

            case ExtraWriteProviders.polkadotCompatible: {
              if (isPolkadotCompatible(chainId)) {
                switchNetworkData = await (
                  provider as PolkadotProvider
                ).switchNetwork(chainId);

                return switchNetworkData;
              }

              break;
            }

            default:
              break;
          }

          return null;
        },
      },
      meta: {
        asMutation: true,
        showNotificationOnError: true,
        onRequest: withStore,
        onSuccess: (
          response: { data: IConnect },
          _action: RequestAction,
          { dispatch }: RequestsStore,
        ) => {
          dispatch(
            setChainId({
              providerId,
              isActive: true,
              chainId,
            }),
          );

          return response;
        },
        mutations: {
          [connectAction]: (data: IConnect): IConnect => {
            let changedData: TChangedData = {};

            if (
              providerId === 'polkadotCompatible' &&
              isPolkadotCompatible(chainId)
            ) {
              changedData = {
                chainId,
              };
            }

            if (typeof switchNetworkData?.address === 'string') {
              changedData.address = switchNetworkData.address;
            }

            return {
              ...data,
              ...changedData,
              chainId,
            };
          },
        },
      },
    };
  },
);
