import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import {
  EEthereumNetworkId,
  EthereumWeb3KeyProvider,
} from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { connect, IConnect } from 'modules/auth/common/actions/connect';
import { getAuthRequestKey } from 'modules/auth/common/utils/getAuthRequestKey';

import { AvailableStakingWriteProviders } from '../../../common/types';

interface ISwitchNetworkArgs {
  providerId: AvailableStakingWriteProviders;
  chainId: EEthereumNetworkId;
}

export const updateConnectedNetwork = createAction<
  RequestAction,
  [ISwitchNetworkArgs]
>('auth/updateConnectedNetwork', ({ providerId, chainId }) => {
  const authRequestKey = getAuthRequestKey(providerId);
  const connectAction = connect.toString() + authRequestKey;

  return {
    request: {
      promise: (async () => {
        const provider =
          (await ProviderManagerSingleton.getInstance().getProvider(
            providerId,
          )) as EthereumWeb3KeyProvider;

        provider.currentChain = chainId;
      })(),
    },
    meta: {
      asMutation: true,
      requestKey: authRequestKey,
      showNotificationOnError: true,
      mutations: {
        [connectAction]: (data: IConnect): IConnect => ({
          ...data,
          chainId,
        }),
      },
    },
  };
});
