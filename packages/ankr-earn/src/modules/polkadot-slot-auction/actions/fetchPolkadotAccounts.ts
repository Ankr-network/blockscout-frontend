import { PolkadotProvider } from '@ankr.com/stakefi-polkadot';
import { RequestAction } from '@redux-requests/core';
import { Web3Address } from 'modules/common/types';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';
import { ProviderName } from '../utils/isProviderAvailable';

interface IFetchPolkadotAccountsDataItem {
  providerName: ProviderName;
  address: Web3Address;
}

interface IFetchPolkadotAccountsData {
  polkadotAccounts: IFetchPolkadotAccountsDataItem[];
}

export const fetchPolkadotAccounts = createSmartAction<
  RequestAction<IFetchPolkadotAccountsData, IFetchPolkadotAccountsData>
>('fetchPolkadotAccounts', () => ({
  request: {
    promise: (async () => {
      const slotAuctionSdk = SlotAuctionSdkSingleton.getInstance();

      const polkadotAccounts: IFetchPolkadotAccountsDataItem[] =
        await (async () => {
          if (slotAuctionSdk?.isConnected()) {
            const addresses = await slotAuctionSdk.getPolkadotAccounts();
            return (
              await Promise.all(
                addresses.map(address =>
                  PolkadotProvider.web3FromAddress(address),
                ),
              )
            ).map((provider, index) => ({
              providerName: provider.name as ProviderName,
              address: addresses[index],
            }));
          }

          return [];
        })();

      return { polkadotAccounts } as IFetchPolkadotAccountsData;
    })(),
  },
  meta: {
    getData: data => data,
    asMutation: false,
  },
}));
