import { createListenerMiddleware } from '@reduxjs/toolkit';
import { numberToHex } from 'web3-utils';

import {
  AvailableWriteProviders,
  EthereumWeb3KeyProvider,
  EventProvider,
  EVENTS,
  getProvider,
  ProviderEvents,
} from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import {
  setAddress,
  setChainId,
  selectEthProviderData,
  IProviderStatus,
} from 'modules/auth/common/store/authSlice';
import { RootState } from 'store/store';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: action => {
    if (action?.meta?.arg?.endpointName === 'connect' && !!action?.payload) {
      return true;
    }

    return false;
  },
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    const { dispatch, getState } = listenerApi;

    const providerManager = ProviderManagerSingleton.getInstance();
    const ethWeb3KeyProvider = await providerManager.getETHWriteProvider();
    const web3 = ethWeb3KeyProvider.getWeb3();

    const eventProvider: EventProvider | null = getProvider(
      web3?.currentProvider,
    );
    if (eventProvider === null) return;

    EVENTS.forEach((eventName: ProviderEvents): void => {
      eventProvider.removeAllListeners(eventName);
      eventProvider.on(eventName, async (data): Promise<void> => {
        const ethAuthState: IProviderStatus | undefined = selectEthProviderData(
          getState() as RootState,
        );
        if (!ethAuthState.isActive) return;

        switch (eventName) {
          case ProviderEvents.AccountsChanged: {
            const provider =
              await providerManager.getProvider<EthereumWeb3KeyProvider>(
                AvailableWriteProviders.ethCompatible,
              );
            // eslint-disable-next-line prefer-destructuring
            provider.currentAccount = data[0];
            dispatch(
              setAddress({
                providerId: AvailableWriteProviders.ethCompatible,
                address: data[0],
              }),
            );
            break;
          }
          case ProviderEvents.ChainChanged: {
            const chainId = data.toString().startsWith('0x')
              ? data
              : numberToHex(data);
            const selectedChainId = Number.parseInt(chainId, 16);
            dispatch(
              setChainId({
                providerId: AvailableWriteProviders.ethCompatible,
                isActive: true,
                chainId: selectedChainId,
              }),
            );
            break;
          }
          default:
            break;
        }
      });
    });
  },
});
