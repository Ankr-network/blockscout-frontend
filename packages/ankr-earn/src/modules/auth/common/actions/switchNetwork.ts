import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { ISwitchNetworkData, PolkadotProvider } from 'polkadot';
import {
  AvailableWriteProviders,
  BlockchainNetworkId,
  Web3KeyWriteProvider,
} from 'provider';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { withStore } from 'modules/common/utils/withStore';

import { getAuthRequestKey } from '../utils/getAuthRequestKey';

import { connect, IConnect } from './connect';

type TChangedData = Partial<IConnect>;

interface ISwitchNetworkArgs {
  providerId: AvailableWriteProviders;
  chainId: BlockchainNetworkId;
}

export const switchNetwork = createAction<RequestAction, [ISwitchNetworkArgs]>(
  'auth/switchNetwork',
  ({ providerId, chainId }) => {
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

          switch (typeof chainId) {
            case 'number':
              if (provider instanceof Web3KeyWriteProvider) {
                return provider.switchNetwork(chainId);
              }
              break;

            case 'string':
              if (provider instanceof PolkadotProvider) {
                switchNetworkData = await provider.switchNetwork(chainId);

                return switchNetworkData;
              }
              break;

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

            switch (typeof chainId) {
              case 'number':
                changedData = {
                  chainId,
                };
                break;

              case 'string':
                changedData = {
                  chainType: chainId,
                };
                break;

              default:
                break;
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
