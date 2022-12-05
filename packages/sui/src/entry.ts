import { sleep } from '@ankr.com/common';
import { IProvidersMap } from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import { SUI_PROVIDER_ID } from './const';
import { SuiProvider } from './sui';

const SUI_CONNECT_WAIT_MS = 250;

interface ISUIProvidersMap extends IProvidersMap {
  [SUI_PROVIDER_ID]: SuiProvider;
}

export const initProviderManagerSui = async (): Promise<void> => {
  const providerManager =
    ProviderManagerSingleton.getInstance<ISUIProvidersMap>();

  const provider = providerManager.getWriteProviderById(SUI_PROVIDER_ID);

  if (provider) {
    if (!provider.isConnected()) {
      await provider.connect();
      return;
    }
  }

  const newProvider = new SuiProvider();
  providerManager.addProvider(SUI_PROVIDER_ID, newProvider);

  await sleep(SUI_CONNECT_WAIT_MS);

  await newProvider.connect();
};
