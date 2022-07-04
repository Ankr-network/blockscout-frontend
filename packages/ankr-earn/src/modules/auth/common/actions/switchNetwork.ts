import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import { ISwitchNetworkData, PolkadotProvider } from 'polkadot';
import {
  AvailableWriteProviders,
  EEthereumNetworkId,
  EPolkadotNetworkId,
  EthereumWeb3KeyProvider,
} from 'provider';

import { isEVMCompatible } from 'modules/auth/eth/utils/isEVMCompatible';
import { isPolkadotCompatible } from 'modules/auth/polkadot/utils/isPolkadotCompatible';
import { withStore } from 'modules/common/utils/withStore';

import { getAuthRequestKey } from '../utils/getAuthRequestKey';

import { connect, IConnect } from './connect';

type TChangedData = Partial<IConnect>;

interface ISwitchNetworkArgs {
  chainId: EEthereumNetworkId | EPolkadotNetworkId;
  providerId: AvailableWriteProviders;
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
            await ProviderManagerSingleton.getInstance().getProvider(
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

            case AvailableWriteProviders.polkadotCompatible: {
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
        mutations: {
          [connectAction]: (data: IConnect): IConnect => {
            let changedData: TChangedData = {};

            if (
              providerId === AvailableWriteProviders.polkadotCompatible &&
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
            };
          },
        },
      },
    };
  },
);
