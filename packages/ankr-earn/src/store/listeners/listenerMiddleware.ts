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

import { getProviderManager } from 'modules/api/getProviderManager';
import {
  IProviderStatus,
  selectEthProviderData,
  setAddress,
  setChainId,
} from 'modules/auth/common/store/authSlice';
import { connectEthCompatible } from 'modules/auth/eth/actions/connectEthCompatible';
import { RootState } from 'store/store';

export const listenerMiddleware = createListenerMiddleware();

const ethProviderId = AvailableWriteProviders.ethCompatible;

listenerMiddleware.startListening({
  predicate: action => {
    if (connectEthCompatible?.matchFulfilled(action)) {
      return true;
    }

    return false;
  },
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    const { dispatch, getState } = listenerApi;

    const providerManager = getProviderManager();
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
                ethProviderId,
              );

            const currentAddress = data[0];
            provider.currentAccount = currentAddress;

            dispatch(
              setAddress({
                providerId: ethProviderId,
                address: currentAddress,
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
                providerId: ethProviderId,
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
